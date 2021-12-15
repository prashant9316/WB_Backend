const controller = require("../controllers/auth2.controller");
const { verifyLogin } = require('../middlewares');
const { verifyToken } = require("../middlewares/authJwt");


module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        '/api/auth/checkLogin',
        verifyToken,
        controller.checkLogin
    )

    app.post(
        '/api/auth/sendOtp', 
        controller.sendOtp
    )

    app.post(
        '/api/auth/login',
        verifyLogin.verifyOtp,
        controller.login
    )
}