const { get, put, del } = require('./client');

/**
 * Get IP details
 * @param {object} params Query parameters including ip
 * @returns {Promise<object>} IP details
 */
async function getIpDetails(params) {
    return get('/ip', params);
}

/**
 * Update IP labels
 * @param {object} params Parameters including ip and labels
 * @returns {Promise<object>} Updated IP
 */
async function updateIpLabels(params) {
    return put('/ip/labels', params);
}

/**
 * Get IPs
 * @param {object} params Query parameters including labels filter
 * @returns {Promise<object>} List of IPs
 */
async function getIps(params) {
    return get('/ips', params);
}

/**
 * Add custom IPs
 * @param {object} params Parameters including ips and labels arrays
 * @returns {Promise<object>} Added IPs
 */
async function addCustomIps(params) {
    return put('/ips', params);
}

/**
 * Remove custom IPs
 * @param {object} params Parameters including ips and/or labels arrays
 * @returns {Promise<object>} Removal response
 */
async function removeCustomIps(params) {
    return del('/ips', params);
}

/**
 * Get ranges
 * @param {object} params Query parameters including labels filter
 * @returns {Promise<object>} List of ranges
 */
async function getRanges(params) {
    return get('/ranges', params);
}

module.exports = {
    getIpDetails,
    updateIpLabels,
    getIps,
    addCustomIps,
    removeCustomIps,
    getRanges
}; 
