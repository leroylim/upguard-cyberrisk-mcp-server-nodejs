const { get } = require('./client');

/**
 * Get vendor vulnerabilities
 * @param {object} params Query parameters
 * @returns {Promise<object>} Vendor vulnerabilities
 */
async function getVendorVulnerabilities(params) {
    return get('/vendors/vulnerabilities', params);
}

module.exports = {
    getVendorVulnerabilities
}; 
