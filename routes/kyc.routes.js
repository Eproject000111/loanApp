const kycCtrl = require('../controllers/kyc.controller');

module.exports = function(app,ipay){
    app.get('/kyc/docList',kycCtrl.documentList);

    app.get('/kyc/docList',kycCtrl.getKycRuleList);
}