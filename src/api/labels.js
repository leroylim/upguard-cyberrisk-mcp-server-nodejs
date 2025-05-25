const { get } = require('./client');

/**
 * Get all labels
 * @returns {Promise<object>} List of labels
 */
async function getLabels() {
    return get('/labels');
}

module.exports = {
    getLabels
}; 
