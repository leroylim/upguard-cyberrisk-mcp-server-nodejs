const { get, post, put, delete: del } = require('./client');

/**
 * List bulk hostnames
 * @param {object} params Query parameters
 * @returns {Promise<object>} List of hostnames
 */
async function listHostnames(params) {
    return get('/bulk/hostnames', params);
}

/**
 * Register bulk hostnames
 * @param {object} body Request body with hostnames array
 * @returns {Promise<object>} Registration response
 */
async function registerHostnames(body) {
    return post('/bulk/hostnames', body);
}

/**
 * Deregister bulk hostnames
 * @param {object} body Request body with hostnames array
 * @returns {Promise<object>} Deregistration response
 */
async function deregisterHostnames(body) {
    return del('/bulk/hostnames', {}, body);
}

/**
 * Get hostname details from bulk operations
 * @param {string} hostname The hostname
 * @param {object} params Query parameters
 * @returns {Promise<object>} Hostname details
 */
async function getHostnameDetails(hostname, params) {
    return get(`/bulk/hostnames/${hostname}`, params);
}

/**
 * Update hostname labels in bulk operations
 * @param {string} hostname The hostname
 * @param {object} body Request body with labels
 * @returns {Promise<object>} Updated hostname
 */
async function putHostnameLabels(hostname, body) {
    return put(`/bulk/hostnames/${hostname}/labels`, body);
}

/**
 * Get statistics around registered bulk hostnames
 * @returns {Promise<object>} Hostname statistics
 */
async function getHostnamesStats() {
    return get('/bulk/hostnames/stats');
}

module.exports = {
    listHostnames,
    registerHostnames,
    deregisterHostnames,
    getHostnameDetails,
    putHostnameLabels,
    getHostnamesStats
}; 
