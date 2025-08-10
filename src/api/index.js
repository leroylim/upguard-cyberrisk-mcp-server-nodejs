const client = require('./client');
const organization = require('./organization');
const risks = require('./risks');
const subsidiaries = require('./subsidiaries');
const typosquat = require('./typosquat');
const questionnaires = require('./questionnaires');
const labels = require('./labels');
const notifications = require('./notifications');
const vendors = require('./vendors');
const domains = require('./domains');
const ips = require('./ips');
const bulk = require('./bulk');
const breaches = require('./breaches');
const reports = require('./reports');
const webhooks = require('./webhooks');

module.exports = {
    ...client,
    ...organization,
    ...risks,
    ...subsidiaries,
    ...typosquat,
    ...questionnaires,
    ...labels,
    ...notifications,
    ...vendors,
    ...domains,
    ...ips,
    ...bulk,
    ...breaches,
    ...reports,
    ...webhooks
}; 
