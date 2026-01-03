let ctrl = require('../controllers/user.controller');
let authCtrl = require('../controllers/auth.controller');

module.exports = function(app,ipay){
    app.post('/user/add',authCtrl.signup);
    app.get('/user/all',ctrl.getAllUsers);
    app.post('/user/single',ctrl.getUserById);

}