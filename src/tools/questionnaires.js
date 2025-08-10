const api = require('../api');
const { logger } = require('../utils/logger');
const { z } = require('zod');
const schemas = require('./schemas');

function registerTools(server) {
    server.tool(
        'upguard_get_questionnaire_types',
        'Get a list of available questionnaire types that can be sent to vendors',
        {
                usage_type: z.enum(['security', 'relationship']).optional().default('security').describe('Type of questionnaires to return. Options: "security" (security assessment questionnaires), "relationship" (vendor relationship questionnaires). Default: "security"')
            },
        async (params) => {
            try {
                const result = await api.getQuestionnaireTypes(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting questionnaire types:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_get_vendor_questionnaires',
        'Get a list of questionnaires for a specific vendor',
        {
                vendor_primary_hostname: z.string().describe('The primary hostname of the vendor to get questionnaires for'),
                usage_type: z.enum(['security', 'relationship']).optional().default('security').describe('Type of questionnaires to return. Options: "security" (security assessment questionnaires), "relationship" (vendor relationship questionnaires). Default: "security"'),
                page_token: z.string().optional().describe('The page_token from a previous request, use this to get the next page of results'),
                page_size: z.number().int().min(10).max(2000).optional().default(1000).describe('The number of results to return per page')
            },
        async (params) => {
            try {
                const result = await api.getVendorQuestionnaires(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting vendor questionnaires:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_get_vendor_questionnaires_v2',
        'List vendor questionnaires (V2)',
        {
                vendor_primary_hostname: schemas.primaryHostname.optional(),
                vendor_id: z.number().int().optional(),
                usage_type: z.enum(['security', 'relationship']).optional().default('security').describe('The usage type of questionnaires to return'),
                exclude_archived: z.boolean().optional().describe('Optionally exclude archived questionnaires')
            },
        async (params) => {
            try {
                const result = await api.getVendorQuestionnairesV2(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting vendor questionnaires V2:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_send_relationship_questionnaire',
        'Send a relationship questionnaire about a vendor',
        {
                hostname: schemas.primaryHostname,
                recipient_email: schemas.email.describe('Email address of the questionnaire recipient'),
                message: z.string().optional().describe('Optional message sent to the questionnaire recipient')
            },
        async (params) => {
            try {
                const result = await api.sendRelationshipQuestionnaire(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error sending relationship questionnaire:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_get_vendor_questionnaire_attachments',
        'List vendor questionnaire attachments',
        {
                questionnaire_id: schemas.questionnaireId
            },
        async (params) => {
            try {
                const result = await api.getVendorQuestionnaireAttachments(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error getting vendor questionnaire attachments:', error);
                throw error;
            }
        }
    );

    server.tool(
        'upguard_send_vendor_questionnaire',
        'Send a security questionnaire to a vendor',
        {
                hostname: schemas.primaryHostname,
                questionnaire_type_id: z.number().int().describe('Numeric ID of the questionnaire type to be sent'),
                due_date: z.string().describe('The date the questionnaire is due to be completed by. Must be a future ISO 8601 formatted date string (YYYY-MM-DD)'),
                message: z.string().optional().describe('Optional message sent to the questionnaire recipient'),
                email_title: z.string().optional().describe('Optional email title sent to the questionnaire recipient'),
                recipients: z.array(z.string()).describe('The list of questionnaire recipients')
            },
        async (params) => {
            try {
                const result = await api.sendVendorQuestionnaire(params);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            } catch (error) {
                logger.error('Error sending vendor questionnaire:', error);
                throw error;
            }
        }
    );
}

module.exports = { registerTools }; 


