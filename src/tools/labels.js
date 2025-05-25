const api = require('../api');
const { logger } = require('../utils/logger');

function registerTools(server) {
    server.tool(
        'upguard_get_labels',
        'Get the list of registered labels',
        {},
        async (params) => {
            try {
                const result = await api.getLabels(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting labels:', error);
                throw error;
            }
        }
    );
}

module.exports = { registerTools }; 


