# Enhanced Prompts for UpGuard CyberRisk MCP Server

The UpGuard MCP server includes **25 comprehensive prompts** that provide guided workflows for complex security operations. These prompts help users navigate the 67+ UpGuard API tools more effectively.

## 📋 **Prompt Overview**

- **8 Enhanced Prompts** (NEW in v1.3.0) - Advanced workflow prompts for complex operations
- **17 Existing Prompts** - Organizational, vendor management, and specialized risk prompts
- **Total: 25 Prompts** across all security management workflows

---

## **Enhanced Prompts (v1.3.0)**

### 1. `upguard_comprehensive_risk_assessment`
**Purpose**: Perform a complete risk assessment for your organization or specific vendors.

### 2. `upguard_risk_trend_analysis`
**Purpose**: Analyze risk trends across multiple time periods to identify patterns.

### 3. `upguard_compliance_reporting_suite`
**Purpose**: Generate comprehensive compliance reports for different stakeholders.

### 4. `upguard_domain_lifecycle_management`
**Purpose**: Manage complete domain lifecycle from onboarding to offboarding.

### 5. `upguard_bulk_asset_management`
**Purpose**: Large-scale asset management operations.

### 6. `upguard_network_security_assessment`
**Purpose**: Comprehensive network security assessment across IP ranges.

### 7. `upguard_setup_comprehensive_alerting`
**Purpose**: Set up complete alerting infrastructure with webhooks.

### 8. `upguard_security_dashboard_setup`
**Purpose**: Configure role-based security dashboards for different audiences.

---

## **Existing Prompts**

### **General Prompts**
- `upguard_get_my_organization_risks`: Get a list of all risks for your organization.
- `upguard_monitor_new_vendor`: Start monitoring a new vendor.
- `upguard_assess_vendor_risks`: Perform a risk assessment for a specific vendor.
- `upguard_manage_domains`: Add, remove, or update domains.
- `upguard_investigate_breaches`: Investigate breaches for a specific domain.
- `upguard_generate_report`: Generate a report.

### **Organizational Prompts**
- `upguard_get_my_organization_details`: Retrieve your organization's details.

### **Domain Prompts**
- `upguard_check_domain_risks`: Check the risks for a specific domain.

### **Vendor Prompts**
- `upguard_list_vendors_with_critical_risks`: List all vendors with critical risks.
- `upguard_full_vendor_risk_profile`: Get a full risk profile for a vendor.
- `upguard_monitor_new_vendor_and_send_questionnaire`: Monitor a new vendor and send them a questionnaire.

### **Identity Prompts**
- `upguard_investigate_identity_breach_for_domain`: Investigate identity breaches for a domain.

### **Report Prompts**
- `upguard_generate_vendor_report_and_track`: Generate a vendor report and track its status.

### **Typosquatting Prompts**
- `upguard_review_typosquatting_for_domain`: Review typosquatting information for a domain.

### **Bulk Hostname Prompts**
- `upguard_manage_bulk_hostnames_simple`: A simple workflow to add and remove hostnames in bulk.

### **Risk Management Prompts**
- `upguard_account_risk_dashboard`: Create a risk dashboard for your account.
- `upguard_risk_trend_analysis_original`: Analyze risk trends over a given period.
- `upguard_risk_severity_analysis`: Analyze risks by severity.
- `upguard_critical_risk_prioritization`: Prioritize critical risks.
- `upguard_risk_type_analysis`: Analyze risks by type.
- `upguard_monthly_risk_report`: Generate a monthly risk report.
- `upguard_risk_mitigation_planning`: Create a risk mitigation plan.
- `upguard_executive_risk_summary`: Create an executive-level risk summary.

---

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
**Total Prompts**: 25 (8 enhanced + 17 existing)