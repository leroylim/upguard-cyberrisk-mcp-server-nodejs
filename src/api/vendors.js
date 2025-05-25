const { get, post, put } = require('./client');

/**
 * Get vendor details
 * @param {object} params Query parameters including id or hostname
 * @returns {Promise<object>} Vendor details
 */
async function getVendorDetails(params) {
    return get('/vendor', params);
}

/**
 * Get vendor additional evidence
 * @param {object} params Query parameters
 * @returns {Promise<object>} Vendor additional evidence
 */
async function getVendorAdditionalEvidence(params) {
    return get('/vendor/additional_evidence', params);
}

/**
 * List vendor additional evidence
 * @param {object} params Query parameters
 * @returns {Promise<object>} List of vendor additional evidence
 */
async function listVendorAdditionalEvidence(params) {
    return get('/vendor/additional_evidences', params);
}

/**
 * Update vendor attributes
 * @param {object} body Request body with vendor attributes
 * @returns {Promise<object>} Updated vendor
 */
async function updateVendorAttributes(body) {
    return put('/vendor/attributes', body);
}

/**
 * Get vendor document
 * @param {object} params Query parameters
 * @returns {Promise<object>} Vendor document
 */
async function getVendorDocument(params) {
    return get('/vendor/document', params);
}

/**
 * List vendor documents
 * @param {object} params Query parameters
 * @returns {Promise<object>} List of vendor documents
 */
async function listVendorDocuments(params) {
    return get('/vendor/documents', params);
}

/**
 * Update vendor labels
 * @param {object} params Parameters including vendor_primary_hostname and labels
 * @returns {Promise<object>} Updated vendor
 */
async function updateVendorLabels(params) {
    return put('/vendor/labels', params);
}

/**
 * Start monitoring vendor
 * @param {object} params Parameters including hostname (not primary_hostname per API spec)
 * @returns {Promise<object>} Monitor response
 */
async function startMonitoringVendor(params) {
    return post('/vendor/monitor', params);
}

/**
 * Stop monitoring vendor
 * @param {object} params Parameters including hostname (not primary_hostname per API spec)
 * @returns {Promise<object>} Unmonitor response
 */
async function stopMonitoringVendor(params) {
    return post('/vendor/unmonitor', params);
}

/**
 * List monitored vendors
 * @param {object} params Query parameters including labels filter
 * @returns {Promise<object>} List of monitored vendors
 */
async function listMonitoredVendors(params) {
    return get('/vendors', params);
}

/**
 * Update vendor tier
 * @param {object} params Parameters including vendor_primary_hostname and tier
 * @returns {Promise<object>} Updated vendor
 */
async function updateVendorTier(params) {
    return put('/vendor/tier', params);
}

/**
 * Get vendor ranges
 * @param {object} params Query parameters including vendor_primary_hostname
 * @returns {Promise<object>} List of vendor ranges
 */
async function getVendorRanges(params) {
    return get('/vendor/ranges', params);
}

/**
 * Get vendor domain details
 * @param {object} params Query parameters including vendor_primary_hostname and hostname
 * @returns {Promise<object>} Vendor domain details
 */
async function getVendorDomainDetails(params) {
    return get('/vendor/domain', params);
}

/**
 * Update vendor domain labels
 * @param {object} params Parameters including vendor_primary_hostname, hostname, and labels
 * @returns {Promise<object>} Updated vendor domain
 */
async function updateVendorDomainLabels(params) {
    return put('/vendor/domain/labels', params);
}

/**
 * Get vendor domains
 * @param {object} params Query parameters including vendor_primary_hostname
 * @returns {Promise<object>} List of vendor domains
 */
async function getVendorDomains(params) {
    return get('/vendor/domains', params);
}

/**
 * Get vendor IP details
 * @param {object} params Query parameters including vendor_primary_hostname and ip
 * @returns {Promise<object>} Vendor IP details
 */
async function getVendorIpDetails(params) {
    return get('/vendor/ip', params);
}

/**
 * Update vendor IP labels
 * @param {object} params Parameters including vendor_primary_hostname, ip, and labels
 * @returns {Promise<object>} Updated vendor IP
 */
async function updateVendorIpLabels(params) {
    return put('/vendor/ip/labels', params);
}

/**
 * Get vendor IPs
 * @param {object} params Query parameters including vendor_primary_hostname
 * @returns {Promise<object>} List of vendor IPs
 */
async function getVendorIps(params) {
    return get('/vendor/ips', params);
}

/**
 * Get vendor vulnerabilities
 * @param {object} params Query parameters including primary_hostname (per API spec)
 * @returns {Promise<object>} List of vendor vulnerabilities
 */
async function getVendorVulnerabilities(params) {
    return get('/vulnerabilities/vendor', params);
}

module.exports = {
    getVendorDetails,
    getVendorAdditionalEvidence,
    listVendorAdditionalEvidence,
    updateVendorAttributes,
    getVendorDocument,
    listVendorDocuments,
    updateVendorLabels,
    startMonitoringVendor,
    stopMonitoringVendor,
    listMonitoredVendors,
    updateVendorTier,
    getVendorRanges,
    getVendorDomainDetails,
    updateVendorDomainLabels,
    getVendorDomains,
    getVendorIpDetails,
    updateVendorIpLabels,
    getVendorIps,
    getVendorVulnerabilities
}; 
