const { logger } = require('../utils/logger');
const riskTools = require('./risks');
const vendorTools = require('./vendors');
const breachTools = require('./breaches');
const bulkTools = require('./bulk');
const domainTools = require('./domains');
const ipTools = require('./ips');
const reportTools = require('./reports');
const webhookTools = require('./webhooks');
const organizationTools = require('./organization');
const subsidiaryTools = require('./subsidiaries');
const typosquatTools = require('./typosquat');
const questionnaireTools = require('./questionnaires');
const vulnerabilityTools = require('./vulnerabilities');
const labelTools = require('./labels');
const notificationTools = require('./notifications');
// Import other tool categories as they are created

function registerAllTools(server) {
    const toolCategories = [
        { name: 'risks', module: riskTools },
        { name: 'vendors', module: vendorTools },
        { name: 'breaches', module: breachTools },
        { name: 'bulk', module: bulkTools },
        { name: 'domains', module: domainTools },
        { name: 'ips', module: ipTools },
        { name: 'reports', module: reportTools },
        { name: 'webhooks', module: webhookTools },
        { name: 'organization', module: organizationTools },
        { name: 'subsidiaries', module: subsidiaryTools },
        { name: 'typosquat', module: typosquatTools },
        { name: 'questionnaires', module: questionnaireTools },
        { name: 'vulnerabilities', module: vulnerabilityTools },
        { name: 'labels', module: labelTools },
        { name: 'notifications', module: notificationTools }
    ];
    
    for (const { name, module } of toolCategories) {
        try {
            if (module && typeof module.registerTools === 'function') {
                module.registerTools(server);
                logger.info(`Registered tools from ${name}`);
            } else {
                logger.warn(`No registerTools function found in ${name}`);
            }
        } catch (error) {
            logger.error(`Failed to register ${name} tools:`, error.message);
            if (error.message.includes('keyValidator._parse is not a function')) {
                logger.error(`This appears to be a Zod schema validation issue. Check that all schemas in ${name} are properly defined.`);
            }
            throw new Error(`Tool registration failed for ${name}: ${error.message}`);
        }
    }
}

module.exports = { registerAllTools }; 


