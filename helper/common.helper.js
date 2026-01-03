const _ = require('lodash');
var fs = require('fs');
const path = require("path");
const date = require('date-and-time');
const dns = require('dns');
const { v4: uuidv4 } = require('uuid');
/**
 * Write LOG File.
 * @param {object} req
 * @param {Object} p
 */
exports.writeLog = async (req,data={}) => {
    // try {
    //     // ---------- 1) BASE DIRECTORY ----------
    //     let baseDir = path.join(__dirname, "../logs");

    //     // Auto-create base logs folder if missing
    //     if (!fs.existsSync(baseDir)) {
    //         fs.mkdirSync(baseDir);
    //     }

    //     // ---------- 2) DATE BASED FOLDERS ----------
    //     const now = new Date();

    //     const year = date.format(now, "YYYY");
    //     const month = date.format(now, "MM");
    //     const day = date.format(now, "DD");

    //     const yearDir = path.join(baseDir, year);
    //     const monthDir = path.join(yearDir, month);
    //     const dayDir = path.join(monthDir, day);

    //     [yearDir, monthDir, dayDir].forEach(dir => {
    //         if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    //     });

    //     // ---------- 3) TIME SLOT SPLIT (4 FILES PER HOUR) ----------
    //     let minute = parseInt(date.format(now, "mm"));
    //     let slot = "1OF4";

    //     if (minute < 15) slot = "1OF4";
    //     else if (minute < 30) slot = "2OF4";
    //     else if (minute < 45) slot = "3OF4";
    //     else slot = "4OF4";

    //     const fileName = `${date.format(now, "YYYY-MM-DD-HH")}-${slot}.txt`;
    //     let fullPath = path.join(dayDir, fileName);

    //     // If file path already stored (same request), reuse it
    //     if (req.logWritePath) fullPath = req.logWritePath;

    //     // ---------- 4) LOG CONTENT FORMAT ----------
    //     const logEntry = {
    //         time: date.format(now, "HH:mm:ss"),
    //         url: req.originalUrl,
    //         method: req.method,
    //         ip: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    //         requestBody: req.body || {},
    //         response: p.content || "",
    //     };

    //     const formattedLog =
    //         `\n------------------------------\n` +
    //         `${date.format(now, "YYYY-MM-DD HH:mm:ss")}\n` +
    //         `${JSON.stringify(logEntry, null, 4)}\n`;

    //     // ---------- 5) WRITE LOG ----------
    //     await fs.promises.appendFile(fullPath, formattedLog);

    //     // Store file path for continuous logging within same request
    //     req.logWritePath = fullPath;

    //     return true;

    // } catch (err) {
    //     console.error("Log Write Error:", err.message);
    //     return false;
    // }

    // try {
    //     // ----------------- Directory Setup -----------------
    //     let baseDir = path.join(__dirname, "../logs");

    //     if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir);

    //     const now = new Date();
    //     const year = date.format(now, "YYYY");
    //     const month = date.format(now, "MM");
    //     const day = date.format(now, "DD");

    //     const folders = [
    //         path.join(baseDir, year),
    //         path.join(baseDir, year, month),
    //         path.join(baseDir, year, month, day),
    //     ];

    //     folders.forEach(dir => {
    //         if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    //     });

    //     const logDir = folders[2];

    //     // ----------------- Split Log into 4 Parts of Hour -----------------
    //     const minute = parseInt(date.format(now, "mm"));
    //     const timeSlot = minute < 15 ? "1OF4"
    //                     : minute < 30 ? "2OF4"
    //                     : minute < 45 ? "3OF4"
    //                     : "4OF4";

    //     const fileName = `${date.format(now, "YYYY-MM-DD-HH")}-${timeSlot}.txt`;
    //     let fullPath = path.join(logDir, fileName);

    //     if (req.logWritePath) fullPath = req.logWritePath;

    //     // ----------------- Build Request/Response JSON Structure -----------------
    //     const logJson = {
    //         Type: p.type || "LOG",
    //         DateTime: date.format(now, "YYYY-MM-DD HH:mm:ss"),
    //         ReferenceId: req.headers["x-ipay-reference-uuid"] || null,
    //         Source: p.source || "FRONTEND",
    //         Destination: p.destination || "APP",
    //         Direction: p.direction || "Request",
    //         ServerIp: req.ip || null,
    //         ClientIp: req.headers['x-forwarded-for'] || req.connection.remoteAddress || null,
    //         HttpMethod: req.method || null,
    //         Url: req.originalUrl || null,
    //         Headers: p.headers || req.rawHeaders,
    //         HttpCode: p.httpCode || null,
    //         requestBody: req.body || p.body || {},
    //         response: p.content || "",
    //         encryptedBody: null
    //     };

    //     // ----------------- Pretty JSON Format -----------------
    //     const jsonFormatted = JSON.stringify(logJson, null, 4);

    //     // Final log block
    //     const contentToWrite = `\n\n=============${date.format(now, "YYYY-MM-DD HH:mm:ss")}==================\n${jsonFormatted}`;

    //     // ----------------- Append to File -----------------
    //     await fs.promises.appendFile(fullPath, contentToWrite);

    //     req.logWritePath = fullPath;

    //     return true;

    // } catch (error) {
    //     console.error("Logging Error:", error);
    //     return false;
    // }

    const baseDir = path.join(__dirname, "../logs");

    // Create Year/Month/Day folder structure
    const yearDir = path.join(baseDir, date.format(new Date(), "YYYY"));
    const monthDir = path.join(yearDir, date.format(new Date(), "MM"));
    const dayDir = path.join(monthDir, date.format(new Date(), "DD"));

    [baseDir, yearDir, monthDir, dayDir].forEach(dir => {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    });

    // Create file name based on hour + 15-minute bucket
    const minute = parseInt(date.format(new Date(), "mm"));
    const bucket = minute < 15 ? "1OF4" :
                   minute < 30 ? "2OF4" :
                   minute < 45 ? "3OF4" : "4OF4";

    const filename = `${date.format(new Date(), "YYYY-MM-DD-HH")}-${bucket}.txt`;
    const fullPath = path.join(dayDir, filename);

    const jsonFormatted = JSON.stringify(data, null, 4);

    const contentToWrite = `\n\n=============${date.format(new Date(), "YYYY-MM-DD HH:mm:ss")}==================\n${jsonFormatted}`;

    await fs.promises.appendFile(fullPath, contentToWrite);
    req.logWritePath = fullPath;
    return true;
}


/**
 * Ordered UUID V4
 * @param {Object} req
 * @param {Object} p
 */
exports.orderedUuid = () => {
    let uuid = uuidv4();

    //console.log(uuid);
    let uuidSplit =  uuid.split('-');
    let timestamp = Date.now()*100;
    //console.log(timestamp.toString(16));
    let hexTimestamp = timestamp.toString(16);

    let newUUid = hexTimestamp.substr(0,8)+'-'+hexTimestamp.substr(-4)+'-'+uuidSplit[2]+'-'+uuidSplit[3]+'-'+uuidSplit[4];

    //console.log(newUUid,timestamp);
    return newUUid;
}


exports.pagination = ()=>{
    
}