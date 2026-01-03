let ctrl = require('../controllers/auth.controller')

module.exports = function(app){
    app.post('/auth/signup',ctrl.signup);
    app.post('/auth/verifyOtp',ctrl.verifyOTP);

    app.post('/auth/login',ctrl.login);
}