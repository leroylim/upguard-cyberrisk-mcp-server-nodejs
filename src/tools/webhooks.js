const api = require('../api');
const { logger } = require('../utils/logger');
const { z } = require('zod');

function registerTools(server) {
    server.tool(
        'upguard_list_webhooks',
        'List all registered webhooks configured for your account to receive real-time security notifications and alerts',
        {},
        async (params) => {
            try {
                const result = await api.listWebhooks(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error listing webhooks:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_create_webhook',
        'Create a new webhook to receive automated notifications for specific security events and risk changes',
        {
                name: z.string().describe('A descriptive name for the webhook to identify its purpose'),
                hook_url: z.string().url().describe('The HTTPS URL endpoint that will receive webhook notifications'),
                notification_type_ids: z.array(z.string()).describe('Array of notification type IDs to subscribe to (use get_webhook_notification_types to see available types)'),
                webhook_type: z.enum(['webhook']).optional().default('webhook').describe('The type of webhook to create (currently only "webhook" is supported)')
            },
        async (params) => {
            try {
                const result = await api.createWebhook(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error creating webhook:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_delete_webhook',
        'Delete an existing webhook to stop receiving notifications at the specified endpoint',
        {
                id: z.string().describe('The unique ID of the webhook to delete')
            },
        async (params) => {
            try {
                const result = await api.deleteWebhook(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error deleting webhook:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_get_webhook_notification_types',
        'Get a comprehensive list of available webhook notification types and their descriptions for your organization',
        {},
        async (params) => {
            try {
                const result = await api.getWebhookNotificationTypes(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting webhook notification types:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_get_webhook_sample_data',
        'Get example webhook payload data for testing and development purposes to understand notification formats',
        {
                id: z.string().optional().describe('The ID of a specific webhook to get sample data for all its registered notification types'),
                notification_type_ids: z.array(z.string()).optional().describe('Array of specific notification type IDs to get sample data for (ignored if webhook ID is provided)')
            },
        async (params) => {
            try {
                const result = await api.getWebhookSampleData(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting webhook sample data:', error);
                throw error;
            }
        }
    );
}

module.exports = { registerTools }; 


