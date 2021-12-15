const jwt = require('jsonwebtoken')
const Users = require('./../models/user.model')

const generateJwt = async(req, res) => {
    const user = await Users.findOne({ phoneNumber: req.body.phoneNumber })
    if(!user){
        return -1;
    } 
    const token = jwt.sign({
        _id: user._id,
        role: user.role
    }, process.env.SECRET_TOKEN, {
        expiresIn: '24h'
    })
    return token
}

const jwtService = {
    generateJwt
}

module.exports = jwtService