const { get } = require('./client');

/**
 * List typosquat domains
 * @returns {Promise<object>} List of typosquat domains
 */
async function listTyposquatDomains() {
    return get('/typosquat');
}

/**
 * Get typosquat details
 * @param {object} params Query parameters
 * @returns {Promise<object>} Typosquat details
 */
async function getTyposquatDetails(params) {
    return get('/typosquat/details', params);
}

module.exports = {
    listTyposquatDomains,
    getTyposquatDetails
}; 
