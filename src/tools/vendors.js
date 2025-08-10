const api = require('../api');
const { logger } = require('../utils/logger');
const { z } = require('zod');
const schemas = require('./schemas');

function registerTools(server) {
    // All vendor tools following exact Swagger API specification
    
    // Swagger: /vendor - operationId: vendor
    server.tool(
        'upguard_get_vendor',
        'Retrieve comprehensive vendor security details including risk scores, vulnerabilities, and compliance status with optional ad-hoc report generation',
        {
                id: z.number().int().optional().describe('The unique ID of the vendor to retrieve detailed information for'),
                hostname: schemas.primaryHostname.optional().describe('The primary hostname of the vendor (e.g., "vendor.com"). Required when id is not specified'),
                generate_ad_hoc_report: z.boolean().optional().describe('Generate an ad-hoc security report for the vendor if within monthly allocation'),
                start_monitoring: z.boolean().optional().describe('DEPRECATED: Use vendor/monitor instead. Start monitoring the vendor if not already monitored'),
                labels: z.array(z.string()).optional().describe('DEPRECATED: Use vendor/monitor instead. Labels to assign if start_monitoring is true'),
                tier: z.number().int().optional().describe('DEPRECATED: Use vendor/monitor instead. Tier level to assign if start_monitoring is true'),
                wait_for_scan: z.boolean().optional().default(false).describe('Wait for scan results on new unknown vendors before returning response')
            },
        async (params) => {
            try {
                const result = await api.getVendorDetails(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting vendor:', error);
                throw error;
            }
        }
    );

    // Swagger: /vendor/monitor - operationId: monitorvendor
    server.tool(
        'upguard_start_monitoring_vendor',
        'Begin continuous security monitoring for a vendor with customizable tier level and labeling for risk management',
        {
                hostname: schemas.primaryHostname.describe('The primary hostname of the vendor to start monitoring (e.g., "vendor.com")'),
                tier: z.number().int().min(1).max(3).optional().describe('Vendor tier level (1-3, where 1 is highest priority) for risk prioritization'),
                labels: schemas.labels.optional().describe('Labels to assign to the vendor for categorization and filtering'),
                wait_for_scan: z.boolean().optional().default(false).describe('Wait for initial scan completion before returning response')
            },
        async (params) => {
            try {
                const result = await api.startMonitoringVendor(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error starting vendor monitoring:', error);
                throw error;
            }
        }
    );

    // Swagger: /vendor/unmonitor - operationId: unmonitorvendor
    server.tool(
        'upguard_stop_monitoring_vendor',
        'Stop continuous security monitoring for a vendor and remove them from your active vendor portfolio',
        {
                hostname: schemas.primaryHostname.describe('The primary hostname of the vendor to stop monitoring')
            },
        async (params) => {
            try {
                const result = await api.stopMonitoringVendor(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error stopping vendor monitoring:', error);
                throw error;
            }
        }
    );

    // Swagger: /vendor/labels - operationId: vendor_update_labels
    server.tool(
        'upguard_update_vendor_labels',
        'Assign or remove labels for a vendor to improve organization and risk categorization (pass empty array to remove all labels)',
        {
                vendor_primary_hostname: schemas.vendorPrimaryHostname.describe('The primary hostname of the vendor to update labels for'),
                labels: schemas.labels.describe('The labels to assign to the vendor. Pass an empty array to remove all existing labels.')
            },
        async (params) => {
            try {
                const result = await api.updateVendorLabels(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error updating vendor labels:', error);
                throw error;
            }
        }
    );

    // Swagger: /vendor/domains - operationId: vendor_domains
    server.tool(
        'upguard_get_vendor_domains',
        'Get domains for a specific vendor',
        {
                vendor_primary_hostname: z.string().describe('The primary hostname of the vendor')
            },
        async (params) => {
            try {
                const result = await api.getVendorDomains(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting vendor domains:', error);
                throw error;
            }
        }
    );

    // Swagger: /vendor/domain/labels - operationId: vendor_domain_update_labels
    server.tool(
        'upguard_update_vendor_domain_labels',
        'Assign labels to a domain',
        {
                vendor_primary_hostname: z.string().describe('The primary hostname of the vendor'),
                hostname: z.string().describe('The hostname to update labels for'),
                labels: z.array(z.string()).describe('The labels to assign to the domain')
            },
        async (params) => {
            try {
                const result = await api.updateVendorDomainLabels(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error updating vendor domain labels:', error);
                throw error;
            }
        }
    );

    // Swagger: /vendor/ips - operationId: vendor_ips
    server.tool(
        'upguard_get_vendor_ips',
        'Get IP addresses for a specific vendor',
        {
                vendor_primary_hostname: z.string().describe('The primary hostname of the vendor')
            },
        async (params) => {
            try {
                const result = await api.getVendorIps(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting vendor IPs:', error);
                throw error;
            }
        }
    );

    // Swagger: /vendor/ip/labels - operationId: vendor_ip_update_labels
    server.tool(
        'upguard_update_vendor_ip_labels',
        'Update labels for a vendor IP address',
        {
                vendor_primary_hostname: z.string().describe('The primary hostname of the vendor'),
                ip: z.string().describe('The IP address to update'),
                labels: z.array(z.string()).describe('The labels to assign to the IP')
            },
        async (params) => {
            try {
                const result = await api.updateVendorIpLabels(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error updating vendor IP labels:', error);
                throw error;
            }
        }
    );

    // Swagger: /vendors - operationId: vendors
    server.tool(
        'upguard_list_monitored_vendors',
        'List monitored vendors',
        {
                include_ad_hoc_reports: z.boolean().optional().describe('Include vendors with an existing ad hoc report in the results'),
                page_token: z.string().optional().describe('The token of the page to be returned'),
                page_size: z.number().int().optional().describe('The number of results to return per page (10-2000, default 1000)'),
                labels: z.array(z.string()).optional().describe('Filter result by the provided labels'),
                include_risks: z.boolean().optional().describe('Include risks')
            },
        async (params) => {
            try {
                const result = await api.listMonitoredVendors(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error listing monitored vendors:', error);
                throw error;
            }
        }
    );

    // Swagger: /vendor/additionalevidence/list - operationId: additional_evidences_list
    server.tool(
        'upguard_get_vendor_additional_evidence_list',
        'Get a chronological list of additional evidence documents uploaded for vendor security assessments',
        {
                vendor_primary_hostname: z.string().describe('The primary hostname of the vendor to show additional evidence for')
            },
        async (params) => {
            try {
                const result = await api.listVendorAdditionalEvidence(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting vendor additional evidence list:', error);
                throw error;
            }
        }
    );

    // Swagger: /vendor/additionalevidence - operationId: additional_evidence
    server.tool(
        'upguard_get_vendor_additional_evidence',
        'Retrieve specific additional evidence documents by ID for detailed vendor security documentation',
        {
                evidence_ids: z.array(z.number().int()).describe('Array of evidence document IDs to retrieve'),
                zip: z.boolean().optional().describe('Return multiple files as a single zip archive instead of multi-part response')
            },
        async (params) => {
            try {
                const result = await api.getVendorAdditionalEvidence(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting vendor additional evidence:', error);
                throw error;
            }
        }
    );
}

module.exports = { registerTools }; 


