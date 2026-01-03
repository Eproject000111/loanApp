const _ = require('lodash');
const lib = require('../libraries/library'); 
const { writeLog } = require('../helper/common.helper');

module.exports = (options) => {
    return async (req, res, next) => {
        //Note: Do not write any login outside ipayResponse

        /**
         * contentType : text/plain,text/html,application/json
         * returnMethod : json,jsonp,send,write
         * @param {*} data //pass result (send to client side data) here
         * @param {*} params //{contentType:'',returnMethod:'',httpCode:'',isSendWithHttpCode:false,overrideResponseTemplate:false}
         * @returns 
         */

        // writeLog(req,{
        //     body : req['body'],
        // });
        
        res.loanResponse = (data,params={}) => {

            let defaultParams = {
                contentType : 'application/json',//text/plain,text/html,application/json
                returnMethod : 'json' , //json,jsonp,send,write
                httpCode : 200,
                isSendWithHttpCode : false,
                overrideResponseTemplate : false,
            }

            /* if(!_.isEmpty(params)){

                if(_.has(params,'contentType') && !_.isEmpty(params['contentType'])){
                    defaultParams['contentType'] = params['contentType'];
                }

                if(_.has(params,'returnMethod') && !_.isEmpty(params['returnMethod'])){
                    defaultParams['returnMethod'] = params['returnMethod'];
                }

                if(_.has(params,'httpCode') && params['httpCode']){
                    defaultParams['httpCode'] = params['httpCode'];
                }

                if(_.has(params,'isSendWithHttpCode') && params['isSendWithHttpCode']){
                    defaultParams['isSendWithHttpCode'] = params['isSendWithHttpCode'];
                }

                if(_.has(params,'overrideResponseTemplate') && params['overrideResponseTemplate']){
                    defaultParams['overrideResponseTemplate'] = params['overrideResponseTemplate'];
                }
            } */

            const headers = res.getHeaders();

            //Share Headers
            let allowHeaders = "x-access-token, Origin, Content-Type, Accept";

            let exposeHeaders = "X-Ipay-Actions";

            if(res.fileDownload){
                exposeHeaders = exposeHeaders+", Content-Disposition";
            }

            if(headers['x-ipay-debug']!=undefined && headers['x-ipay-debug']!=null && headers['x-ipay-debug']!=''){
                exposeHeaders = exposeHeaders+", X-Ipay-Debug";
                allowHeaders = allowHeaders+", X-Ipay-Debug";
            }

            if(headers['x-ipay-request-country']!=undefined && headers['x-ipay-request-country']!=null && headers['x-ipay-request-country']!=''){
                exposeHeaders = exposeHeaders+", X-Ipay-Request-Country";
                allowHeaders = allowHeaders+", X-Ipay-Request-Country";
            }

            res.header("Access-Control-Allow-Headers",allowHeaders);

            res.header("Access-Control-Expose-Headers",exposeHeaders);

            res.header("Permissions-Policy", 'geolocation=(self "https://*.instantpay.in")');

            res.header("Cross-Origin-Resource-Policy", 'same-site');

            let templateResponse = lib.response(req,data);

            // writeLog(req,{
            //     content : templateResponse,
            // });

            return res.json(templateResponse);

           /*  if(defaultParams['returnMethod'] == 'send'){
                
                if(defaultParams['isSendWithHttpCode']){
                    return res.status(defaultParams['httpCode']).send(data);
                }
                else{
                    return res.send(data);
                }
            }
            else if(defaultParams['returnMethod'] == 'jsonp'){
                
                if(defaultParams['isSendWithHttpCode']){
                    return res.status(defaultParams['httpCode']).jsonp(data);
                }
                else{
                    return res.jsonp(data);
                }
            }
            else if(defaultParams['returnMethod'] == 'write'){

                if(_.isObject(data) && !_.isEmpty(data)){

                    if(_.has(data,'downloadHeaders') && !_.isEmpty(data.downloadHeaders)){
                        res.writeHead(200, data.downloadHeaders);
                    }  
                    
                    if(_.has(data,'content') && data.content){

                        let defaultContentEncoding = "utf8";

                        if(_.has(data,'contentEncoding') && data.contentEncoding!=''){
                            defaultContentEncoding = data.contentEncoding;
                        }

                        res.write(data.content,defaultContentEncoding);
                    }

                    let defaultEndContent = null;
                    let defaultEndEncoding = 'utf8';

                    if(_.has(data,'endContent') && data.endContent!=''){
                        defaultEndContent = data.endContent;
                    }

                    if(_.has(data,'endEncoding') && data.endEncoding!=''){
                        defaultEndEncoding = data.endEncoding;
                    }

                    return res.end(defaultEndContent, defaultEndEncoding);
                }
                else{
                    return res.end('OK');
                }
            }
            else{//For send in json
                
                let templateResponse = '';

                if(defaultParams['overrideResponseTemplate']){
                    templateResponse = data;
                }
                else{
                    templateResponse = lib.response(req,data);
                }

                if(defaultParams['isSendWithHttpCode']){
                    return res.status(defaultParams['httpCode']).json(templateResponse);
                }
                else{
                    return res.json(templateResponse);
                }
            } */
        }

        next();
    }
}