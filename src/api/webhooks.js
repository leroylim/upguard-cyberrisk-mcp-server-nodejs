const { get, post, delete: del } = require('./client');

/**
 * List webhooks
 * @returns {Promise<object>} List of webhooks
 */
async function listWebhooks() {
    return get('/webhooks');
}

/**
 * Create webhook
 * @param {object} params Parameters including name, hook_url, notification_type_ids
 * @returns {Promise<object>} Created webhook
 */
async function createWebhook(params) {
    return post('/webhooks', params);
}

/**
 * Delete webhook
 * @param {object} params Parameters including webhook id
 * @returns {Promise<object>} Deletion response
 */
async function deleteWebhook(params) {
    return del('/webhooks', params);
}

/**
 * Get webhook notification types
 * @returns {Promise<object>} List of notification types
 */
async function getWebhookNotificationTypes() {
    return get('/webhooks/notification_types');
}

/**
 * Get webhook sample data
 * @param {object} params Parameters including webhook id or notification_type_ids
 * @returns {Promise<object>} Sample webhook data
 */
async function getWebhookSampleData(params) {
    return get('/webhooks/sample', params);
}

module.exports = {
    listWebhooks,
    createWebhook,
    deleteWebhook,
    getWebhookNotificationTypes,
    getWebhookSampleData
}; 
