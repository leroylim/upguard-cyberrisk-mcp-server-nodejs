const api = require('../api');
const { logger } = require('../utils/logger');
const { z } = require('zod');

function registerTools(server) {
    server.tool(
        'upguard_get_subsidiaries',
        'Get a list of subsidiaries',
        {},
        async (params) => {
            try {
                const result = await api.getSubsidiaries(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting subsidiaries:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_get_subsidiary_domain_details',
        'Retrieve details for a domain',
        {
                subsidiary_primary_hostname: z.string().describe('The primary hostname of the subsidiary to show the domain detail for'),
                hostname: z.string().describe('The hostname for which to return the details, e.g. "upguard.com"')
            },
        async (params) => {
            try {
                const result = await api.getSubsidiaryDomainDetails(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting subsidiary domain details:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_update_subsidiary_domain_labels',
        'Assign labels to a domain',
        {
                subsidiary_primary_hostname: z.string().describe('The primary hostname of the subsidiary to update the domain labels for'),
                hostname: z.string().describe('The hostname to update labels for'),
                labels: z.array(z.string()).describe('The labels to assign to the domain. You can pass an empty array to remove all labels.')
            },
        async (params) => {
            try {
                const result = await api.updateSubsidiaryDomainLabels(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error updating subsidiary domain labels:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_get_subsidiary_domains',
        'List subsidiary domains',
        {
                subsidiary_primary_hostname: z.string().describe('The primary hostname of the subsidiary to show domains for'),
                active: z.boolean().optional().default(true).describe('Retrieve active domains'),
                inactive: z.boolean().optional().default(true).describe('Retrieve inactive domains'),
                labels: z.array(z.string()).optional().describe('Filter result by the provided labels'),
                page_token: z.string().optional().describe('The page_token from a previous request, use this to get the next page of results'),
                page_size: z.number().int().min(10).max(2000).optional().default(1000).describe('The number of results to return per page'),
                sort_by: z.enum(['domain', 'active', 'automated_score', 'scanned_at']).optional().default('domain').describe('The value to sort the domains by'),
                sort_desc: z.boolean().optional().default(false).describe('Whether or not to sort the results in descending order')
            },
        async (params) => {
            try {
                const result = await api.getSubsidiaryDomains(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting subsidiary domains:', error);
                throw error;
            }
        }
    );
}

module.exports = { registerTools }; 


