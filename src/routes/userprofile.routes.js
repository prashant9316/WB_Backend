const controller = require('../controllers/userprofile.controller')
const { verifyToken } = require('../middlewares/authJwt')

module.exports = function(app){
    app.use(verifyToken)

    app.get(
        '/api/user/info',
        controller.getUserInfo
    )

    app.post(
        '/api/user/createprofile',
        controller.createProfile
    )

    app.post(
        '/api/user/updateprofile', 
        controller.updateProfile
    )

    app.post(
        '/api/user/uploadProfilePic', 
        controller.uploadProfilePic
    )
}