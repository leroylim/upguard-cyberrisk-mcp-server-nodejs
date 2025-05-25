const api = require('../api');
const { logger } = require('../utils/logger');
const { z } = require('zod');

function registerTools(server) {
    server.tool(
        'upguard_get_ips',
        'Get a list of IP addresses for your account with filtering and pagination options',
        {
                labels: z.array(z.string()).optional().describe('Filter results to only include IPs that have all the specified labels assigned'),
                page_token: z.string().optional().describe('Pagination token from a previous request to get the next page of results'),
                page_size: z.number().int().min(10).max(2000).optional().default(1000).describe('Number of IP addresses to return per page (10-2000, defaults to 1000)'),
                sort_by: z.enum(['ip', 'owner', 'country', 'asn', 'as_name', 'automated_score']).optional().default('ip').describe('Sort IPs by: "ip" (IP address), "owner" (organization), "country" (country code), "asn" (Autonomous System Number), "as_name" (AS name), "automated_score" (security score)'),
                sort_desc: z.boolean().optional().default(false).describe('Sort in descending order (true) or ascending order (false, default)')
            },
        async (params) => {
            try {
                const result = await api.getIps(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting IPs:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_add_custom_ips',
        'Add a list of custom IP addresses to your account for monitoring',
        {
                ips: z.array(z.string()).describe('Array of IP addresses to add for monitoring (e.g., ["192.168.1.1", "10.0.0.1"])'),
                labels: z.array(z.string()).optional().describe('Optional labels to assign to all the added IP addresses for organization and filtering')
            },
        async (params) => {
            try {
                const result = await api.addCustomIps(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error adding custom IPs:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_get_ip_details',
        'Retrieve detailed information for a specific IP address including scan results',
        {
                ip: z.string().describe('The IP address to get detailed information for (e.g., "192.168.1.1")')
            },
        async (params) => {
            try {
                const result = await api.getIpDetails(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting IP details:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_update_ip_labels',
        'Assign or remove labels for an IP address (pass empty array to remove all labels)',
        {
                ip: z.string().describe('The IP address to update labels for (e.g., "192.168.1.1")'),
                labels: z.array(z.string()).describe('Array of labels to assign to the IP address. Pass an empty array [] to remove all existing labels.')
            },
        async (params) => {
            try {
                const result = await api.updateIpLabels(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error updating IP labels:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_get_ranges',
        'Get a list of IP ranges for your account with filtering and sorting options',
        {
                labels: z.array(z.string()).optional().describe('Filter results to only include IP ranges that have all the specified labels assigned'),
                page_token: z.string().optional().describe('Pagination token from a previous request to get the next page of results'),
                page_size: z.number().int().min(10).max(2000).optional().default(1000).describe('Number of IP ranges to return per page (10-2000, defaults to 1000)'),
                sort_by: z.enum(['start', 'end', 'num_ips', 'owner', 'country', 'asn', 'as_name']).optional().default('num_ips').describe('Sort IP ranges by: "start" (starting IP address), "end" (ending IP address), "num_ips" (number of IPs in range), "owner" (organization that owns the range), "country" (country code), "asn" (Autonomous System Number), "as_name" (Autonomous System name)'),
                sort_desc: z.boolean().optional().default(false).describe('Sort in descending order (true) or ascending order (false, default)')
            },
        async (params) => {
            try {
                const result = await api.getRanges(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting IP ranges:', error);
                throw error;
            }
        }
    );
}

module.exports = { registerTools }; 


