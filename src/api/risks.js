const client = require('./client');

async function getAvailableRisks(params) {
    return await client.getAvailableRisks(params);
}

async function getRiskDetails(params) {
    return await client.getRiskDetails(params);
}

async function getAvailableRisksV2() {
    return await client.getAvailableRisksV2();
}

async function getAccountRisks(params) {
    return await client.getAccountRisks(params);
}

async function getAccountRisksDiff(params) {
    return await client.getAccountRisksDiff(params);
}

async function getVendorRisks(params) {
    return await client.getVendorRisks(params);
}

async function getVendorRisksDiff(params) {
    return await client.getVendorRisksDiff(params);
}

async function getVendorsRisksDiff(params) {
    return await client.getVendorsRisksDiff(params);
}

async function getVendorQuestionnaireRisks(params) {
    return await client.getVendorQuestionnaireRisks(params);
}

async function getVendorQuestionnaireRisksV2(params) {
    return await client.getVendorQuestionnaireRisksV2(params);
}

module.exports = {
    getAvailableRisks,
    getRiskDetails,
    getAvailableRisksV2,
    getAccountRisks,
    getAccountRisksDiff,
    getVendorRisks,
    getVendorRisksDiff,
    getVendorsRisksDiff,
    getVendorQuestionnaireRisks,
    getVendorQuestionnaireRisksV2
}; 
