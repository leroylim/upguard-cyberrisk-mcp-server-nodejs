const { get, post } = require('./client');

/**
 * Send vendor questionnaire
 * @param {object} body Request body
 * @returns {Promise<object>} Response data
 */
async function sendVendorQuestionnaire(body) {
    return post('/vendor/questionnaire', body);
}

/**
 * Get vendor questionnaire attachment
 * @param {object} params Query parameters
 * @returns {Promise<object>} Questionnaire attachment
 */
async function getVendorQuestionnaireAttachment(params) {
    return get('/vendor/questionnaire/attachment', params, { responseType: 'arraybuffer' });
}

/**
 * List vendor questionnaire attachments
 * @param {object} params Query parameters
 * @returns {Promise<object>} List of questionnaire attachments
 */
async function getVendorQuestionnaireAttachments(params) {
    return get('/vendor/questionnaire/attachment/list', params);
}

/**
 * Get questionnaire types
 * @returns {Promise<object>} List of questionnaire types
 */
async function getQuestionnaireTypes() {
    return get('/vendor/questionnaire_types');
}

/**
 * List vendor questionnaires (Deprecated)
 * @param {object} params Query parameters
 * @returns {Promise<object>} List of questionnaires
 */
async function getVendorQuestionnaires(params) {
    return get('/vendor/questionnaires', params);
}

/**
 * List vendor questionnaires V2
 * @param {object} params Query parameters
 * @returns {Promise<object>} List of questionnaires
 */
async function getVendorQuestionnairesV2(params) {
    return get('/vendor/questionnaires/v2', params);
}

/**
 * Send relationship questionnaire
 * @param {object} body Request body
 * @returns {Promise<object>} Response data
 */
async function sendRelationshipQuestionnaire(body) {
    return post('/vendor/relationship_questionnaire', body);
}

// Custom implementations for backward compatibility
/**
 * Get questionnaires
 * @param {object} params Query parameters
 * @returns {Promise<object>} List of questionnaires
 */
async function getQuestionnaires(params) {
    // This is a custom implementation - may need to be mapped to actual API
    return get('/questionnaires', params);
}

/**
 * Get questionnaire details
 * @param {object} params Query parameters
 * @returns {Promise<object>} Questionnaire details
 */
async function getQuestionnaireDetails(params) {
    // This is a custom implementation - may need to be mapped to actual API
    return get(`/questionnaires/${params.questionnaire_id}`, params);
}

/**
 * Submit questionnaire response
 * @param {object} params Request parameters
 * @returns {Promise<object>} Response data
 */
async function submitQuestionnaireResponse(params) {
    // This is a custom implementation - may need to be mapped to actual API
    return post(`/questionnaires/${params.questionnaire_id}/responses`, params);
}

/**
 * Create questionnaire
 * @param {object} params Request parameters
 * @returns {Promise<object>} Response data
 */
async function createQuestionnaire(params) {
    // This is a custom implementation - may need to be mapped to actual API
    return post('/questionnaires', params);
}

module.exports = {
    sendVendorQuestionnaire,
    getVendorQuestionnaireAttachment,
    getVendorQuestionnaireAttachments,
    getQuestionnaireTypes,
    getVendorQuestionnaires,
    getVendorQuestionnairesV2,
    sendRelationshipQuestionnaire,
    // Custom implementations
    getQuestionnaires,
    getQuestionnaireDetails,
    submitQuestionnaireResponse,
    createQuestionnaire
}; 
