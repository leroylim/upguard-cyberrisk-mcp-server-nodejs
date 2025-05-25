const api = require('../api');
const { logger } = require('../utils/logger');

function registerTools(server) {
    server.tool(
        'upguard_get_organisation',
        'Get the current organisation',
        {},
        async (params) => {
            try {
                const result = await api.getOrganisation(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting organisation:', error);
                throw error;
            }
        }
    );
}

module.exports = { registerTools }; 


