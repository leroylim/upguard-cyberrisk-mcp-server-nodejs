# API Documentation

This document provides a detailed documentation of the APIs exposed by the UpGuard CyberRisk MCP Server.

## 1. Introduction

The UpGuard CyberRisk MCP Server exposes the functionality of the UpGuard API through a standardized MCP interface. The server supports a wide range of tools for managing risks, vendors, domains, and other security-related assets.

## 2. API Reference

The following is a list of the available tools, grouped by category:

### 2.1. Risks

*   **upguard_get_available_risks:** Get a list of available risk types that can be detected by UpGuard.
*   **upguard_get_available_risks_v2:** Returns a list of available risks in the UpGuard platform with detailed info.
*   **upguard_get_risk_details:** Get detailed information about a specific risk.
*   **upguard_get_account_risks:** Get a comprehensive list of active security risks detected for your account with advanced filtering and pagination.
*   **upguard_get_vendor_risks:** Get detailed security risks for a specific vendor to assess their cybersecurity posture and compliance status.
*   **upguard_get_account_risks_diff:** Get differences in account risks over time.
*   **upguard_get_vendor_risks_diff:** Get risk changes for a specific vendor over a time period with detailed change tracking.
*   **upguard_get_vendors_risks_diff:** Get risk changes for multiple vendors over a time period with detailed change tracking.
*   **upguard_get_vendor_questionnaire_risks:** Get security risks identified through vendor questionnaire responses and assessments.
*   **upguard_get_vendor_questionnaire_risks_v2:** Get enhanced security risks from vendor questionnaire responses using the latest assessment methodology (v2).

### 2.2. Vendors

*   **upguard_list_monitored_vendors:** Get a list of all monitored vendors.
*   **upguard_start_monitoring_vendor:** Start monitoring a new vendor.
*   **upguard_stop_monitoring_vendor:** Stop monitoring a vendor.
*   **upguard_get_vendor_details:** Get detailed information about a specific vendor.
*   **upguard_update_vendor_details:** Update the details of a specific vendor.
*   **upguard_resolve_vendor_by_hostname:** Resolve a vendor by their hostname.

### 2.3. Domains

*   **upguard_get_domains:** Get a list of all monitored domains.
*   **upguard_add_custom_domains:** Add new domains to monitor.
*   **upguard_remove_custom_domains:** Remove domains from monitoring.
*   **upguard_get_domain_details:** Get detailed information about a specific domain.
*   **upguard_update_domain_labels:** Update the labels of a specific domain.

### 2.4. IPs

*   **upguard_get_ips:** Get a list of all monitored IP addresses.
*   **upguard_add_custom_ips:** Add new IP addresses to monitor.
*   **upguard_remove_custom_ips:** Remove IP addresses from monitoring.
*   **upguard_get_ip_details:** Get detailed information about a specific IP address.
*   **upguard_update_ip_labels:** Update the labels of a specific IP address.

### 2.5. Breaches

*   **upguard_get_breached_identities:** Get a list of breached identities for a specific domain.
*   **upguard_get_identity_breach:** Get detailed information about a specific identity breach.

### 2.6. Reports

*   **upguard_queue_report_export:** Queue a new report for export.
*   **upguard_get_report_export_status:** Get the status of a report export.
*   **upguard_get_report_status:** Get the status of a report.

### 2.7. Webhooks

*   **upguard_list_webhooks:** Get a list of all webhooks.
*   **upguard_create_webhook:** Create a new webhook.
*   **upguard_delete_webhook:** Delete a webhook.
*   **upguard_get_webhook_notification_types:** Get a list of all webhook notification types.
*   **upguard_get_webhook_sample_data:** Get sample data for a webhook.

### 2.8. Organization

*   **upguard_get_organisation:** Get detailed information about your organization.

### 2.9. Subsidiaries

*   **upguard_get_subsidiaries:** Get a list of all subsidiaries.

### 2.10. Typosquat

*   **upguard_list_typosquat_domains:** Get a list of all domains enabled for typosquat monitoring.
*   **upguard_get_typosquat_details:** Get detailed information about typosquatting for a specific domain.

### 2.11. Questionnaires

*   **upguard_get_questionnaire_types:** Get a list of all questionnaire types.
*   **upguard_send_vendor_questionnaire:** Send a questionnaire to a vendor.
*   **upguard_list_vendor_questionnaires_v2:** Get a list of all questionnaires for a specific vendor.

### 2.12. Vulnerabilities

*   **upguard_get_vulnerabilities:** Get a list of all vulnerabilities.

### 2.13. Labels

*   **upguard_get_labels:** Get a list of all labels.

### 2.14. Notifications

*   **upguard_get_notifications:** Get a list of all notifications.

## 3. Error Codes

The following is a list of the possible error codes that can be returned by the API:

*   **400 Bad Request:** The request was malformed or invalid.
*   **401 Unauthorized:** The request was not authenticated.
*   **403 Forbidden:** The request was authenticated but not authorized to perform the requested action.
*   **404 Not Found:** The requested resource was not found.
*   **429 Too Many Requests:** The request was rate-limited.
*   **500 Internal Server Error:** An unexpected error occurred on the server.
*   **502 Bad Gateway:** The server received an invalid response from an upstream server.
*   **503 Service Unavailable:** The server is temporarily unavailable.
*   **504 Gateway Timeout:** The server did not receive a timely response from an upstream server.
