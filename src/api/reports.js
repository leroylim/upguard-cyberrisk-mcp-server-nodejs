const { get, post } = require('./client');

/**
 * List custom report templates
 * @returns {Promise<object>} List of custom report templates
 */
async function listCustomReportTemplates() {
    return get('/reports/custom');
}

/**
 * Queue report export
 * @param {object} params Parameters for report export
 * @returns {Promise<object>} Report export response
 */
async function queueReportExport(params) {
    return post('/reports/queue', params);
}

/**
 * Get report export status
 * @param {object} params Query parameters
 * @returns {Promise<object>} Report export status
 */
async function getReportExportStatus(params) {
    return get('/reports/status', params);
}

/**
 * Request report from queue
 * @param {object} params Parameters including report_type
 * @returns {Promise<object>} Report request response
 */
async function requestReport(params) {
    return get('/reports/queue', params);
}

module.exports = {
    listCustomReportTemplates,
    queueReportExport,
    getReportExportStatus,
    requestReport
}; 
