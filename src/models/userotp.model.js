const mongoose = require('mongoose')

const UserOtp = mongoose.model(
    "UserOtp", 
    new mongoose.Schema({
        phoneNumber: {
            type: String,
            required: true,
            length: 10,
            unique: true
        },
        otp: {
            type: String,
            required: true,
            length: 6
        }
    })
)

module.exports = UserOtp