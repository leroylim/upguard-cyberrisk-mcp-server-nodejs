const { get } = require('./client');

/**
 * Get organisation details
 * @returns {Promise<object>} Organisation details
 */
async function getOrganisation() {
    return get('/organisation');
}

/**
 * Get organization vulnerabilities
 * @param {object} params Query parameters
 * @returns {Promise<object>} Organization vulnerabilities
 */
async function getOrgVulnerabilities(params) {
    return get('/vulnerabilities', params);
}

module.exports = {
    getOrganisation,
    getOrgVulnerabilities
}; 
