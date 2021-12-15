const authJwt = require('./authJwt')
const verifySignUp = require('./verifySignUp')
const verifyNumber = require('./verifyNumber')
const verifyLogin = require('./verifyLogin')

module.exports = {
    authJwt,
    verifySignUp,
    verifyNumber,
    verifyLogin
}