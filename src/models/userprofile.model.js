const mongoose = require('mongoose')

const UserProfile = mongoose.model(
    "UserProfile", 
    new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
        }, 
        phoneNumber: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        }, 
        profilePicKey: {
            type: String,
        },
        address: {
            type: String
        },
        aadharNumber: {
            type: String
        },
        
    })
)

module.exports = UserProfile