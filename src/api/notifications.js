const { get } = require('./client');

/**
 * Get notifications
 * @returns {Promise<object>} List of notifications
 */
async function getNotifications() {
    return get('/notifications');
}

module.exports = {
    getNotifications
}; 
