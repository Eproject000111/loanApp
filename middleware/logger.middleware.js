const { writeLog,orderedUuid } = require("../helper/common.helper");

module.exports = (options) => {

    return (req,res,next) => {

    // Capture request body & headers
    const requestLog = {
        Type: "API-REQUEST",
        ReferenceId: orderedUuid(),
        DateTime: new Date().toISOString(),
        Method: req.method,
        Url: req.originalUrl,
        Headers: req.headers,
        requestBody: req.body,
    };

    writeLog(req,requestLog);

    // Capture response
    const originalSend = res.send;

    res.send = function (body) {

    // Capture response body & headers
        const responseLog = {
            Type: "API-RESPONSE",
            ReferenceId: orderedUuid(),
            DateTime: new Date().toISOString(),
            StatusCode: res.statusCode,
            Headers: res.getHeaders(),
            responseBody: tryParse(body),
        };

        writeLog(req,responseLog);

        return originalSend.call(this, body);
    };
        next();
    }
}

function tryParse(data) {
    try {
        return JSON.parse(data);
    } catch {
        return data;
    }
}