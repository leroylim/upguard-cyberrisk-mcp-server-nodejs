const api = require('../api');
const { logger } = require('../utils/logger');

function registerTools(server) {
    server.tool(
        'upguard_get_notifications',
        'Get a list of notifications for your organization',
        {},
        async (params) => {
            try {
                const result = await api.getNotifications(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting notifications:', error);
                throw error;
            }
        }
    );
}

module.exports = { registerTools }; 


