const api = require('../api');
const { logger } = require('../utils/logger');
const { z } = require('zod');

function registerTools(server) {
    server.tool(
        'upguard_get_breached_identities',
        'Get a list of breached identities for your account with filtering and sorting options',
        {
                page_token: z.string().optional().describe('Pagination token from a previous request to get the next page of results'),
                page_size: z.number().int().min(10).max(2000).optional().default(1000).describe('Number of breached identities to return per page (10-2000, defaults to 1000)'),
                sort_by: z.enum(['name', 'domain', 'num_breaches', 'date_last_breach']).optional().default('date_last_breach').describe('Sort breached identities by. Options: "name" (identity name/email), "domain" (domain of the identity), "num_breaches" (number of breaches the identity appears in), "date_last_breach" (date of most recent breach). Default: "date_last_breach"'),
                sort_desc: z.boolean().optional().default(false).describe('Sort in descending order (true) or ascending order (false, default)'),
                breach_id: z.string().optional().describe('Filter results to show only identities affected by a specific breach ID')
            },
        async (params) => {
            try {
                const result = await api.getBreachedIdentities(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting breached identities:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_get_identity_breach',
        'Get comprehensive details for a specific identity breach including affected data types, breach timeline, and impact assessment',
        {
                id: z.string().describe('The unique ID of the breach to fetch detailed information for')
            },
        async (params) => {
            try {
                const result = await api.getIdentityBreach(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting identity breach details:', error);
                throw error;
            }
        }
    );
}

module.exports = { registerTools }; 


