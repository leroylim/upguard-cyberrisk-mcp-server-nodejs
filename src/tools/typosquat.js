const api = require('../api');
const { logger } = require('../utils/logger');
const { z } = require('zod');

function registerTools(server) {
    server.tool(
        'upguard_list_typosquat_domains',
        'Get list of typosquat domains from UpGuard',
        {},
        async () => {
            try {
                const result = await api.listTyposquatDomains();
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting typosquat domains:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_get_typosquat_details',
        'Get typosquat domain details from UpGuard',
        {
                domain: z.string().describe('Domain to get details for')
            },
        async (params) => {
            try {
                const result = await api.getTyposquatDetails(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting typosquat details:', error);
                throw error;
            }
        }
    );
}

module.exports = { registerTools }; 


