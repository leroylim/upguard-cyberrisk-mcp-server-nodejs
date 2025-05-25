const api = require('../api');
const { logger } = require('../utils/logger');
const { z } = require('zod');
const schemas = require('./schemas');

function registerTools(server) {
    server.tool(
        'upguard_get_vendor_vulnerabilities',
        'Get vulnerability information for a vendor',
        {
                primary_hostname: schemas.primaryHostname,
                page_token: z.string().optional().describe('The page_token from a previous request, use this to get the next page of results'),
                page_size: z.number().int().min(10).max(2000).optional().default(1000).describe('The number of results to return per page')
            },
        async (params) => {
            try {
                const result = await api.getVendorVulnerabilities(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting vendor vulnerabilities:', error);
                throw error;
            }
        }
    );
}

module.exports = { registerTools }; 


