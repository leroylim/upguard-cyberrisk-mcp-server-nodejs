const api = require('../api');
const { logger } = require('../utils/logger');
const { z } = require('zod');

function registerTools(server) {
    server.tool(
        'upguard_bulk_list_hostnames',
        'List all hostnames registered for bulk monitoring with pagination support',
        {
            page_token: z.string().optional().describe('The page_token from a previous request, use this to get the next page of results'),
            page_size: z.number().int().min(10).max(2000).optional().default(200).describe('The number of results to return per page (10-2000, default 200)'),
            sort_desc: z.boolean().optional().default(false).describe('Whether to sort the results in descending order'),
            omit_scan_info: z.boolean().optional().default(false).describe('Omit the scan information, i.e. risks, score and last scanned at.'),
            omit_vendor: z.boolean().optional().default(false).describe('Omit the vendor information for a hostname in the response.'),
            omit_labels: z.boolean().optional().default(false).describe('Omit the labels for a hostname in the response.'),
            exclude_active: z.boolean().optional().default(false).describe('Exclude active hostnames from the results.'),
            exclude_inactive: z.boolean().optional().default(false).describe('Exclude inactive hostnames from the results.'),
            labels: z.array(z.string()).optional().describe('Filter results to only hostnames that have all the provided labels.')
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
            hostnames: z.array(z.string()).min(1).max(1000).describe('Array of hostnames to register for monitoring (max 1000 per request)'),
            labels: z.array(z.string()).optional().describe('Labels to add to the registered hostnames')
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
            hostnames: z.array(z.string()).min(1).max(1000).describe('Array of hostnames to deregister from monitoring (max 1000 per request)')
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


