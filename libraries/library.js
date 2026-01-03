const crypto = require("crypto");
const CONSTANT = require('../config/const')
const _ = require('lodash');

/**
 * For Response
 * @param {Object} req
 * @param {Object} p 
 */

exports.response = (req,p = {}) => {
    if(!_.isObject(p) || _.isEmpty(p)){

        p = {'resp':0,'msg':'Something went wrong'};
    }

    !_.has(p,'resp') && _.set(p,'resp',0);
    p.requestReference = req.uniqueRequestId;

    if(req.uniqueResponseId!=undefined){
        p.requestReference = req.uniqueResponseId;
    }

    if(_.has(p,'errorCode') || _.has(p,'errorMsg')){
        
        p.msg = 'Something went wrong';
    }

    if(req.isDeveloper){

    }
    else{

        delete p['errorCode'];

        delete p['errorMsg'];
    }

    if(_.has(p,'actCode')){

        if(p['actCode']!=null && p['actCode']!=''){

            p['actCode'] = p['actCode'].toString();

            // For logout case
            if((p['actCode']).toUpperCase() == 'LOGOUT'){

                p = {'resp':0,'msg':'logout'};
            }
        }
    }

    return p;
}

/**
 * For Response
 * @param {Object} payload
*/

/* const payload = { userId: 101, role: "admin", exp: Date.now() + 60000 }; // expires in 1 min */ 
exports.generateToken = (payload) => {
  // Encode payload as Base64
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64");

  // Sign using HMAC-SHA256
  const signature = crypto
    .createHmac(
        CONSTANT.SERVER.CYPTO.HASH_METHOD.ALGO, 
        CONSTANT.SERVER.CYPTO.HASH_METHOD.PWD
    )
    .update(base64Payload)
    .digest("hex");

  // Return token
  return `${base64Payload}.${signature}`;
}

/**
 * For Response
 * @param {String} token
*/

exports.verifyToken = (token) => {
  const [base64Payload, signature] = token.split(".");

  // Recreate signature
  const expectedSig = crypto
    .createHmac(
        CONSTANT.SERVER.CYPTO.HASH_METHOD.ALGO, 
        CONSTANT.SERVER.CYPTO.HASH_METHOD.PWD
    )
    .update(base64Payload)
    .digest("hex");

  if (expectedSig !== signature) {
    throw new Error("Invalid signature");
  }

  // Decode payload
  const payload = JSON.parse(Buffer.from(base64Payload, "base64").toString("utf8"));

  // Check expiration
  if (payload.exp && Date.now() > payload.exp) {
    throw new Error("Regenerate x-request-hash!");
  }

  return payload;
}

exports.generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

exports.ipAddress = function(req){

    if(req=='' || req==undefined){

        return '0.0.0.0';
    }

    var ip;
    if (req.headers['x-forwarded-for']) {
		console.log(req.headers['x-forwarded-for'])
        ip = req.headers['x-forwarded-for'].split(",")[0];
    } else if (req.connection && req.connection.remoteAddress) {
        ip = req.connection.remoteAddress;
    } else {
        ip = req.ip;
    }
    return ip;
}

/**
 * Get Server IP
 * 
 * @param {Object} req
 */
exports.serverIP = async function(req) {

    return new Promise((resolve,reject) => {
        require('dns').lookup(require('os').hostname(), function (err, add, fam) {
            if(add!=''){
                return resolve(add);
            }
            else{
                return reject(false);
            }
        })
    })
}
