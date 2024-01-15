var router = require('express').Router();
var cors = require('cors')
// var headers = new Headers();
// headers.append('Content-Type', 'application/json');
// headers.append('Accept', 'application/json');
// "origin": "http://18.237.239.203",

var corsOptions = {
    "origin": "http://localhost:3001",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    mode: 'same-origin',
    credentials: true,
    redirect: 'follow',
    // credentials: 'include',
    "preflightContinue": true,
    // headers: headers,
    "changeOrigin": true,
    "cookieDomainRewrite": "localhost:3001",
    "optionsSuccessStatus": 204
}
var corsOptions1 = {
    "origin": "http://localhost:3001",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    //     // mode: 'same-origin',
    //     // credentials: true,
    //     // redirect: 'follow',
    credentials: 'include',
    //     // "preflightContinue": true,
    //     // headers: headers,
    //     // "changeOrigin": true,
    //     // "cookieDomainRewrite": "localhost",
    //     // "optionsSuccessStatus": 204
};
const checkToken = require("./utils/tokenValidation");
// const requestObjectCreation = require("./utils/requestCreation")
router.use('/app/registration',  require('./api/registrationpage/registrationPageRoutes'));
router.use('/app/login', require('./api/login/loginCtrl'));
router.use('/app/user',  require('./api/login/loginCtrl'));
router.use('/app/upload', checkToken, require('./api/aws/fileupload'));
router.use('/app/reporthistory', checkToken ,require('./api/reporthistory/reportHistoryCtrl'));
router.use('/app/testdetails', checkToken, require('./api/testdetails/testDetailsCtrl'));
    

module.exports = router;