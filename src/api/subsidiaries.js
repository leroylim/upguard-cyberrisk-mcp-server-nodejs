const { get, put } = require('./client');

/**
 * Get list of subsidiaries
 * @returns {Promise<object>} List of subsidiaries
 */
async function getSubsidiaries() {
    return get('/subsidiaries');
}

/**
 * Get subsidiary domain details
 * @param {object} params Query parameters including subsidiary_primary_hostname and hostname
 * @returns {Promise<object>} Subsidiary domain details
 */
async function getSubsidiaryDomainDetails(params) {
    return get('/subsidiary/domain', params);
}

/**
 * Update subsidiary domain labels
 * @param {object} params Parameters including subsidiary_primary_hostname, hostname, and labels
 * @returns {Promise<object>} Updated subsidiary domain
 */
async function updateSubsidiaryDomainLabels(params) {
    return put('/subsidiary/domain/labels', params);
}

/**
 * Get subsidiary domains
 * @param {object} params Query parameters including subsidiary_primary_hostname
 * @returns {Promise<object>} List of subsidiary domains
 */
async function getSubsidiaryDomains(params) {
    return get('/subsidiary/domains', params);
}

/**
 * Get subsidiary IP details
 * @param {object} params Query parameters including subsidiary_primary_hostname and ip
 * @returns {Promise<object>} Subsidiary IP details
 */
async function getSubsidiaryIpDetails(params) {
    return get('/subsidiary/ip', params);
}

/**
 * Update subsidiary IP labels
 * @param {object} params Parameters including subsidiary_primary_hostname, ip, and labels
 * @returns {Promise<object>} Updated subsidiary IP
 */
async function updateSubsidiaryIpLabels(params) {
    return put('/subsidiary/ip/labels', params);
}

/**
 * Get subsidiary IPs
 * @param {object} params Query parameters including subsidiary_primary_hostname
 * @returns {Promise<object>} List of subsidiary IPs
 */
async function getSubsidiaryIps(params) {
    return get('/subsidiary/ips', params);
}

/**
 * Get subsidiary ranges
 * @param {object} params Query parameters including subsidiary_primary_hostname
 * @returns {Promise<object>} List of subsidiary ranges
 */
async function getSubsidiaryRanges(params) {
    return get('/subsidiary/ranges', params);
}

module.exports = {
    getSubsidiaries,
    getSubsidiaryDomainDetails,
    updateSubsidiaryDomainLabels,
    getSubsidiaryDomains,
    getSubsidiaryIpDetails,
    updateSubsidiaryIpLabels,
    getSubsidiaryIps,
    getSubsidiaryRanges
}; 
