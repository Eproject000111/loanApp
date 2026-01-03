const rundb = require('./runDb');
module.exports = (app)=>{
    app['response']['dbContainer'] = {};
    baseDbConn(app,'Ed_Fin_app');
    loanDbConn(app,'Ed_Fin_app_loan');

}

const baseDbConn = async (app,dataBase)=>{
    let filePathconfig = require("../../models")();
    let dbInfo = await rundb(dataBase,filePathconfig);
    app['response']['dbContainer'][dataBase] = dbInfo;
}

const loanDbConn = async (app,dataBase)=>{
    let filePathconfig = require("../../models/loans")();
    let dbInfo = await rundb(dataBase,filePathconfig);
    app['response']['dbContainer'][dataBase] = dbInfo;
}
