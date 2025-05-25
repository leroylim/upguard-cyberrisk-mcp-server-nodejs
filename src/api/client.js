const axios = require('axios');
const config = require('../config');
const { logger } = require('../utils/logger');
const { withResilience } = require('../utils/retry');
const { apiCache } = require('../utils/cache');

// Helper function to format objects for logging
function formatObject(obj) {
    return JSON.stringify(obj, null, 2);
}

/**
 * Makes a request to the UpGuard API with resilience patterns.
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE)
 * @param {string} path - The API endpoint path
 * @param {object} [params={}] - Query parameters
 * @param {object} [body=null] - Request body for POST/PUT requests
 * @param {object} [options={}] - Additional options like caching
 * @returns {Promise<any>} The API response data
 */
async function request(method, path, params = {}, body = null, options = {}) {
    const { 
        useCache = method === 'GET',
        cacheTtl = null,
        useResilience = true
    } = options;

    // Generate cache key for GET requests
    const cacheKey = useCache ? apiCache.generateKey(path, params) : null;

    // Try cache first if enabled
    if (useCache && cacheKey) {
        const cached = apiCache.get(cacheKey);
        if (cached !== null) {
            logger.debug(`Cache hit for ${method} ${path}`);
            return cached;
        }
    }

    const executeRequest = async () => {
        try {
            logger.info('Making request:', formatObject({
                method,
                path,
                params,
                body: body ? '[BODY_PRESENT]' : null,
                baseURL: config.api.baseUrl,
                headers: {
                    'Authorization': '[REDACTED]'
                }
            }));

            const requestConfig = {
                method,
                url: path,
                baseURL: config.api.baseUrl,
                params,
                timeout: config.api.timeout,
                headers: {
                    'Authorization': config.api.key,
                    'Content-Type': 'application/json'
                }
            };

            // Only include body for non-GET requests
            if (method.toUpperCase() !== 'GET' && body !== null) {
                requestConfig.data = body;
            }

            const response = await axios.request(requestConfig);

            logger.info('Response received:', formatObject({
                status: response.status,
                statusText: response.statusText,
                dataSize: JSON.stringify(response.data).length
            }));

            // Cache successful GET responses
            if (useCache && cacheKey && response.data) {
                apiCache.set(cacheKey, response.data, cacheTtl);
            }

            return response.data;
        } catch (error) {
            const enhancedError = new Error(getErrorMessage(error));
            enhancedError.details = {
                request: getRequestDetails(error),
                response: getResponseDetails(error)
            };
            enhancedError.originalError = error;
            
            logger.error('API Response Error:', formatObject({
                message: enhancedError.message,
                endpoint: path,
                method,
                statusCode: error.response?.status,
                originalMessage: error.message
            }));
            
            throw enhancedError;
        }
    };

    // Execute with or without resilience patterns
    if (useResilience) {
        return withResilience(executeRequest, {
            context: `${method} ${path}`
        });
    } else {
        return executeRequest();
    }
}

function getErrorMessage(error) {
    if (error.response) {
        const status = error.response.status;
        let message = `HTTP Error: ${status}`;
        
        if (status === 401 || status === 403) {
            message += '. Authentication failed - check API key';
        } else if (status === 429) {
            message += '. Rate limit exceeded - please retry later';
        } else if (status === 404) {
            message += '. Resource not found';
        } else if (status >= 500) {
            message += '. Server error - service may be temporarily unavailable';
        }
        
        if (error.response.data?.message) {
            message += `: ${error.response.data.message}`;
        }
        
        return message;
    }
    
    if (error.code === 'ECONNREFUSED') {
        return 'Connection refused - service may be down';
    }
    
    if (error.code === 'ETIMEDOUT') {
        return 'Request timeout - service may be slow or unreachable';
    }
    
    return error.message || 'Unknown error occurred';
}

function getRequestDetails(error) {
    const request = error.config || {};
    return {
        method: request.method,
        url: request.url,
        baseURL: request.baseURL,
        params: request.params,
        headers: {
            ...request.headers,
            Authorization: request.headers?.Authorization ? '[REDACTED]' : '[MISSING]'
        }
    };
}

function getResponseDetails(error) {
    if (!error.response) return null;
    return {
        status: error.response.status,
        statusText: error.response.statusText,
        headers: error.response.headers,
        data: error.response.data
    };
}

// HTTP method wrappers with intelligent defaults
async function get(path, params = {}, options = {}) {
    return await request('GET', path, params, null, {
        useCache: true,
        cacheTtl: 300000, // 5 minutes default
        ...options
    });
}

async function post(path, body = null, params = {}, options = {}) {
    return await request('POST', path, params, body, {
        useCache: false,
        ...options
    });
}

async function put(path, body = null, params = {}, options = {}) {
    return await request('PUT', path, params, body, {
        useCache: false,
        ...options
    });
}

async function del(path, params = {}, options = {}) {
    return await request('DELETE', path, params, null, {
        useCache: false,
        ...options
    });
}

// Risk-related API calls with appropriate caching
async function getAvailableRisks(params) {
    return await get('/available_risks', params, { cacheTtl: 600000 }); // 10 minutes
}

async function getRiskDetails(params) {
    return await get('/available_risks/risk', params, { cacheTtl: 600000 }); // 10 minutes
}

async function getAvailableRisksV2() {
    return await get('/available_risks/v2', {}, { cacheTtl: 600000 }); // 10 minutes
}

async function getAccountRisks(params) {
    return await get('/risks', params, { cacheTtl: 180000 }); // 3 minutes (more dynamic)
}

async function getAccountRisksDiff(params) {
    return await get('/risks/diff', params, { cacheTtl: 300000 }); // 5 minutes
}

async function getVendorRisks(params) {
    return await get('/risks/vendors', params, { cacheTtl: 180000 }); // 3 minutes
}

async function getVendorRisksDiff(params) {
    return await get('/risks/vendors/diff', params, { cacheTtl: 300000 }); // 5 minutes
}

async function getVendorsRisksDiff(params) {
    return await get('/risks/vendors/diffs', params, { cacheTtl: 300000 }); // 5 minutes
}

async function getVendorQuestionnaireRisks(params) {
    return await get('/risks/vendors/questionnaires', params, { cacheTtl: 300000 }); // 5 minutes
}

async function getVendorQuestionnaireRisksV2(params) {
    return await get('/risks/vendors/questionnaires/v2', params, { cacheTtl: 300000 }); // 5 minutes
}

module.exports = {
    // HTTP methods
    get,
    post,
    put,
    delete: del,
    
    // Risk-specific methods
    getAvailableRisks,
    getRiskDetails,
    getAvailableRisksV2,
    getAccountRisks,
    getAccountRisksDiff,
    getVendorRisks,
    getVendorRisksDiff,
    getVendorsRisksDiff,
    getVendorQuestionnaireRisks,
    getVendorQuestionnaireRisksV2,

    // Utilities
    request // Export for advanced usage
};
