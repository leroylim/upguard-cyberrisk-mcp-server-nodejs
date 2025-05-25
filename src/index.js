const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { StreamableHTTPServerTransport } = require('@modelcontextprotocol/sdk/server/streamableHttp.js');
const { isInitializeRequest } = require('@modelcontextprotocol/sdk/types.js');
const { randomUUID } = require('crypto');
const express = require('express');
const { z } = require('zod');
const { registerAllTools } = require('./tools');
const schemas = require('./tools/schemas');
const { logger } = require('./utils/logger');
const config = require('./config');

// Create server instance based on transport mode
async function createServer() {
    const serverInstance = new McpServer({
        name: 'upguard_cyberrisk_mcp_server',
        version: '1.2.0',
        description: 'MCP server for interacting with the UpGuard CyberRisk API, providing comprehensive risk assessment and management capabilities.'
    });

    // Register all tools
    await registerAllTools(serverInstance);

    // Example prompts for common operations
    serverInstance.prompt(
        'upguard_get_my_organization_risks',
        {
            min_severity: schemas.severity.optional()
                .describe('Minimum severity level for risks.'),
            include_meta: z.boolean().optional().default(false)
                .describe('Include additional risk metadata.')
        },
        (args) => ({
            messages: [{ 
                role: 'user', 
                content: { 
                    type: 'text', 
                    text: `Please show me all risks for my organization${args.min_severity ? ` with minimum severity of ${args.min_severity}` : ''}${args.include_meta ? ' including metadata' : ''} using 'upguard_get_account_risks'.`
                } 
            }]
        })
    );

    serverInstance.prompt(
        'upguard_monitor_new_vendor',
        {
            vendorHostname: schemas.vendorHostname,
            vendorTier: z.number().int().min(1).max(3).optional()
                .describe('Tier to assign to the vendor (1-3).'),
            vendorLabels: schemas.labels.optional()
        },
        (args) => ({
            messages: [{ 
                role: 'user', 
                content: { 
                    type: 'text', 
                    text: `Please start monitoring the vendor ${args.vendorHostname}${args.vendorTier ? ` as tier ${args.vendorTier}` : ''}${args.vendorLabels ? ` with labels: ${args.vendorLabels.join(', ')}` : ''} using 'upguard_start_monitoring_vendor'.`
                } 
            }]
        })
    );

    // Risk assessment prompt
    serverInstance.prompt(
        'upguard_assess_vendor_risks',
        {
            vendorHostname: schemas.vendorHostname,
            timeRange: schemas.timeRange.optional(),
            riskFilters: schemas.riskFilters.optional()
        },
        (args) => ({
            messages: [
                {
                    role: 'user',
                    content: {
                        type: 'text',
                        text: `Please analyze risks for vendor ${args.vendorHostname} using the following steps:
1. Get current vendor risks using 'upguard_get_vendor_risks'
2. If timeRange is provided, get risk changes using 'upguard_get_account_risks_diff'
3. Get vendor details using 'upguard_get_vendor_details'
4. Summarize the findings and highlight critical issues`
                    }
                }
            ]
        })
    );

    // Bulk domain management prompt
    serverInstance.prompt(
        'upguard_manage_domains',
        {
            operation: z.enum(['add', 'remove', 'update']),
            domains: z.array(z.string()).min(1),
            labels: schemas.labels.optional()
        },
        (args) => ({
            messages: [
                {
                    role: 'user',
                    content: {
                        type: 'text',
                        text: `Please ${args.operation} the following domains: ${args.domains.join(', ')}${args.labels ? ` with labels: ${args.labels.join(', ')}` : ''}`
                    }
                }
            ]
        })
    );

    // Breach investigation prompt
    serverInstance.prompt(
        'upguard_investigate_breaches',
        {
            domain: z.string(),
            includeUnverified: z.boolean().optional().default(false),
            detailed: z.boolean().optional().default(false)
        },
        (args) => ({
            messages: [
                {
                    role: 'user',
                    content: {
                        type: 'text',
                        text: `Please investigate breaches for domain ${args.domain}:
1. Get breached identities using 'upguard_get_breached_identities'
2. ${args.detailed ? 'For each breached identity, get detailed breach info using upguard_get_identity_breach' : 'Summarize the findings'}
3. ${args.includeUnverified ? 'Include unverified breaches in the analysis' : 'Only include verified breaches'}`
                    }
                }
            ]
        })
    );

    // Report generation prompt
    serverInstance.prompt(
        'upguard_generate_report',
        {
            reportType: z.enum([
                'BoardSummaryPDF', 'VendorRiskExecutiveSummaryPDF',
                'VendorDetailedPDF', 'BreachSightDetailedPDF'
            ]),
            emailAddresses: z.array(z.string().email()).max(5).optional(),
            waitForCompletion: z.boolean().optional().default(false)
        },
        (args) => ({
            messages: [
                {
                    role: 'user',
                    content: {
                        type: 'text',
                        text: `Please generate a ${args.reportType} report:
1. Queue the report using 'upguard_queue_report_export'
${args.emailAddresses ? `2. Send to: ${args.emailAddresses.join(', ')}` : ''}
${args.waitForCompletion ? '3. Wait and check status using upguard_get_report_status' : ''}`
                    }
                }
            ]
        })
    );

    return serverInstance;
}

// HTTP Transport Implementation
let httpServer = null;

async function startHttpServer() {
    const app = express();
    app.use(express.json());

    // Store transports by session ID for session management
    const transports = {};

    if (config.transport.http.sessionManagement) {
        // With Session Management
        app.post('/mcp', async (req, res) => {
            try {
                const sessionId = req.headers['mcp-session-id'];
                let transport;

                if (sessionId && transports[sessionId]) {
                    // Reuse existing transport
                    transport = transports[sessionId];
                } else if (!sessionId && isInitializeRequest(req.body)) {
                    // New initialization request
                    const serverInstance = await createServer();
                    
                    transport = new StreamableHTTPServerTransport({
                        sessionIdGenerator: () => randomUUID(),
                        onsessioninitialized: (sessionId) => {
                            transports[sessionId] = transport;
                            logger.info(`New HTTP session initialized: ${sessionId}`);
                        }
                    });

                    // Clean up transport when closed
                    transport.onclose = () => {
                        if (transport.sessionId) {
                            logger.info(`HTTP session closed: ${transport.sessionId}`);
                            delete transports[transport.sessionId];
                        }
                    };

                    await serverInstance.connect(transport);
                } else {
                    res.status(400).json({
                        jsonrpc: '2.0',
                        error: {
                            code: -32000,
                            message: 'Bad Request: No valid session ID provided'
                        },
                        id: null
                    });
                    return;
                }

                await transport.handleRequest(req, res, req.body);
            } catch (error) {
                logger.error('Error handling HTTP MCP request:', error);
                if (!res.headersSent) {
                    res.status(500).json({
                        jsonrpc: '2.0',
                        error: {
                            code: -32603,
                            message: 'Internal server error'
                        },
                        id: null
                    });
                }
            }
        });

        // Handle GET and DELETE requests for session management
        const handleSessionRequest = async (req, res) => {
            const sessionId = req.headers['mcp-session-id'];
            if (!sessionId || !transports[sessionId]) {
                res.status(400).send('Invalid or missing session ID');
                return;
            }
            
            const transport = transports[sessionId];
            await transport.handleRequest(req, res);
        };

        app.get('/mcp', handleSessionRequest);
        app.delete('/mcp', handleSessionRequest);
    } else {
        // Stateless mode - new server instance for each request
        app.post('/mcp', async (req, res) => {
            try {
                const serverInstance = await createServer();
                const transport = new StreamableHTTPServerTransport({
                    sessionIdGenerator: undefined
                });

                res.on('close', () => {
                    logger.info('HTTP request closed');
                    transport.close();
                    serverInstance.close();
                });

                await serverInstance.connect(transport);
                await transport.handleRequest(req, res, req.body);
            } catch (error) {
                logger.error('Error handling HTTP MCP request:', error);
                if (!res.headersSent) {
                    res.status(500).json({
                        jsonrpc: '2.0',
                        error: {
                            code: -32603,
                            message: 'Internal server error'
                        },
                        id: null
                    });
                }
            }
        });

        app.get('/mcp', (req, res) => {
            res.writeHead(405).end(JSON.stringify({
                jsonrpc: '2.0',
                error: {
                    code: -32000,
                    message: 'Method not allowed for stateless mode.'
                },
                id: null
            }));
        });

        app.delete('/mcp', (req, res) => {
            res.writeHead(405).end(JSON.stringify({
                jsonrpc: '2.0',
                error: {
                    code: -32000,
                    message: 'Method not allowed for stateless mode.'
                },
                id: null
            }));
        });
    }

    // Health check endpoint
    app.get('/health', (req, res) => {
        res.json({ 
            status: 'healthy', 
            transport: 'http',
            sessionManagement: config.transport.http.sessionManagement,
            timestamp: new Date().toISOString()
        });
    });

    // Start HTTP server and store reference for shutdown
    const { port, host } = config.transport.http;
    httpServer = app.listen(port, host, () => {
        const sessionMode = config.transport.http.sessionManagement ? 'with session management' : 'stateless';
        logger.info(`[MCP Server Log] UpGuard CyberRisk MCP Server (v1.2.0) HTTP transport running on ${host}:${port} (${sessionMode})`);
        logger.info(`HTTP server started on ${host}:${port} (${sessionMode})`);
    });

    return httpServer;
}

// STDIO Transport Implementation
async function startStdioServer() {
    const serverInstance = await createServer();
    const transport = new StdioServerTransport();
    
    await serverInstance.connect(transport);
    logger.info('[MCP Server Log] UpGuard CyberRisk MCP Server (v1.2.0) STDIO transport is running...');
    logger.info('STDIO server started');
}

// Start the server based on transport mode
async function startServer() {
    try {
        logger.info(`Starting MCP server with ${config.transport.mode} transport`);
        
        if (config.transport.mode === 'http') {
            await startHttpServer();
        } else {
            await startStdioServer();
        }
    } catch (error) {
        logger.error('Failed to start UpGuard CyberRisk MCP Server:', error);
        logger.error('[MCP Server Log] Failed to start UpGuard CyberRisk MCP Server:', error);
        throw error;
    }
}

// Start the server
startServer();

// Graceful shutdown handling
let isShuttingDown = false;

function gracefulShutdown(signal) {
    if (isShuttingDown) {
        logger.error(`[MCP Server Log] Force shutdown on ${signal}`);
        // eslint-disable-next-line no-process-exit
        process.exit(1);
    }
    
    isShuttingDown = true;
    logger.info(`[MCP Server Log] Received ${signal}, shutting down gracefully...`);
    logger.info(`Received ${signal}, initiating graceful shutdown`);
    
    // Close HTTP server if running
    if (httpServer) {
        httpServer.close((err) => {
            if (err) {
                logger.error('Error closing HTTP server:', err);
            } else {
                logger.info('HTTP server closed');
            }
            
            // Give the server a moment to finish current operations
            setTimeout(() => {
                logger.info('[MCP Server Log] UpGuard CyberRisk MCP Server stopped');
                logger.info('Server shutdown complete');
                // eslint-disable-next-line no-process-exit
                process.exit(0);
            }, 500);
        });
    } else {
        // For STDIO mode, just wait a moment
        setTimeout(() => {
            logger.info('[MCP Server Log] UpGuard CyberRisk MCP Server stopped');
            logger.info('Server shutdown complete');
            // eslint-disable-next-line no-process-exit
            process.exit(0);
        }, 500);
    }
}

// Handle various termination signals
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGQUIT', () => gracefulShutdown('SIGQUIT'));

// Handle uncaught exceptions and unhandled rejections
process.on('uncaughtException', (error) => {
    logger.error('[MCP Server Log] Uncaught Exception:', error);
    logger.error('Uncaught Exception:', error);
    gracefulShutdown('uncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('[MCP Server Log] Unhandled Rejection at:', promise, 'reason:', reason);
    logger.error('Unhandled Rejection:', { promise, reason });
    gracefulShutdown('unhandledRejection');
});

// Export for testing
module.exports = {
    server: createServer,
    registerTools: registerAllTools,
    startHttpServer,
    startStdioServer
}; 
