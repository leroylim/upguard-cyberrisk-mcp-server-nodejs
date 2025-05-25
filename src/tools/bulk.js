const api = require('../api');
const { logger } = require('../utils/logger');
const { z } = require('zod');

function registerTools(server) {
    server.tool(
        'upguard_bulk_list_hostnames',
        'List all hostnames registered for bulk monitoring with pagination support',
        {
            page_token: z.string().optional().describe('The page_token from a previous request, use this to get the next page of results'),
            page_size: z.number().int().min(10).max(2000).optional().default(1000).describe('The number of results to return per page (10-2000)'),
            sort_by: z.enum(['hostname', 'created_at', 'updated_at']).optional().default('hostname').describe('Sort hostnames by. Options: "hostname" (hostname alphabetically), "created_at" (when hostname was first registered), "updated_at" (when hostname was last modified). Default: "hostname"'),
            sort_desc: z.boolean().optional().default(false).describe('Whether to sort the results in descending order'),
            include_inactive: z.boolean().optional().default(false).describe('Whether to include inactive hostnames in the results'),
            include_labels: z.boolean().optional().default(false).describe('Whether to include labels for each hostname'),
            include_vendor: z.boolean().optional().default(false).describe('Whether to include vendor information for each hostname'),
            include_scan_info: z.boolean().optional().default(false).describe('Whether to include scan information for each hostname')
        },
        async (params) => {
            try {
                const result = await api.listHostnames(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error listing bulk hostnames:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_bulk_register_hostnames',
        'Register multiple hostnames for bulk monitoring',
        {
            hostnames: z.array(z.string()).min(1).max(100).describe('Array of hostnames to register for monitoring (max 100 per request)')
        },
        async (params) => {
            try {
                const result = await api.registerHostnames(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error registering bulk hostnames:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_bulk_deregister_hostnames',
        'Deregister multiple hostnames from bulk monitoring',
        {
            hostnames: z.array(z.string()).min(1).max(100).describe('Array of hostnames to deregister from monitoring (max 100 per request)')
        },
        async (params) => {
            try {
                const result = await api.deregisterHostnames(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error deregistering bulk hostnames:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_bulk_get_hostnames_stats',
        'Get statistics about bulk hostname monitoring including total registered, active, inactive, and remaining slots',
        {},
        async () => {
            try {
                const result = await api.getHostnamesStats();
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting bulk hostnames stats:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_bulk_get_hostname_details',
        'Get detailed information about a specific hostname in bulk monitoring',
        {
            hostname: z.string().describe('The hostname to get details for'),
            omit_scan_info: z.boolean().optional().describe('Whether to omit scan information from the response'),
            omit_vendor: z.boolean().optional().describe('Whether to omit vendor information from the response'),
            omit_labels: z.boolean().optional().describe('Whether to omit labels from the response')
        },
        async (params) => {
            try {
                const { hostname, ...options } = params;
                const result = await api.getHostnameDetails(hostname, options);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting bulk hostname details:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_bulk_hostname_put_labels',
        'Update labels for a bulk hostname',
        {
                hostname: z.string().describe('The hostname to update labels for'),
                labels: z.array(z.string()).describe('The labels to assign to the hostname')
            },
        async (params) => {
            try {
                const result = await api.putHostnameLabels(params.hostname, { labels: params.labels });
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error updating bulk hostname labels:', error);
                throw error;
            }
        }
    );
}

module.exports = { registerTools }; 


