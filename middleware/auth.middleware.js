const CONSTANT = require('../config/const')
const lib = require('../libraries/library')
const _ = require('lodash');

const {orderedUuid} = require('../helper/common.helper');

module.exports = (options) => {

    return async (req,res,next) => {

        req.isPublicRequest = false;

        
        let filterUrl = (req.url).split('?');
        
        if((CONSTANT.BYPASSROUTES).includes(filterUrl[0]) ){
            req.isPublicRequest = true;
        }

        req.isDeveloper = false;

        if(CONSTANT.DEBUG_USERS.DEBUG && _.includes(CONSTANT.DEBUG_USERS.LIST)){
            req.isDeveloper = true;
        }

        req.clientIp =  lib.ipAddress(req);

        req.serverIp = await lib.serverIP(req);

        req.fileDownload = false;

        // req.ipayEventEmitter = options.eventEmitter;

        let serverList = {
            '172.16.213.5' : '005',
            '172.16.213.6' : '006',
            '172.16.213.68' : '068',
        };

        if(serverList[req.serverIp]){
            req.uniqueRequestId = 'd'+serverList[req.serverIp]+orderedUuid();
        }
        else{
            req.uniqueRequestId = 'd000'+orderedUuid();
        }

        if(!req.isPublicRequest){

            const hash = req.headers["x-request-hash"];
    
            if (!hash) {
                
                return res.loanResponse({
                    resp: 0,
                    msg: 'x-request-hash required!',
                    data: null,
                    actCode : null
                });
            }

            // const token = authHeader.split(" ")[1];

            try {
                const decoded = lib.verifyToken(hash);
                req.user = decoded;
            } 
            catch (err) {
                return res.loanResponse({
                    resp:0,
                    msg: err.message,
                    data:null,
                    actCode : null
                });
            }
        }



        next();
    }

}