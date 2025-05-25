const { get } = require('./client');

/**
 * Get identity breach details
 * @param {object} params Query parameters
 * @returns {Promise<object>} Identity breach details
 */
async function getIdentityBreach(params) {
    return await get('/breach', params);
}

/**
 * Get breached identities
 * @param {object} params Query parameters
 * @returns {Promise<object>} List of breached identities
 */
async function getBreachedIdentities(params) {
    return await get('/breaches', params);
}

/**
 * Get data leaks disclosures
 * @param {object} params Query parameters
 * @returns {Promise<object>} Data leaks disclosures
 */
async function getDataLeaksDisclosures(params) {
    return await get('/data_leaks_disclosures', params);
}

/**
 * Update data leaks disclosure status
 * @param {object} params Query parameters including status
 * @returns {Promise<object>} Updated disclosure
 */
async function updateDataLeaksDisclosureStatus(params) {
    return await get('/data_leaks_disclosures/status', params);
}

module.exports = {
    getIdentityBreach,
    getBreachedIdentities,
    getDataLeaksDisclosures,
    updateDataLeaksDisclosureStatus
}; 
