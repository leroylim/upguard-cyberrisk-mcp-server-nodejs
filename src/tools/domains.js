const api = require('../api');
const { logger } = require('../utils/logger');
const { z } = require('zod');
const schemas = require('./schemas');

function registerTools(server) {
    server.tool(
        'upguard_get_domains',
        'Get a list of domains for your account with filtering and pagination options',
        {
            labels: schemas.labels.optional().describe('Filter results to only include domains that have all the specified labels assigned'),
            page_token: z.string().optional().describe('Pagination token from a previous request to get the next page of results'),
            page_size: z.number().int().min(10).max(2000).optional().default(1000).describe('Number of domains to return per page (10-2000, defaults to 1000)'),
            sort_by: z.enum(['hostname', 'owner', 'country', 'automated_score']).optional().default('hostname').describe('Sort domains by. Options: "hostname" (domain name), "owner" (organization that owns the domain), "country" (country code where registered), "automated_score" (security score). Default: "hostname"'),
            sort_desc: z.boolean().optional().default(false).describe('Sort in descending order (true) or ascending order (false, default)')
        },
        async (params) => {
            try {
                const result = await api.getDomains(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting domains:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_add_custom_domains',
        'Add multiple custom domains to your account for continuous security monitoring and risk assessment',
        {
            hostnames: z.array(z.string()).describe('The list of domain hostnames to add for monitoring (e.g., ["example.com", "subdomain.example.com"])'),
            labels: z.array(z.string()).optional().describe('Optional labels to assign to the domains for categorization and filtering')
        },
        async (params) => {
            try {
                const result = await api.addCustomDomains(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error adding custom domains:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_get_domain_details',
        'Retrieve comprehensive security details and scan results for a specific domain including risks, vulnerabilities, and configuration issues',
        {
            hostname: schemas.primaryHostname.describe('The domain hostname to get detailed security information for (e.g., "example.com")')
        },
        async (params) => {
            try {
                const result = await api.getDomainDetails(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting domain details:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_update_domain_labels',
        'Assign or remove labels for a domain to improve organization and filtering (pass empty array to remove all labels)',
        {
            hostname: schemas.primaryHostname.describe('The domain hostname to update labels for'),
            labels: schemas.labels.describe('The labels to assign to the domain. Pass an empty array to remove all existing labels.')
        },
        async (params) => {
            try {
                const result = await api.updateDomainLabels(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error updating domain labels:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_remove_custom_domains',
        'Remove multiple custom domains from your account monitoring to stop tracking their security status',
        {
            hostnames: z.array(z.string()).describe('The list of domain hostnames to remove from monitoring')
        },
        async (params) => {
            try {
                const result = await api.removeCustomDomains(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error removing custom domains:', error);
                throw error;
            }
        }
    );
}

module.exports = { registerTools }; 


