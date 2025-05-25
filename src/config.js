/**
 * UpGuard CyberRisk MCP Server - Configuration Module
 * 
 * Copyright (c) 2024 Han Yong Lim
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const dotenv = require('dotenv');
const { logger } = require('./utils/logger');

// Load environment variables
dotenv.config();

const config = {
    api: {
        baseUrl: process.env.UPGUARD_API_URL || 'https://cyber-risk.upguard.com/api/public',
        key: process.env.UPGUARD_API_KEY,
        timeout: parseInt(process.env.UPGUARD_REQUEST_TIMEOUT, 10) || 120000
    },
    transport: {
        mode: process.env.MCP_TRANSPORT_MODE || 'stdio', // 'stdio' or 'http'
        http: {
            port: parseInt(process.env.MCP_HTTP_PORT, 10) || 3000,
            host: process.env.MCP_HTTP_HOST || 'localhost',
            sessionManagement: process.env.MCP_SESSION_MANAGEMENT === 'true' || false
        }
    },
    cache: {
        enabled: process.env.CACHE_ENABLED === 'true' || true,
        ttl: parseInt(process.env.CACHE_TTL, 10) || 300,
        maxSize: parseInt(process.env.CACHE_MAX_SIZE, 10) || 1000
    },
    logging: {
        prefix: '[Upguard API Client]'
    },
    environment: process.env.NODE_ENV || 'development'
};

// Validate configuration
if (!config.api.key) {
    const warningMsg = 'CRITICAL: UPGUARD_API_KEY environment variable is not set. API calls will fail.';
    if (process.env.NODE_ENV !== 'test') {
        logger.error(`${config.logging.prefix} ${warningMsg}`);
    }
}

// Validate transport mode
if (!['stdio', 'http'].includes(config.transport.mode)) {
    const error = new Error(`Invalid transport mode: ${config.transport.mode}. Must be 'stdio' or 'http'.`);
    if (process.env.NODE_ENV !== 'test') {
        logger.error(`${config.logging.prefix} ${error.message}`);
    }
    throw error;
}

// Validate required configuration
if (!config.api.baseUrl) {
    const error = new Error('UPGUARD_API_BASE_URL environment variable is required');
    if (process.env.NODE_ENV !== 'test') {
        logger.error('Configuration Error:', error.message);
    }
    throw error;
}

if (!config.api.key) {
    logger.warn('UPGUARD_API_KEY not found in environment variables');
}

if (config.transport.mode === 'http' && !config.transport.http.port) {
    logger.warn('HTTP_PORT not specified, using default port 3000');
}

if (config.cache.enabled && !config.cache.ttl) {
    logger.warn('CACHE_TTL not specified, using default 300 seconds');
    config.cache.ttl = 300;
}

module.exports = config; 
