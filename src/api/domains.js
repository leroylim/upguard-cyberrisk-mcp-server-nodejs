const { get, put, del } = require('./client');

/**
 * Get domain details
 * @param {object} params Query parameters including hostname
 * @returns {Promise<object>} Domain details
 */
async function getDomainDetails(params) {
    return await get('/domain', params);
}

/**
 * Update domain labels
 * @param {object} params Parameters including hostname and labels
 * @returns {Promise<object>} Updated domain
 */
async function updateDomainLabels(params) {
    return await put('/domain/labels', params);
}

/**
 * Get domains
 * @param {object} params Query parameters including labels filter
 * @returns {Promise<object>} List of domains
 */
async function getDomains(params) {
    return await get('/domains', params);
}

/**
 * Add custom domains
 * @param {object} params Parameters including hostnames and labels arrays
 * @returns {Promise<object>} Added domains
 */
async function addCustomDomains(params) {
    return await put('/domains', params);
}

/**
 * Remove custom domains
 * @param {object} params Parameters including hostnames and/or labels arrays
 * @returns {Promise<object>} Removal response
 */
async function removeCustomDomains(params) {
    return await del('/domains', params);
}

module.exports = {
    getDomainDetails,
    updateDomainLabels,
    getDomains,
    addCustomDomains,
    removeCustomDomains
}; 
