class Logger {
    constructor() {
        // Bind all methods to ensure they work correctly when passed as references
        this.error = this.error.bind(this);
        this.warn = this.warn.bind(this);
        this.info = this.info.bind(this);
        this.debug = this.debug.bind(this);
        this.http = this.http.bind(this);
    }

    error(...args) {
        process.stderr.write(`[ERROR] ${args.join(' ')}\n`);
    }

    warn(...args) {
        process.stderr.write(`[WARN] ${args.join(' ')}\n`);
    }

    info(...args) {
        process.stderr.write(`[INFO] ${args.join(' ')}\n`);
    }

    debug(...args) {
        process.stderr.write(`[DEBUG] ${args.join(' ')}\n`);
    }

    http(...args) {
        process.stderr.write(`[HTTP] ${args.join(' ')}\n`);
    }
}

// Create a single instance of the logger
const logger = new Logger();

// Request logging middleware
const requestLogger = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.http(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    });
    next();
};

// Error logging middleware
const errorLogger = (err, req, res, next) => {
    logger.error('Unhandled Error:', err.message);
    if (err.stack) {
        logger.error('Stack:', err.stack);
    }
    next(err);
};

// Helper methods
const logApiCall = (method, endpoint, _params, _response) => {
    logger.debug(`API Call - ${method} ${endpoint}`);
};

const logToolExecution = (toolName, _args, _result) => {
    logger.info(`Tool Execution: ${toolName}`);
};

const logPerformance = (operation, duration) => {
    logger.debug(`Performance: ${operation} - ${duration}ms`);
};

// Export the logger instance and helper functions
module.exports = {
    logger,
    requestLogger,
    errorLogger,
    logApiCall,
    logToolExecution,
    logPerformance
}; 
