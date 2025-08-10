const schemas = require('./tools/schemas');
const { z } = require('zod');
const { logger } = require('./utils/logger');

function registerPrompts(server) {
    // Example prompts for common operations
    server.prompt(
        'upguard_get_my_organization_risks',
        {
            min_severity: schemas.severity.optional()
                .describe('Minimum severity level for risks.'),
            include_meta: z.boolean().optional().default(false)
                .describe('Include additional risk metadata.')
        },
        (args) => ({
            messages: [{
                role: 'user',
                content: {
                    type: 'text',
                    text: `Please show me all risks for my organization${args.min_severity ? ` with minimum severity of ${args.min_severity}` : ''}${args.include_meta ? ' including metadata' : ''} using 'upguard_get_account_risks'.`
                }
            }]
        })
    );

    server.prompt(
        'upguard_monitor_new_vendor',
        {
            vendorHostname: schemas.vendorHostname,
            vendorTier: z.number().int().min(1).max(3).optional()
                .describe('Tier to assign to the vendor (1-3).'),
            vendorLabels: schemas.labels.optional()
        },
        (args) => ({
            messages: [{
                role: 'user',
                content: {
                    type: 'text',
                    text: `Please start monitoring the vendor ${args.vendorHostname}${args.vendorTier ? ` as tier ${args.vendorTier}` : ''}${args.vendorLabels ? ` with labels: ${args.vendorLabels.join(', ')}` : ''} using 'upguard_start_monitoring_vendor'.`
                }
            }]
        })
    );

    // Risk assessment prompt
    server.prompt(
        'upguard_assess_vendor_risks',
        {
            vendorHostname: schemas.vendorHostname,
            timeRange: schemas.timeRange.optional(),
            riskFilters: schemas.riskFilters.optional()
        },
        (args) => ({
            messages: [
                {
                    role: 'user',
                    content: {
                        type: 'text',
                    text: `Please analyze risks for vendor ${args.vendorHostname} using the following steps:
1. Get current vendor risks using 'upguard_get_vendor_risks'
2. If timeRange is provided, get risk changes using 'upguard_get_vendor_risks_diff'
3. Get vendor details using 'upguard_get_vendor_details'
4. Summarize the findings and highlight critical issues`
                    }
                }
            ]
        })
    );

    // Bulk domain management prompt
    server.prompt(
        'upguard_manage_domains',
        {
            operation: z.enum(['add', 'remove', 'update']),
            domains: z.array(z.string()).min(1),
            labels: schemas.labels.optional()
        },
        (args) => ({
            messages: [
                {
                    role: 'user',
                    content: {
                        type: 'text',
                        text: `Please ${args.operation} the following domains: ${args.domains.join(', ')}${args.labels ? ` with labels: ${args.labels.join(', ')}` : ''}`
                    }
                }
            ]
        })
    );

    // Breach investigation prompt
    server.prompt(
        'upguard_investigate_breaches',
        {
            domain: z.string(),
            includeUnverified: z.boolean().optional().default(false),
            detailed: z.boolean().optional().default(false)
        },
        (args) => ({
            messages: [
                {
                    role: 'user',
                    content: {
                        type: 'text',
                        text: `Please investigate breaches for domain ${args.domain}:
1. Get breached identities using 'upguard_get_breached_identities'
2. ${args.detailed ? 'For each breached identity, get detailed breach info using upguard_get_identity_breach' : 'Summarize the findings'}
3. ${args.includeUnverified ? 'Include unverified breaches in the analysis' : 'Only include verified breaches'}`
                    }
                }
            ]
        })
    );

    // Report generation prompt
    server.prompt(
        'upguard_generate_report',
        {
            reportType: z.enum([
                'BoardSummaryPDF', 'VendorRiskExecutiveSummaryPDF',
                'VendorDetailedPDF', 'BreachSightDetailedPDF'
            ]),
            emailAddresses: z.array(z.string().email()).max(5).optional(),
            waitForCompletion: z.boolean().optional().default(false)
        },
        (args) => ({
            messages: [
                {
                    role: 'user',
                    content: {
                        type: 'text',
                        text: `Please generate a ${args.reportType} report:
1. Queue the report using 'upguard_queue_report_export'
${args.emailAddresses ? `2. Send to: ${args.emailAddresses.join(', ')}` : ''}
${args.waitForCompletion ? '3. Wait and check status using upguard_get_report_status' : ''}`
                    }
                }
            ]
        })
    );

    // ===== ENHANCED COMPREHENSIVE PROMPTS =====

    // 1. Comprehensive Risk Assessment Workflow
    server.prompt(
        'upguard_comprehensive_risk_assessment',
        {
            target: z.enum(['organization', 'vendor']).describe('Assessment target: organization-wide or specific vendor'),
            targetHostname: schemas.primaryHostname.optional().describe('Vendor hostname (required if target is vendor)'),
            severityThreshold: schemas.severity.optional().default('medium').describe('Minimum severity level for analysis'),
            timeFrameDays: z.number().int().min(1).max(365).optional().default(30).describe('Time frame in days for historical analysis'),
            includeHistoricalAnalysis: z.boolean().optional().default(true).describe('Include risk trend analysis over time'),
            generateReport: z.boolean().optional().default(false).describe('Generate downloadable report after assessment')
        },
        (args) => ({
            messages: [
                {
                    role: 'user',
                    content: {
                        type: 'text',
                        text: `Please perform a comprehensive risk assessment for ${args.target === 'organization' ? 'my organization' : `vendor ${args.targetHostname}`}:

**Step 1: Current Risk Analysis**
${args.target === 'organization' ?
`- Get current account risks using 'upguard_get_account_risks' with min_severity=${args.severityThreshold}` :
`- Get vendor risks using 'upguard_get_vendor_risks' for hostname=${args.targetHostname} with min_severity=${args.severityThreshold}`}
- Get available risk types using 'upguard_get_available_risks_v2' for context

**Step 2: Risk Details and Impact**
- For each critical/high severity risk found, get detailed information using 'upguard_get_risk_details'
- Categorize risks by type and impact

${args.includeHistoricalAnalysis ? `**Step 3: Historical Risk Trends**
- Get risk changes over the last ${args.timeFrameDays} days using '${args.target === 'organization' ? 'upguard_get_account_risks_diff' : 'upguard_get_vendor_risks_diff'}'
- Analyze risk introduction and resolution patterns` : ''}

**Step 4: Risk Prioritization and Summary**
- Prioritize risks by severity, business impact, and ease of remediation
- Provide actionable recommendations for each high-priority risk
- Generate executive summary with key metrics

${args.generateReport ? `**Step 5: Report Generation**
- Queue appropriate report using 'upguard_queue_report_export'` : ''}`
                    }
                }
            ]
        })
    );

    // 2. Risk Trend Analysis Prompt
    server.prompt(
        'upguard_risk_trend_analysis',
        {
            timeRanges: z.array(z.object({
                start_date: z.string().datetime().describe('Start date for this period'),
                end_date: z.string().datetime().describe('End date for this period'),
                label: z.string().describe('Label for this time period (e.g., Q1 2024)')
            })).min(2).max(4).describe('Time periods to compare (e.g., quarterly comparisons)'),
            vendorHostnames: z.array(z.string()).optional().describe('Specific vendors to analyze (leave empty for organization-wide)'),
            focusArea: z.enum(['all', 'critical_only', 'new_risks', 'resolved_risks']).optional().default('all').describe('Analysis focus area')
        },
        (args) => ({
            messages: [
                {
                    role: 'user',
                    content: {
                        type: 'text',
                        text: `Please analyze risk trends across multiple time periods: ${args.timeRanges.map(tr => tr.label).join(', ')}

**For each time period analysis:**

${args.vendorHostnames ?
`**Vendor-Specific Analysis for: ${args.vendorHostnames.join(', ')}**
${args.timeRanges.map((tr, i) =>
`${i + 1}. Get vendor risks diff for ${tr.label} (${tr.start_date} to ${tr.end_date}) using 'upguard_get_vendor_risks_diff'`
).join('\n')}` :
`**Organization-Wide Analysis**
${args.timeRanges.map((tr, i) =>
`${i + 1}. Get account risks diff for ${tr.label} (${tr.start_date} to ${tr.end_date}) using 'upguard_get_account_risks_diff'`
).join('\n')}`}

**Analysis Focus: ${args.focusArea}**
- Compare risk volumes, severity distributions, and resolution rates
- Identify emerging risk patterns and improvement areas
- Generate trend visualizations and insights
- Provide recommendations for risk management strategy improvements`
                    }
                }
            ]
        })
    );

    // 3. Automated Compliance Reporting
    server.prompt(
        'upguard_compliance_reporting_suite',
        {
            reportingPeriod: z.enum(['monthly', 'quarterly', 'annual']).describe('Reporting frequency and scope'),
            complianceFramework: z.enum(['SOC2', 'ISO27001', 'NIST', 'PCI_DSS', 'GDPR', 'custom']).optional().describe('Compliance framework focus'),
            recipientGroups: z.object({
                board: schemas.emailArray.optional().describe('Board of directors email addresses'),
                executives: schemas.emailArray.optional().describe('Executive team email addresses'),
                security_team: schemas.emailArray.optional().describe('Security team email addresses'),
                compliance_team: schemas.emailArray.optional().describe('Compliance team email addresses')
            }).describe('Email distribution groups for reports'),
            includeVendorRiskProfile: z.boolean().optional().default(true).describe('Include vendor risk analysis'),
            includeBreachAnalysis: z.boolean().optional().default(true).describe('Include breach monitoring results')
        },
        (args) => ({
            messages: [
                {
                    role: 'user',
                    content: {
                        type: 'text',
                        text: `Please generate a comprehensive compliance reporting suite for ${args.reportingPeriod} reporting:

**Step 1: Executive Reports**
${args.recipientGroups.board ? `- Generate 'BoardSummaryPDF' using 'upguard_queue_report_export' for board: ${args.recipientGroups.board.join(', ')}` : ''}
${args.recipientGroups.executives ? `- Generate 'VendorRiskExecutiveSummaryPDF' using 'upguard_queue_report_export' for executives: ${args.recipientGroups.executives.join(', ')}` : ''}

**Step 2: Detailed Analysis Reports**
${args.includeVendorRiskProfile ? '- Generate \'VendorRiskProfileXLSX\' for vendor risk analysis' : ''}
${args.includeBreachAnalysis ? '- Generate \'BreachSightDetailedPDF\' for breach monitoring results' : ''}

**Step 3: Technical Reports**
${args.recipientGroups.security_team ? `- Generate 'VendorVulnsOverviewXLSX' for security team: ${args.recipientGroups.security_team.join(', ')}` : ''}

**Step 4: Report Status Monitoring**
- Monitor all report generation using 'upguard_get_report_export_status'
- Provide completion summary with download links

${args.complianceFramework ? `**Compliance Framework: ${args.complianceFramework}**
- Ensure reports align with ${args.complianceFramework} requirements
- Include relevant risk categories and controls` : ''}

**Step 5: Distribution and Archival**
- Distribute reports to appropriate stakeholders
- Archive reports for audit trail and historical analysis`
                    }
                }
            ]
        })
    );

    // 4. Bulk Domain Lifecycle Management
    server.prompt(
        'upguard_domain_lifecycle_management',
        {
            operation: z.enum(['onboard_new_domains', 'offboard_domains', 'reorganize_domains', 'audit_domains']).describe('Domain lifecycle operation to perform'),
            domainList: z.array(z.string()).optional().describe('List of domains for operation (required for onboard/offboard)'),
            organizationalStructure: z.object({
                business_unit: z.string().optional().describe('Business unit classification'),
                environment: z.enum(['production', 'staging', 'development']).optional().describe('Environment type'),
                criticality: z.enum(['critical', 'high', 'medium', 'low']).optional().describe('Business criticality level')
            }).optional().describe('Organizational metadata for domains'),
            autoLabeling: z.boolean().optional().default(true).describe('Automatically apply organizational labels')
        },
        (args) => ({
            messages: [
                {
                    role: 'user',
                    content: {
                        type: 'text',
                        text: `Please execute ${args.operation.replace(/_/g, ' ')} workflow:

${args.operation === 'onboard_new_domains' ? `**Domain Onboarding Process**
${args.domainList ? `1. Add domains: ${args.domainList.join(', ')} using 'upguard_add_custom_domains'` : '1. Add provided domains using \'upguard_add_custom_domains\''}
${args.autoLabeling && args.organizationalStructure ? `2. Apply labels: ${Object.entries(args.organizationalStructure).filter(([_k,v]) => v).map(([k,v]) => `${k}:${v}`).join(', ')} using 'upguard_update_domain_labels'` : ''}
3. Get initial domain details for each domain using 'upguard_get_domain_details'
4. Generate domain monitoring summary and baseline security report` : ''}

${args.operation === 'audit_domains' ? `**Domain Audit Process**
1. Get current domain inventory using 'upguard_get_domains'
2. For each domain, get detailed security status using 'upguard_get_domain_details'
3. Analyze domain security posture and compliance
4. Identify domains needing attention or updates
5. Generate audit report with recommendations and compliance status` : ''}

${args.operation === 'reorganize_domains' ? `**Domain Reorganization Process**
1. Get current domain inventory using 'upguard_get_domains'
2. Review current labeling and categorization
3. Update domain labels based on new organizational structure using 'upguard_update_domain_labels'
4. Validate new organization and generate summary` : ''}

${args.operation === 'offboard_domains' ? `**Domain Offboarding Process**
${args.domainList ? `1. Remove domains: ${args.domainList.join(', ')} using 'upguard_remove_custom_domains'` : '1. Remove specified domains using \'upguard_remove_custom_domains\''}
2. Generate final security report for removed domains
3. Archive monitoring data and provide offboarding summary` : ''}

**Final Step: Documentation and Validation**
- Document all changes and provide operation summary
- Validate successful completion of all workflow steps`
                    }
                }
            ]
        })
    );

    // 5. Large-Scale Asset Management
    server.prompt(
        'upguard_bulk_asset_management',
        {
            operationType: z.enum(['mass_onboarding', 'health_check', 'label_reorganization', 'capacity_planning']).describe('Type of bulk operation to perform'),
            assetCount: z.number().int().min(1).optional().describe('Expected number of assets to process'),
            batchSize: z.number().int().min(1).max(100).optional().default(50).describe('Number of assets to process per batch'),
            monitoringTier: z.enum(['1', '2', '3']).optional().describe('Monitoring tier for new assets (1=highest priority)'),
            labelStrategy: z.object({
                department: z.array(z.string()).optional().describe('Department labels to apply'),
                environment: z.array(z.string()).optional().describe('Environment labels to apply'),
                criticality: z.array(z.string()).optional().describe('Criticality labels to apply')
            }).optional().describe('Labeling strategy for assets')
        },
        (args) => ({
            messages: [
                {
                    role: 'user',
                    content: {
                        type: 'text',
                        text: `Please execute bulk asset management operation: ${args.operationType.replace(/_/g, ' ')}

**Step 1: Infrastructure Assessment**
- Get current bulk hostname statistics using 'upguard_bulk_get_hostnames_stats'
- Assess current capacity and resource allocation

${args.operationType === 'mass_onboarding' ? `**Step 2: Mass Onboarding Process**
- Register hostnames in batches of ${args.batchSize} using 'upguard_bulk_register_hostnames'
${args.assetCount ? `- Process approximately ${args.assetCount} total assets` : ''}
${args.labelStrategy ? `- Apply standardized labeling: ${Object.entries(args.labelStrategy).map(([k,v]) => `${k}: ${v?.join(', ')}`).join('; ')}` : ''}
- Monitor registration progress and handle any failures
- Validate successful onboarding for all assets` : ''}

${args.operationType === 'health_check' ? `**Step 2: Comprehensive Health Check**
- List all registered hostnames using 'upguard_bulk_list_hostnames'
- For critical assets, get detailed information using 'upguard_bulk_get_hostname_details'
- Identify inactive or problematic hostnames
- Generate health status report with recommendations` : ''}

${args.operationType === 'label_reorganization' ? `**Step 2: Label Reorganization**
- Audit current labeling using 'upguard_bulk_list_hostnames'
- Update labels in batches using 'upguard_bulk_hostname_put_labels'
${args.labelStrategy ? `- Apply new label strategy: ${Object.entries(args.labelStrategy).map(([k,v]) => `${k}: ${v?.join(', ')}`).join('; ')}` : ''}
- Validate label consistency across all assets` : ''}

${args.operationType === 'capacity_planning' ? `**Step 2: Capacity Planning Analysis**
- Analyze current asset distribution and usage patterns
- Calculate resource utilization and growth trends
- Recommend capacity adjustments and optimization strategies` : ''}

**Step 3: Results and Reporting**
- Generate comprehensive operation summary
- Provide metrics and performance indicators
- Document any issues and remediation steps`
                    }
                }
            ]
        })
    );

    // 6. Network Security Assessment
    server.prompt(
        'upguard_network_security_assessment',
        {
            assessmentScope: z.enum(['full_network', 'specific_ranges', 'new_ips']).describe('Scope of network security assessment'),
            ipRanges: z.array(z.string()).optional().describe('Specific IP ranges to assess (required for specific_ranges scope)'),
            securityFocus: z.enum(['vulnerability_scan', 'configuration_review', 'compliance_check', 'all']).optional().default('all').describe('Security assessment focus area'),
            reportDeepDive: z.boolean().optional().default(false).describe('Generate detailed technical analysis')
        },
        (args) => ({
            messages: [
                {
                    role: 'user',
                    content: {
                        type: 'text',
                        text: `Please perform a network security assessment with scope: ${args.assessmentScope}

**Step 1: IP Asset Discovery and Inventory**
${args.assessmentScope === 'full_network' ? `- Get complete IP inventory using 'upguard_get_ips'
- Get IP ranges using 'upguard_get_ranges'` : ''}
${args.assessmentScope === 'specific_ranges' && args.ipRanges ? `- Focus on IP ranges: ${args.ipRanges.join(', ')}
- Get detailed range information using 'upguard_get_ranges'` : ''}
${args.assessmentScope === 'new_ips' ? `- Add new IPs to monitoring using 'upguard_add_custom_ips'
- Get baseline security assessment for new assets` : ''}

**Step 2: Security Analysis (Focus: ${args.securityFocus})**
- For each IP address, get detailed security information using 'upguard_get_ip_details'
${args.securityFocus === 'vulnerability_scan' || args.securityFocus === 'all' ? '- Identify exposed services and potential vulnerabilities' : ''}
${args.securityFocus === 'configuration_review' || args.securityFocus === 'all' ? '- Review security configurations and hardening status' : ''}
${args.securityFocus === 'compliance_check' || args.securityFocus === 'all' ? '- Check compliance with security standards and policies' : ''}

**Step 3: Risk Prioritization and Labeling**
- Categorize IPs by risk level and exposure
- Apply appropriate security labels using 'upguard_update_ip_labels'
- Prioritize remediation efforts based on risk and business impact

${args.reportDeepDive ? `**Step 4: Detailed Reporting**
- Generate comprehensive network security report
- Include vulnerability details, remediation recommendations, and compliance status
- Provide executive summary and technical appendix` : `**Step 4: Summary Report**
- Provide high-level security assessment summary
- Highlight critical issues requiring immediate attention`}

**Step 5: Recommendations and Next Steps**
- Provide prioritized remediation recommendations
- Suggest ongoing monitoring and security improvements`
                    }
                }
            ]
        })
    );

    // 7. Comprehensive Alerting Setup
    server.prompt(
        'upguard_setup_comprehensive_alerting',
        {
            alertingTier: z.enum(['basic', 'advanced', 'enterprise']).describe('Alerting configuration complexity level'),
            notificationChannels: z.object({
                security_team: z.string().url().optional().describe('Security team webhook URL'),
                executives: z.string().url().optional().describe('Executive team webhook URL'),
                operations: z.string().url().optional().describe('Operations team webhook URL'),
                compliance: z.string().url().optional().describe('Compliance team webhook URL')
            }).describe('Notification channel webhook URLs'),
            alertPriorities: z.object({
                critical_risks: z.boolean().optional().default(true).describe('Alert on critical risk detection'),
                new_vendors: z.boolean().optional().default(true).describe('Alert on new vendor additions'),
                compliance_changes: z.boolean().optional().default(true).describe('Alert on compliance status changes'),
                breach_alerts: z.boolean().optional().default(true).describe('Alert on breach detection')
            }).describe('Alert priority configuration')
        },
        (args) => ({
            messages: [
                {
                    role: 'user',
                    content: {
                        type: 'text',
                        text: `Please set up comprehensive alerting system with ${args.alertingTier} tier configuration:

**Step 1: Notification Assessment**
- Get available notification types using 'upguard_get_webhook_notification_types'
- Review current webhook configuration using 'upguard_list_webhooks'
- Get sample webhook data using 'upguard_get_webhook_sample_data'

**Step 2: Webhook Configuration**
${Object.entries(args.notificationChannels).filter(([_k,v]) => v).map(([team, url]) =>
`- Create ${team.replace('_', ' ')} webhook using 'upguard_create_webhook' for ${url}`
).join('\n')}

**Step 3: Alert Priority Configuration**
${args.alertPriorities.critical_risks ? '- Configure critical risk alerts for immediate notification' : ''}
${args.alertPriorities.new_vendors ? '- Set up new vendor monitoring alerts' : ''}
${args.alertPriorities.compliance_changes ? '- Enable compliance status change notifications' : ''}
${args.alertPriorities.breach_alerts ? '- Configure breach detection alerts' : ''}

**Step 4: Testing and Validation**
- Test all webhook endpoints with sample data
- Validate alert routing and escalation procedures
- Document alerting procedures and contact information

**Step 5: Monitoring Setup Summary**
- Generate webhook configuration summary
- Provide troubleshooting guide and maintenance procedures
- Set up monitoring for webhook health and delivery`
                    }
                }
            ]
        })
    );

    // 8. Organizational Security Dashboard
    server.prompt(
        'upguard_security_dashboard_setup',
        {
            dashboardType: z.enum(['executive', 'operational', 'compliance', 'technical']).describe('Dashboard type and target audience'),
            refreshInterval: z.enum(['real-time', 'hourly', 'daily', 'weekly']).optional().default('daily').describe('Dashboard data refresh frequency'),
            includeSubsidiaries: z.boolean().optional().default(false).describe('Include subsidiary data in dashboard'),
            customLabelsFilter: z.array(z.string()).optional().describe('Filter dashboard data by specific labels')
        },
        (args) => ({
            messages: [
                {
                    role: 'user',
                    content: {
                        type: 'text',
                        text: `Please set up a ${args.dashboardType} security dashboard with ${args.refreshInterval} updates:

**Step 1: Organizational Structure Assessment**
- Get organization details using 'upguard_get_organisation'
${args.includeSubsidiaries ? '- Get subsidiaries information using \'upguard_get_subsidiaries\'' : ''}
- Get available labels using 'upguard_get_labels'

**Step 2: Dashboard Data Collection**
${args.dashboardType === 'executive' ? `- Collect high-level risk metrics and trends
- Focus on business impact and strategic risk indicators
- Generate board-ready summaries and visualizations` : ''}

${args.dashboardType === 'operational' ? `- Gather operational security metrics and KPIs
- Monitor day-to-day security operations and incidents
- Track security team performance and workload` : ''}

${args.dashboardType === 'compliance' ? `- Compile compliance status and audit readiness metrics
- Monitor regulatory requirements and control effectiveness
- Track compliance trends and remediation progress` : ''}

${args.dashboardType === 'technical' ? `- Collect detailed technical security metrics
- Monitor infrastructure security and vulnerability status
- Provide deep-dive analysis for security engineers` : ''}

${args.customLabelsFilter ? `**Step 3: Custom Filtering**
- Apply label filters: ${args.customLabelsFilter.join(', ')}
- Generate filtered views and specialized metrics` : ''}

**Step 4: Dashboard Configuration**
- Configure automated ${args.refreshInterval} data refresh
- Set up data visualization and alert thresholds
- Generate dashboard access and sharing procedures

**Step 5: Dashboard Validation and Training**
- Test dashboard functionality and data accuracy
- Provide user training and documentation
- Set up feedback collection and improvement processes`
                    }
                }
            ]
        })
    );

    // ===== EXISTING PROMPTS FROM ROOT INDEX.JS =====

    // Organizational details prompt
    server.prompt(
        'upguard_get_my_organization_details',
        {},
        () => ({
            messages: [{ role: 'user', content: { type: 'text', text: 'Please retrieve my organization\'s details, including name, primary hostname, and overall security score, using \'upguard_get_organisation\'.' } }]
        })
    );

    // Domain risk check prompt
    server.prompt(
        'upguard_check_domain_risks',
        {
            domainName: z.string().describe('The domain name to check for risks.')
        },
        ({ domainName }) => ({
            messages: [{ role: 'user', content: { type: 'text', text: `
Provide a risk report for the domain '${domainName}'.
1. Use 'upguard_get_domain_details' to get general information and current risks for '${domainName}'.
2. Use 'upguard_get_account_risks_diff' for the last 7 days (calculate start_date based on current date, use ISO 8601 format like YYYY-MM-DDTHH:MM:SSZ) to see recent risk changes potentially affecting this domain (note: this endpoint is account-wide, so you'll need to infer relevance).
Summarize the current security posture, listing key risks from step 1, and any recent significant risk changes from step 2 that might be related to '${domainName}'.` } }]
        })
    );

    // Vendor critical risks listing
    server.prompt(
        'upguard_list_vendors_with_critical_risks',
        {
            minSeverity: z.enum(['info', 'low', 'medium', 'high', 'critical']).default('critical').describe('Minimum risk severity to filter for.')
        },
        ({ minSeverity }) => ({
            messages: [{ role: 'user', content: { type: 'text', text: `
List all monitored vendors that currently have risks with a severity of '${minSeverity}' or higher.
1. Use 'upguard_list_monitored_vendors' to get all monitored vendors, including their risks by setting 'include_risks' to true. You might need to handle pagination if there are many vendors; start with the first page.
2. Iterate through the vendors and their risks. For each vendor, check if any of their risks meet the minimum severity of '${minSeverity}'.
3. Compile a list of these vendors, including their primary_hostname, name, overall score, and a count of their risks matching the '${minSeverity}' or higher criteria.
Present the list clearly.`
            }}]
        })
    );

    // Full vendor risk profile
    server.prompt(
        'upguard_full_vendor_risk_profile',
        {
            vendorHostnameOrId: z.string().describe('The primary hostname OR Upguard ID of the vendor.')
        },
        ({ vendorHostnameOrId }) => ({
            messages: [{ role: 'user', content: { type: 'text', text: `
Generate a comprehensive risk profile for vendor identified by '${vendorHostnameOrId}'.
1. Resolve '${vendorHostnameOrId}' to a vendor ID and primary hostname. If it's already an ID, confirm its hostname. You can use 'upguard_resolve_vendor_by_hostname' if a hostname is provided. If an ID is provided, use 'upguard_get_vendor_details' with the ID to get the hostname. Let's call the resolved primary hostname VENDOR_HOSTNAME and vendor ID VENDOR_ID.
2. Use 'upguard_get_vendor_details' with VENDOR_ID or VENDOR_HOSTNAME to get general details and overall scores.
3. Use 'upguard_get_vendor_risks' with primary_hostname VENDOR_HOSTNAME and min_severity 'info' to list all current risks.
4. Use 'upguard_list_vendor_questionnaires_v2' with vendor_primary_hostname VENDOR_HOSTNAME (or vendor_id VENDOR_ID) to get a list of their questionnaires and statuses.
5. Summarize the vendor's name, overall score, number of active risks by severity (count them from step 3), and a summary of their questionnaire activity (e.g., number of sent, completed, in-review questionnaires).`
            }}]
        })
    );

    // Monitor new vendor and send questionnaire
    server.prompt(
        'upguard_monitor_new_vendor_and_send_questionnaire',
        {
            vendorHostname: z.string().describe('The primary hostname of the new vendor to monitor.'),
            vendorTier: z.number().int().optional().describe('Tier to assign to the vendor (e.g., 1, 2, 3).'),
            vendorLabels: z.array(z.string()).optional().describe("Labels to assign to the vendor (e.g., ['critical', 'cloud_provider'])."),
            questionnaireTypeName: z.string().default('Standard Security Questionnaire').describe('Name of the questionnaire type to send.'),
            contactEmail: z.string().email().describe('Email address of the vendor contact for the questionnaire.'),
            dueDateYYYYMMDD: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD').describe('Due date for the questionnaire in YYYY-MM-DD format.'),
            senderEmail: z.string().email().describe('Your email address (as an UpGuard user) sending the questionnaire.')
        },
        ({ vendorHostname, vendorTier, vendorLabels, questionnaireTypeName, contactEmail, dueDateYYYYMMDD, senderEmail }) => ({
            messages: [{ role: 'user', content: { type: 'text', text: `
Onboard a new vendor '${vendorHostname}' and send them a questionnaire.
1. Use 'upguard_start_monitoring_vendor'. Set hostname to '${vendorHostname}'.
   ${vendorTier ? `Set tier to ${vendorTier}.` : ''}
   ${vendorLabels && vendorLabels.length > 0 ? `Set labels to ${JSON.stringify(vendorLabels)}.` : ''}
   If monitoring is successful, extract the 'id' from the response (this is the vendor_id).
2. Use 'upguard_get_questionnaire_types' to find the ID for a questionnaire type named (or very similar to) '${questionnaireTypeName}'. Match based on 'questionnaire_type_name'.
3. If both vendor monitoring was successful (you have the vendor_id) and the questionnaire type ID was found, use 'upguard_send_vendor_questionnaire' with:
   - vendor_id: (the ID from step 1)
   - questionnaire_type_id: (the ID from step 2)
   - sender_email: '${senderEmail}'
   - due_date: '${dueDateYYYYMMDD}'
   - recipients: [{ "recipient_email": "${contactEmail}" }]
   - risk_information_visiblity: "ShowAllRiskInformation" (default, or choose another appropriate value)
4. Report the results of each step, including the vendor ID, vendor name (from step 1 response if available), and questionnaire ID sent (from step 3 response if available).`
            }}]
        })
    );

    // Investigate identity breach for domain
    server.prompt(
        'upguard_investigate_identity_breach_for_domain',
        {
            domainName: z.string().describe('The domain name to investigate for breached identities.')
        },
        ({ domainName }) => ({
            messages: [{ role: 'user', content: { type: 'text', text: `
Investigate identity breaches related to the domain '${domainName}'.
1. Use 'upguard_get_breached_identities' and filter by domain '${domainName}' (the tool currently sorts, so the LLM would need to process the full list or use pagination to find matches; or if the API adds a direct domain filter, use that). For now, just get the first page.
2. If breached identities are found for '${domainName}', pick one or two. For each, get the list of 'breach_ids'.
3. For each distinct 'breach_id' found, use 'upguard_get_identity_breach' to get the details of that specific breach.
4. Summarize your findings: list breached identities found for the domain, and details of the associated breaches (name, date, exposed data classes).`
            }}]
        })
    );

    // Generate vendor report and track
    server.prompt(
        'upguard_generate_vendor_report_and_track',
        {
            vendorHostname: z.string().describe('Primary hostname of the vendor for the report.'),
            reportType: z.enum([
                'VendorSummaryPDF', 'VendorDetailedPDF', 'VendorRiskAssessmentPDF',
                'VendorRiskProfileXLSX', 'VendorVulnsOverviewXLSX', 'VendorDomainListPDF'
            ]).default('VendorDetailedPDF').describe('Type of vendor report to generate.'),
            userEmailForNotification: z.string().email().optional().describe('Your email to receive the report upon completion.')
        },
        ({ vendorHostname, reportType, userEmailForNotification }) => ({
            messages: [{ role: 'user', content: { type: 'text', text: `
Generate a '${reportType}' report for vendor '${vendorHostname}' and explain how to track its status.
1. Use 'upguard_queue_report_export' with:
   - report_type: '${reportType}'
   - vendor_primary_hostname: '${vendorHostname}'
   ${userEmailForNotification ? `- email_addresses: ["${userEmailForNotification}"]` : ''}
2. If the report is queued successfully, you will receive a 'queued_report_id'.
3. Explain that to check the status, the user (or you, in a subsequent interaction) would use 'upguard_get_report_export_status' with the 'queued_report_id'.
4. Mention that when the status is "completed", a 'download_url' will be provided in the response from 'upguard_get_report_export_status'.`
            }}]
        })
    );

    // Review typosquatting for domain
    server.prompt(
        'upguard_review_typosquatting_for_domain',
        {
            domainName: z.string().describe('The domain to review for typosquatting activity.')
        },
        ({ domainName }) => ({
            messages: [{ role: 'user', content: { type: 'text', text: `
Review typosquatting information for the domain '${domainName}'.
1. First, call 'upguard_list_typosquat_domains' to check if '${domainName}' is among the enabled domains for typosquat monitoring.
2. If it is enabled, then use 'upguard_get_typosquat_details' with domain: '${domainName}'.
3. Summarize the findings: number of registered, unregistered, and ignored permutations. Highlight any registered permutations found on DNS blocklists if that information is available in the details.
4. If the domain is not enabled for typosquatting, state that.`
            }}]
        })
    );

    // Manage bulk hostnames simple
    server.prompt(
        'upguard_manage_bulk_hostnames_simple',
        {
            hostnamesToAdd: z.array(z.string()).min(1).max(5).describe('A small list of hostnames (FQDN or IPv4) to register.'),
            labelsForNewHostnames: z.array(z.string()).optional().describe('Labels to apply to the new hostnames.'),
            hostnameToRemove: z.string().describe("One of the hostnames from the 'hostnamesToAdd' list to subsequently deregister.")
        },
        ({ hostnamesToAdd, labelsForNewHostnames, hostnameToRemove }) => {
            if (!hostnamesToAdd.includes(hostnameToRemove)) {
                logger.warn('Prompt Warning: hostnameToRemove should be one of the hostnamesToAdd for logical consistency.');
            }
            return {
                messages: [{ role: 'user', content: { type: 'text', text: `
Perform a simple bulk hostname management task:
1. Register the following hostnames: ${JSON.stringify(hostnamesToAdd)}.
   ${labelsForNewHostnames && labelsForNewHostnames.length > 0 ? `Apply these labels: ${JSON.stringify(labelsForNewHostnames)}.` : 'Register them without specific labels.'}
   Use 'upguard_bulk_register_hostnames'. Report the number of newly registered hostnames and remaining slots.
2. Get current bulk hostname statistics using 'upguard_bulk_get_hostnames_stats' to see total registered, active, inactive, and remaining slots.
3. Deregister the hostname '${hostnameToRemove}' using 'upguard_bulk_deregister_hostnames'. Report the number of deregistered hostnames.
4. Call 'upguard_bulk_get_hostnames_stats' again to show the updated statistics.
Summarize the results of each step.`
                }}]
            };
        }
    );

    // ===== RISK MANAGEMENT PROMPTS =====

    // Account risk dashboard
    server.prompt(
        'upguard_account_risk_dashboard',
        {},
        () => ({
            messages: [{ role: 'user', content: { type: 'text', text: `
Create a comprehensive account-level risk dashboard.
1. Use 'upguard_get_organisation' to get basic organization information.
2. Use 'upguard_get_account_risks' with page_size 1000 to get all current account risks.
3. Use 'upguard_get_available_risks_v2' to get the full list of available risk types for context.
4. Analyze and present:
   - Total number of risks by severity (critical, high, medium, low, info)
   - Top 10 most frequent risk types
   - Risk distribution overview
   - Organization security posture summary
   - Key recommendations for immediate attention (focus on critical and high severity risks)
Present this as an executive-ready dashboard summary.` } }]
        })
    );

    // Risk trend analysis (original version)
    server.prompt(
        'upguard_risk_trend_analysis_original',
        {
            daysBack: z.number().int().min(1).max(365).default(30).describe('Number of days to analyze for risk trends (1-365 days).')
        },
        ({ daysBack }) => ({
            messages: [{ role: 'user', content: { type: 'text', text: `
Analyze risk trends over the past ${daysBack} days.
1. Calculate the start_date as ${daysBack} days ago from today in ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ).
2. Use 'upguard_get_account_risks_diff' with the calculated start_date and current date as end_date.
3. Use 'upguard_get_account_risks' to get current risk snapshot for comparison.
4. Analyze and present:
   - New risks introduced in the time period
   - Risks that were resolved/closed
   - Risk severity changes (risks that escalated or de-escalated)
   - Overall trend direction (improving, worsening, stable)
   - Most common new risk types appearing
   - Recommendations based on trends observed
Provide clear trend visualization in text format and actionable insights.` } }]
        })
    );

    // Risk severity analysis
    server.prompt(
        'upguard_risk_severity_analysis',
        {},
        () => ({
            messages: [{ role: 'user', content: { type: 'text', text: `
Perform detailed risk severity analysis across all account risks.
1. Use 'upguard_get_account_risks' with min_severity 'critical' to get critical risks.
2. Use 'upguard_get_account_risks' with min_severity 'high' to get high and critical risks.
3. Use 'upguard_get_account_risks' with min_severity 'medium' to get medium and above risks.
4. Use 'upguard_get_account_risks' with min_severity 'low' to get low and above risks.
5. Use 'upguard_get_account_risks' with min_severity 'info' to get all risks.
6. Calculate the count for each severity level by subtracting the counts.
7. For critical risks, use 'upguard_get_risk_details' on 3-5 critical risk IDs to provide detailed examples.
8. Present:
   - Risk count by severity with percentages
   - Critical risk examples with detailed explanations
   - Risk severity distribution analysis
   - Severity-based prioritization recommendations
   - Action plan for each severity level` } }]
        })
    );

    // Critical risk prioritization
    server.prompt(
        'upguard_critical_risk_prioritization',
        {},
        () => ({
            messages: [{ role: 'user', content: { type: 'text', text: `
Identify and prioritize critical risks requiring immediate attention.
1. Use 'upguard_get_account_risks' with min_severity 'critical' and page_size 100 to get critical risks.
2. If no critical risks, use min_severity 'high' to get high-severity risks.
3. For each risk in the first 10 results, use 'upguard_get_risk_details' to get comprehensive details.
4. Use 'upguard_get_available_risks_v2' to understand risk type context and severity implications.
5. Analyze and prioritize based on:
   - Risk severity level
   - Potential business impact
   - Ease of remediation
   - Risk type and exploitability
6. Present:
   - Top 10 priority risks with detailed descriptions
   - Risk prioritization matrix
   - Immediate action items for top 3 risks
   - Estimated remediation timeline
   - Business impact assessment for each priority risk` } }]
        })
    );

    // Risk type analysis
    server.prompt(
        'upguard_risk_type_analysis',
        {},
        () => ({
            messages: [{ role: 'user', content: { type: 'text', text: `
Analyze risks by type and category to identify security patterns.
1. Use 'upguard_get_available_risks_v2' to get the comprehensive list of all available risk types.
2. Use 'upguard_get_account_risks' with page_size 1000 to get all current account risks.
3. Group and analyze risks by:
   - Risk type/category
   - Risk families (e.g., encryption, authentication, network security)
   - Infrastructure vs application risks
   - External vs internal facing risks
4. For the top 5 most frequent risk types, use 'upguard_get_risk_details' to get detailed examples.
5. Present:
   - Risk type frequency distribution
   - Risk category analysis (group similar risk types)
   - Top risk families requiring attention
   - Risk pattern insights (e.g., consistent encryption issues)
   - Category-specific remediation strategies
   - Risk type trend implications` } }]
        })
    );

    // Monthly risk report
    server.prompt(
        'upguard_monthly_risk_report',
        {},
        () => ({
            messages: [{ role: 'user', content: { type: 'text', text: `
Generate a comprehensive monthly risk report.
1. Calculate start_date as 30 days ago from today in ISO 8601 format.
2. Use 'upguard_get_account_risks_diff' with the 30-day period to get risk changes.
3. Use 'upguard_get_account_risks' to get current risk snapshot.
4. Use 'upguard_get_organisation' for organization context.
5. Use 'upguard_get_available_risks_v2' for risk type context.
6. Include in the monthly report:
   - Executive summary of current risk posture
   - Month-over-month risk trend analysis
   - New risks discovered this month
   - Risks resolved this month
   - Risk severity distribution changes
   - Top risk categories requiring attention
   - Key achievements in risk reduction
   - Priority recommendations for next month
   - Risk metrics and KPIs
   - Month-over-month comparison charts (in text format)
Present as a formal monthly report suitable for management review.` } }]
        })
    );

    // Risk mitigation planning
    server.prompt(
        'upguard_risk_mitigation_planning',
        {
            riskSeverityFocus: z.enum(['critical', 'high', 'medium', 'low', 'info']).default('high').describe('Minimum risk severity level to focus mitigation planning on.')
        },
        ({ riskSeverityFocus }) => ({
            messages: [{ role: 'user', content: { type: 'text', text: `
Create detailed risk mitigation action plans for ${riskSeverityFocus} and above severity risks.
1. Use 'upguard_get_account_risks' with min_severity '${riskSeverityFocus}' to get target risks.
2. For each unique risk type in the results (limit to top 15), use 'upguard_get_risk_details' to get remediation details.
3. Use 'upguard_get_available_risks_v2' to understand risk type context and standard remediation approaches.
4. For each risk type, create a mitigation plan including:
   - Risk description and business impact
   - Detailed remediation steps
   - Required resources and timeline
   - Priority level within the ${riskSeverityFocus}+ category
   - Success metrics for remediation
   - Potential complications or dependencies
5. Present:
   - Prioritized list of mitigation plans
   - Timeline for implementation (30/60/90 day buckets)
   - Resource requirements summary
   - Quick wins vs long-term projects
   - Risk mitigation roadmap
   - Success measurement criteria` } }]
        })
    );

    // Executive risk summary
    server.prompt(
        'upguard_executive_risk_summary',
        {},
        () => ({
            messages: [{ role: 'user', content: { type: 'text', text: `
Create an executive-level risk summary for leadership presentation.
1. Use 'upguard_get_organisation' to get organization context.
2. Use 'upguard_get_account_risks' to get current risk overview.
3. Calculate 7-day and 30-day periods and use 'upguard_get_account_risks_diff' for both periods to show recent trends.
4. Use 'upguard_get_account_risks' with min_severity 'critical' to highlight critical issues.
5. Present executive summary including:
   - Overall security posture score/status
   - Critical issues requiring immediate C-level attention
   - 7-day risk trend (improving/worsening/stable)
   - 30-day risk trend for context
   - Top 3 business-critical risks and their potential impact
   - Key security investments/improvements needed
   - Competitive risk positioning context
   - 3-month risk outlook and strategic recommendations
   - Budget considerations for risk remediation
   - Board-level talking points
Format as a concise, business-focused executive briefing suitable for C-suite presentation.` } }]
        })
    );
}

module.exports = { registerPrompts };
