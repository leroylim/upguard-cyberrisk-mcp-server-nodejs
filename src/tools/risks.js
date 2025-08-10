const api = require('../api');
const { logger } = require('../utils/logger');
const { z } = require('zod');
const schemas = require('./schemas');

function registerTools(server) {
    server.tool(
        'upguard_get_available_risks',
        'Get a list of available risk types that can be detected by UpGuard',
        {},
        async () => {
            try {
                const result = await api.getAvailableRisks();
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting available risks:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_get_available_risks_v2',
        'Returns a list of available risks in the UpGuard platform with detailed info',
        {},
        async () => {
            try {
                const result = await api.getAvailableRisksV2();
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting available risks v2:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_get_risk_details',
        'Get detailed information about a specific risk',
        {
            risk_id: z.string().min(1).describe('ID of the risk to fetch details for (e.g., domain_expired, exposed_service:FTP)')
        },
        async (params) => {
            try {
                const result = await api.getRiskDetails(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting risk details:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_get_account_risks',
        'Get a comprehensive list of active security risks detected for your account with advanced filtering and pagination',
        {
            min_severity: schemas.severity.optional(),
            include_meta: z.boolean().optional().default(false).describe('Include metadata for risks'),
            page_token: z.string().optional().describe('The page_token from a previous request, use this to get the next page of results'),
            page_size: z.number().int().min(10).max(2000).optional().default(1000).describe('The number of results to return per page (10-2000, default 1000)'),
            sort_by: z.enum(['severity', 'hostname', 'risk_type', 'first_detected_at', 'last_detected_at']).optional().default('severity').describe('Sort by field'),
            sort_desc: z.boolean().optional().default(false).describe('Sort in descending order')
        },
        async (params) => {
            try {
                const result = await api.getAccountRisks(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting account risks:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_get_vendor_risks',
        'Get detailed security risks for a specific vendor to assess their cybersecurity posture and compliance status',
        {
            primary_hostname: schemas.primaryHostname.describe('The primary hostname of the vendor (e.g., "vendor.com")'),
            min_severity: schemas.severity.optional(),
            include_meta: z.boolean().optional().default(false).describe('Include metadata for risks'),
            exclude_hostnames: z.boolean().optional().default(false).describe('Exclude hostnames for risks')
        },
        async (params) => {
            try {
                const result = await api.getVendorRisks(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting vendor risks:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_get_account_risks_diff',
        'Get differences in account risks over time',
        {
            start_date: z.string().datetime().describe('Start date for comparison (RFC 3339 format)'),
            end_date: z.string().datetime().optional().describe('End date for comparison (RFC 3339 format, defaults to current time)')
        },
        async (params) => {
            try {
                const result = await api.getAccountRisksDiff(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting account risks diff:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_get_vendor_risks_diff',
        'Get risk changes for a specific vendor over a time period with detailed change tracking',
        {
            vendor_primary_hostname: schemas.vendorPrimaryHostname.describe('The primary hostname of the vendor to get risk changes for'),
            start_date: z.string().datetime().describe('The start date for the risk changes query (RFC 3339 format)'),
            end_date: z.string().datetime().optional().describe('The end date for the risk changes query (RFC 3339 format). If not provided, latest risks will be used')
        },
        async (params) => {
            try {
                const result = await api.getVendorRisksDiff(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting vendor risks diff:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_get_vendors_risks_diff',
        'Get risk changes for multiple vendors over a time period with detailed change tracking',
        {
            start_date: z.string().datetime().describe('The start date for the risk changes query (RFC 3339 format)'),
            end_date: z.string().datetime().optional().describe('The end date for the risk changes query (RFC 3339 format). If not provided, latest risks will be used'),
            page_token: z.string().optional().describe('The page_token from a previous request, use this to get the next page of results'),
            page_size: z.number().int().min(10).max(200).optional().default(20).describe('The number of results to return per page (10-200, default 20)')
        },
        async (params) => {
            try {
                const result = await api.getVendorsRisksDiff(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting vendors risks diff:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_get_vendor_questionnaire_risks',
        'Get security risks identified through vendor questionnaire responses and assessments',
        {
            vendor_id: z.number().int().optional().describe('Restrict risks to a specific watched vendor by ID'),
            primary_hostname: schemas.primaryHostname.optional().describe('Restrict risks to a specific watched vendor by primary hostname'),
            questionnaire_id: z.number().int().optional().describe('Restrict risks to a specific questionnaire by ID'),
            page_token: z.string().optional().describe('The page_token from a previous request, use this to get the next page of results'),
            page_size: z.number().int().min(10).max(2000).optional().describe('The number of results to return per page (10-2000, default 1000)')
        },
        async (params) => {
            try {
                const result = await api.getVendorQuestionnaireRisks(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting vendor questionnaire risks:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_get_vendor_questionnaire_risks_v2',
        'Get enhanced security risks from vendor questionnaire responses using the latest assessment methodology (v2)',
        {
            vendor_id: z.number().int().optional().describe('Restrict risks to a specific watched vendor by ID'),
            primary_hostname: schemas.primaryHostname.optional().describe('Restrict risks to a specific watched vendor by primary hostname'),
            questionnaire_id: z.number().int().optional().describe('Restrict risks to a specific questionnaire by ID'),
            page_token: z.string().optional().describe('The page_token from a previous request, use this to get the next page of results'),
            page_size: z.number().int().min(10).max(2000).optional().describe('The number of results to return per page (10-2000, default 1000)'),
            ignore_waived_risks: z.boolean().optional().describe('Indicates that waived risks should not be returned')
        },
        async (params) => {
            try {
                const result = await api.getVendorQuestionnaireRisksV2(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting vendor questionnaire risks v2:', error);
                throw error;
            }
        }
    );
}

module.exports = { registerTools }; 


