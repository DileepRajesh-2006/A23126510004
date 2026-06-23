const Log = require("../vehicle-scheduler-be/utils/logger");


async function evaluationLoggerMiddleware(req, res, next) {
    const timestamp = new Date().toISOString();
    const logMessage = `Received ${req.method} request at ${req.originalUrl} [Time: ${timestamp}]`;

    try {
        await Log(
            "backend-middleware", 
            "info",               
            "logging-middleware", 
            logMessage           
        );
    } catch (err) {
        console.error("Middleware logging failed:", err.message);
    }

    next();
}

module.exports = evaluationLoggerMiddleware;