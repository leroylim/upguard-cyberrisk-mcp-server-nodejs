const { z } = require('zod');

// Defensive function to ensure schema is valid
function validateSchema(schema, name) {
    if (!schema || typeof schema._parse !== 'function') {
        throw new Error(`Invalid schema for ${name}: missing _parse method. Schema type: ${typeof schema}`);
    }
    return schema;
}

// Common schemas that are reused across different tools
const schemas = {
    // Hostname schemas - most critical for consistency
    vendorHostname: validateSchema(z.string()
        .min(1, 'Vendor hostname cannot be empty')
        .max(253, 'Hostname too long (max 253 characters)')
        .regex(/^[a-zA-Z0-9][a-zA-Z0-9-_.]*[a-zA-Z0-9]$/, 'Invalid hostname format')
        .describe("Primary hostname of the vendor (e.g., 'example.com')."), 'vendorHostname'),
    
    // Alias for consistency - some tools use vendor_primary_hostname
    vendorPrimaryHostname: validateSchema(z.string()
        .min(1, 'Vendor hostname cannot be empty')
        .max(253, 'Hostname too long (max 253 characters)')
        .regex(/^[a-zA-Z0-9][a-zA-Z0-9-_.]*[a-zA-Z0-9]$/, 'Invalid hostname format')
        .describe("Primary hostname of the vendor (e.g., 'example.com')."), 'vendorPrimaryHostname'),
    
    // Primary hostname - used in many Swagger endpoints
    primaryHostname: validateSchema(z.string()
        .min(1, 'Primary hostname cannot be empty')
        .max(253, 'Hostname too long (max 253 characters)')
        .regex(/^[a-zA-Z0-9][a-zA-Z0-9-_.]*[a-zA-Z0-9]$/, 'Invalid hostname format')
        .describe("Primary hostname (e.g., 'example.com')."), 'primaryHostname'),
    
    subsidiaryHostname: validateSchema(z.string()
        .min(1, 'Subsidiary hostname cannot be empty')
        .max(253, 'Hostname too long (max 253 characters)')
        .regex(/^[a-zA-Z0-9][a-zA-Z0-9-_.]*[a-zA-Z0-9]$/, 'Invalid hostname format')
        .describe("Primary hostname of the subsidiary (e.g., 'subsidiary.example.com')."), 'subsidiaryHostname'),
    
    // Labels - highly reused across tools
    labels: validateSchema(z.array(z.string()
        .min(1, 'Label cannot be empty')
        .max(50, 'Label too long')
        .regex(/^[a-zA-Z0-9_-]+$/, 'Labels can only contain alphanumeric characters, underscores, and hyphens'))
        .max(10, 'Maximum 10 labels allowed')
        .describe('List of labels for categorization and filtering.'), 'labels'),
    
    // Vendor tier - common validation pattern
    vendorTier: validateSchema(z.number()
        .int('Tier must be an integer')
        .min(1, 'Tier must be at least 1')
        .max(3, 'Tier cannot exceed 3')
        .describe('Tier level for the vendor (1-3, where 1 is highest priority).'), 'vendorTier'),
    
    // Severity levels - standardized across risk tools
    severity: validateSchema(z.enum(['info', 'low', 'medium', 'high', 'critical'])
        .describe('Risk severity level. Options: "info" (informational, lowest priority), "low" (minor issues), "medium" (moderate risk), "high" (significant risk requiring attention), "critical" (urgent, highest priority requiring immediate action)'), 'severity'),
    
    // Date formats
    dateYYYYMMDD: validateSchema(z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
        .refine(val => !isNaN(Date.parse(val)), 'Invalid date')
        .describe("Date in YYYY-MM-DD format (e.g., '2024-03-20')."), 'dateYYYYMMDD'),
    
    dateTimeISO: validateSchema(z.string()
        .datetime('Must be valid ISO 8601 datetime')
        .describe("Date and time in ISO 8601 format (e.g., '2024-03-20T15:30:00Z')."), 'dateTimeISO'),
    
    // Recipient information - complex schema used in questionnaires
    recipient: validateSchema(z.object({
        recipient_email: z.string()
            .email('Invalid email address')
            .max(255, 'Email too long'),
        recipient_first_name: z.string()
            .min(1, 'First name cannot be empty')
            .max(50, 'First name too long')
            .optional(),
        recipient_last_name: z.string()
            .min(1, 'Last name cannot be empty')
            .max(50, 'Last name too long')
            .optional(),
        recipient_title: z.string()
            .min(1, 'Title cannot be empty')
            .max(100, 'Title too long')
            .optional()
    }).describe('Questionnaire recipient details.'), 'recipient'),
    
    // Common metadata pattern
    metadata: validateSchema(z.object({
        include_meta: z.boolean()
            .optional()
            .default(false)
            .describe('Include additional metadata in the response.')
    }), 'metadata'),

    // IP Address validation
    ipAddress: validateSchema(z.string()
        .regex(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/, 'Invalid IP address format')
        .describe("IPv4 address (e.g., '192.168.1.1')."), 'ipAddress'),

    // Pagination - commonly used across list endpoints
    pagination: validateSchema(z.object({
        page: z.number().int().min(1).optional().default(1)
            .describe('Page number for paginated results.'),
        limit: z.number().int().min(1).max(100).optional().default(20)
            .describe('Number of items per page (max 100).')
    }), 'pagination'),

    // Time range for historical data
    timeRange: validateSchema(z.object({
        start_date: z.string().datetime()
            .describe('Start date and time in ISO 8601 format.'),
        end_date: z.string().datetime().optional()
            .describe('End date and time in ISO 8601 format (defaults to current time).')
    }), 'timeRange'),

    // Date range for simpler date filtering
    dateRange: validateSchema(z.object({
        from_date: z.string()
            .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
            .refine(val => !isNaN(Date.parse(val)), 'Invalid date')
            .optional()
            .describe('Start date for filtering (YYYY-MM-DD).'),
        to_date: z.string()
            .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format') 
            .refine(val => !isNaN(Date.parse(val)), 'Invalid date')
            .optional()
            .describe('End date for filtering (YYYY-MM-DD).')
    }), 'dateRange'),

    // Risk filtering - used across multiple risk tools
    riskFilters: validateSchema(z.object({
        min_severity: z.enum(['info', 'low', 'medium', 'high', 'critical']).optional()
            .describe('Minimum severity level for filtering risks. Options: "info" (informational), "low" (minor), "medium" (moderate), "high" (significant), "critical" (urgent). Default: includes all severities'),
        risk_types: z.array(z.string()).optional()
            .describe('Specific risk types to include.'),
        include_meta: z.boolean().optional().default(false)
            .describe('Include risk metadata in response.')
    }), 'riskFilters'),

    // Common questionnaire status
    questionnaireStatus: validateSchema(z.enum(['active', 'completed', 'draft'])
        .describe('Questionnaire status. Options: "active" (currently in progress), "completed" (finished and submitted), "draft" (not yet sent)'), 'questionnaireStatus'),

    // Bulk operation types for vendors
    bulkOperationType: validateSchema(z.enum(['start_monitoring', 'stop_monitoring', 'update_tier', 'update_labels'])
        .describe('Type of bulk operation to perform. Options: "start_monitoring" (begin monitoring vendors), "stop_monitoring" (stop monitoring vendors), "update_tier" (change vendor tier levels), "update_labels" (modify vendor labels)'), 'bulkOperationType'),

    // Common IDs
    questionnaireId: validateSchema(z.string()
        .min(1, 'Questionnaire ID cannot be empty')
        .describe('Unique identifier for a questionnaire.'), 'questionnaireId'),

    vendorId: validateSchema(z.number()
        .int('Vendor ID must be an integer')
        .nonnegative('Vendor ID must be non-negative')
        .describe('Unique numeric identifier for a vendor.'), 'vendorId'),

    // Email validation - commonly used across tools
    email: validateSchema(z.string()
        .email('Invalid email format')
        .describe("Valid email address (e.g., 'user@example.com')."), 'email'),
    
    // Email array for reports and notifications
    emailArray: validateSchema(z.array(z.string().email())
        .max(5, 'Maximum 5 email addresses allowed')
        .describe('Array of email addresses (max 5).'), 'emailArray')
};

// Validate all schemas on module load
for (const [name, schema] of Object.entries(schemas)) {
    if (!schema || typeof schema._parse !== 'function') {
        throw new Error(`Schema validation failed for ${name}: missing _parse method`);
    }
}

module.exports = schemas; 
