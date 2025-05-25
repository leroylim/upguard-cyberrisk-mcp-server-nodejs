const api = require('../api');
const { logger } = require('../utils/logger');
const { z } = require('zod');
const schemas = require('./schemas');

function registerTools(server) {
    server.tool(
        'upguard_list_custom_report_templates',
        'List all available custom report templates that can be used for generating reports',
        {},
        async () => {
            try {
                const result = await api.listCustomReportTemplates();
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error listing custom report templates:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_get_custom_reports',
        'Get a list of custom report templates defined for your account to understand available reporting options',
        {},
        async (params) => {
            try {
                const result = await api.listCustomReportTemplates(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting custom reports:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_queue_report',
        'Queue a custom report for generation with specified parameters and filters',
        {
            report_type: z.enum([
                'BoardSummaryPDF', 'BoardSummaryPPTX', 'BreachSightSummaryPDF', 'BreachSightDetailedPDF',
                'VendorRiskExecutiveSummaryPDF', 'VendorSummaryPDF', 'VendorDetailedPDF', 'VendorRiskAssessmentPDF',
                'CustomPDF', 'VendorRiskProfileXLSX', 'VendorVulnsOverviewXLSX', 'VendorDomainListPDF'
            ]).describe('Type of report to generate. Options: "BoardSummaryPDF" (executive board summary), "BoardSummaryPPTX" (board presentation), "BreachSightSummaryPDF" (breach summary), "BreachSightDetailedPDF" (detailed breach report), "VendorRiskExecutiveSummaryPDF" (vendor risk executive summary), "VendorSummaryPDF" (vendor summary), "VendorDetailedPDF" (detailed vendor report), "VendorRiskAssessmentPDF" (vendor risk assessment), "CustomPDF" (custom report template), "VendorRiskProfileXLSX" (vendor risk profile spreadsheet), "VendorVulnsOverviewXLSX" (vulnerabilities overview spreadsheet), "VendorDomainListPDF" (vendor domain list)'),
            custom_report_uuid: z.string().optional().describe('For CustomPDF reports, specify the UUID of the custom report to generate'),
            email_addresses: schemas.emailArray.optional().describe('Optionally email the generated report to the specified addresses when ready'),
            post_webhook_url: z.string().url().optional().describe('Optionally specify a URL that will receive a POST request when the report is ready'),
            asset_portfolio_names: z.array(z.string()).optional().describe('Filter by asset portfolio names (case-sensitive, for BreachSight reports only)'),
            vendor_portfolio_names: z.array(z.string()).optional().describe('Filter by vendor portfolio names (case-sensitive, for Board and Executive reports only)'),
            vendor_id: z.number().int().optional().describe('ID of the vendor to generate the report for'),
            vendor_primary_hostname: z.string().optional().describe('Primary hostname of the vendor to generate the report for'),
            filter_by_vendor_hostnames: z.string().optional().describe('List of hostnames from a single vendor to generate the report for'),
            filename_prefix: z.string().optional().describe('String to use as the first part of the report filename (max 20 characters)'),
            wait_for_data: z.boolean().optional().describe('Wait up to 72 hours for vendor data to become available before generating the report')
        },
        async (params) => {
            try {
                const result = await api.queueReportExport(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error queuing report:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_queue_report_export',
        'Queue a custom report for generation with specified parameters and filters',
        {
            report_type: z.enum([
                'BoardSummaryPDF', 'BoardSummaryPPTX', 'BreachSightSummaryPDF', 'BreachSightDetailedPDF',
                'VendorRiskExecutiveSummaryPDF', 'VendorSummaryPDF', 'VendorDetailedPDF', 'VendorRiskAssessmentPDF',
                'CustomPDF', 'VendorRiskProfileXLSX', 'VendorVulnsOverviewXLSX', 'VendorDomainListPDF'
            ]).describe('Type of report to generate. Options: "BoardSummaryPDF" (executive board summary), "BoardSummaryPPTX" (board presentation), "BreachSightSummaryPDF" (breach summary), "BreachSightDetailedPDF" (detailed breach report), "VendorRiskExecutiveSummaryPDF" (vendor risk executive summary), "VendorSummaryPDF" (vendor summary), "VendorDetailedPDF" (detailed vendor report), "VendorRiskAssessmentPDF" (vendor risk assessment), "CustomPDF" (custom report template), "VendorRiskProfileXLSX" (vendor risk profile spreadsheet), "VendorVulnsOverviewXLSX" (vulnerabilities overview spreadsheet), "VendorDomainListPDF" (vendor domain list)'),
            custom_report_uuid: z.string().optional().describe('For CustomPDF reports, specify the UUID of the custom report to generate'),
            email_addresses: schemas.emailArray.optional().describe('Optionally email the generated report to the specified addresses when ready'),
            post_webhook_url: z.string().url().optional().describe('Optionally specify a URL that will receive a POST request when the report is ready'),
            asset_portfolio_names: z.array(z.string()).optional().describe('Filter by asset portfolio names (case-sensitive, for BreachSight reports only)'),
            vendor_portfolio_names: z.array(z.string()).optional().describe('Filter by vendor portfolio names (case-sensitive, for Board and Executive reports only)'),
            vendor_id: z.number().int().optional().describe('ID of the vendor to generate the report for'),
            vendor_primary_hostname: z.string().optional().describe('Primary hostname of the vendor to generate the report for'),
            filter_by_vendor_hostnames: z.string().optional().describe('List of hostnames from a single vendor to generate the report for'),
            filename_prefix: z.string().optional().describe('String to use as the first part of the report filename (max 20 characters)'),
            wait_for_data: z.boolean().optional().describe('Wait up to 72 hours for vendor data to become available before generating the report')
        },
        async (params) => {
            try {
                const result = await api.queueReportExport(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error queuing report export:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_get_report_status',
        'Check the status of a queued report and get download link when ready',
        {
            queued_report_id: z.string().describe('The ID of the queued report to check status for')
        },
        async (params) => {
            try {
                const result = await api.getReportExportStatus(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting report status:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_get_report_export_status',
        'Check the status of a queued report and get download link when ready',
        {
            queued_report_id: z.string().describe('The ID of the queued report to check status for')
        },
        async (params) => {
            try {
                const result = await api.getReportExportStatus(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting report export status:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_get_available_reports',
        'Get list of custom report templates available for your account',
        {},
        async (params) => {
            try {
                const result = await api.listCustomReportTemplates(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting available reports:', error);
                throw error;
            }
        }
    );
}

module.exports = { registerTools }; 


