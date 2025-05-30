# Enhanced Prompts for UpGuard CyberRisk MCP Server

The UpGuard MCP server includes **25 comprehensive prompts** that provide guided workflows for complex security operations. These prompts help users navigate the 67+ UpGuard API tools more effectively.

## 📋 **Prompt Overview**

- **8 Enhanced Prompts** (NEW in v1.3.0) - Advanced workflow prompts for complex operations
- **17 Existing Prompts** - Organizational, vendor management, and specialized risk prompts
- **Total: 25 Prompts** across all security management workflows

## 🔴 Risk Management Prompts

### 1. `upguard_comprehensive_risk_assessment`
**Purpose**: Perform a complete risk assessment for your organization or specific vendors.

**Parameters**:
- `target`: `'organization' | 'vendor'` - Assessment scope
- `targetHostname`: `string` (optional) - Vendor hostname (required if target is vendor)
- `severityThreshold`: `'info' | 'low' | 'medium' | 'high' | 'critical'` (default: 'medium')
- `timeFrameDays`: `number` (1-365, default: 30) - Historical analysis timeframe
- `includeHistoricalAnalysis`: `boolean` (default: true) - Include trend analysis
- `generateReport`: `boolean` (default: false) - Generate downloadable report

**Use Cases**:
- Monthly security assessments
- Vendor due diligence
- Incident response investigations
- Compliance audits

### 2. `upguard_risk_trend_analysis`
**Purpose**: Analyze risk trends across multiple time periods to identify patterns.

**Parameters**:
- `timeRanges`: Array of time periods with `start_date`, `end_date`, and `label`
- `vendorHostnames`: `string[]` (optional) - Specific vendors to analyze
- `focusArea`: `'all' | 'critical_only' | 'new_risks' | 'resolved_risks'` (default: 'all')

**Use Cases**:
- Quarterly risk reviews
- Board reporting preparation
- Risk management strategy evaluation
- Security program effectiveness measurement

## 📊 Report Generation Prompts

### 3. `upguard_compliance_reporting_suite`
**Purpose**: Generate comprehensive compliance reports for different stakeholders.

**Parameters**:
- `reportingPeriod`: `'monthly' | 'quarterly' | 'annual'` - Reporting scope
- `complianceFramework`: `'SOC2' | 'ISO27001' | 'NIST' | 'PCI_DSS' | 'GDPR' | 'custom'` (optional)
- `recipientGroups`: Object with email arrays for `board`, `executives`, `security_team`, `compliance_team`
- `includeVendorRiskProfile`: `boolean` (default: true)
- `includeBreachAnalysis`: `boolean` (default: true)

**Use Cases**:
- Automated compliance reporting
- Board meeting preparation
- Audit documentation
- Regulatory submissions

## 🌐 Domain Management Prompts

### 4. `upguard_domain_lifecycle_management`
**Purpose**: Manage complete domain lifecycle from onboarding to offboarding.

**Parameters**:
- `operation`: `'onboard_new_domains' | 'offboard_domains' | 'reorganize_domains' | 'audit_domains'`
- `domainList`: `string[]` (optional) - Domains for operation
- `organizationalStructure`: Object with `business_unit`, `environment`, `criticality`
- `autoLabeling`: `boolean` (default: true) - Auto-apply organizational labels

**Use Cases**:
- New acquisition integrations
- Infrastructure reorganization
- Security compliance audits
- Asset inventory management

## ⚡ Bulk Operations Prompts

### 5. `upguard_bulk_asset_management`
**Purpose**: Large-scale asset management operations.

**Parameters**:
- `operationType`: `'mass_onboarding' | 'health_check' | 'label_reorganization' | 'capacity_planning'`
- `assetCount`: `number` (optional) - Expected number of assets
- `batchSize`: `number` (1-100, default: 50) - Assets per batch
- `monitoringTier`: `'1' | '2' | '3'` (optional) - Priority tier
- `labelStrategy`: Object with `department`, `environment`, `criticality` arrays

**Use Cases**:
- Large infrastructure migrations
- Organizational restructuring
- Asset inventory cleanup
- Capacity planning exercises

## 🌍 Network Security Prompts

### 6. `upguard_network_security_assessment`
**Purpose**: Comprehensive network security assessment across IP ranges.

**Parameters**:
- `assessmentScope`: `'full_network' | 'specific_ranges' | 'new_ips'`
- `ipRanges`: `string[]` (optional) - Specific ranges to assess
- `securityFocus`: `'vulnerability_scan' | 'configuration_review' | 'compliance_check' | 'all'` (default: 'all')
- `reportDeepDive`: `boolean` (default: false) - Detailed technical analysis

**Use Cases**:
- Network security audits
- Penetration testing preparation
- Infrastructure hardening
- Compliance assessments

## 🪝 Webhook Management Prompts

### 7. `upguard_setup_comprehensive_alerting`
**Purpose**: Set up complete alerting infrastructure with webhooks.

**Parameters**:
- `alertingTier`: `'basic' | 'advanced' | 'enterprise'` - Configuration complexity
- `notificationChannels`: Object with webhook URLs for different teams
- `alertPriorities`: Object with boolean flags for different alert types

**Use Cases**:
- Security operations center setup
- Incident response automation
- Executive alerting configuration
- Compliance monitoring

## 🏢 Organizational Prompts

### 8. `upguard_security_dashboard_setup`
**Purpose**: Configure role-based security dashboards for different audiences.

**Parameters**:
- `dashboardType`: `'executive' | 'operational' | 'compliance' | 'technical'`
- `refreshInterval`: `'real-time' | 'hourly' | 'daily' | 'weekly'` (default: 'daily')
- `includeSubsidiaries`: `boolean` (default: false)
- `customLabelsFilter`: `string[]` (optional) - Filter by specific labels

**Use Cases**:
- Executive reporting setup
- Security team operations
- Compliance monitoring
- Technical deep-dive analysis

## Getting Started

### Example Usage
```bash
# Using with Claude or other AI assistants
"Please perform a comprehensive risk assessment for my organization with high severity threshold using the upguard_comprehensive_risk_assessment prompt"

# Parameters example
{
  "target": "organization",
  "severityThreshold": "high",
  "timeFrameDays": 90,
  "includeHistoricalAnalysis": true,
  "generateReport": true
}
```

### Best Practices

1. **Start with Assessment**: Use risk assessment prompts before making changes
2. **Use Appropriate Scope**: Choose between organization-wide or specific vendor analysis
3. **Leverage Historical Data**: Include time-based analysis for trend identification
4. **Automate Reporting**: Set up regular compliance reporting workflows
5. **Monitor Continuously**: Use dashboard setup for ongoing visibility

### Integration Tips

- **Combine Prompts**: Use multiple prompts in sequence for comprehensive workflows
- **Customize Parameters**: Adjust parameters based on your organization's needs
- **Save Configurations**: Document successful parameter combinations for reuse
- **Monitor Performance**: Track prompt execution times and optimize as needed

## Support

For questions about these enhanced prompts:
1. Check the tool documentation in `docs/generated/`
2. Review the API client methods in `upguardApiClient.js`
3. Examine the tool implementations in `src/tools/`

---

**Version**: 1.3.0  
**Enhanced Prompts Added**: 2024-12-20  
**Total Prompts**: 14 (6 original + 8 enhanced) 