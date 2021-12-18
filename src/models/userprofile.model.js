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
            required: true,
            unique: true
        },
        gender: {
            type: String,
            required: true
        }, 
        profilePicKey: {
            type: String,
        },
        address: {
            line1: String,
            line2: String,
            city: String,
            state: String,
            zip: String,
            country: String,
            number: String
        },
        aadharNumber: {
            type: String
        },
        email: {
            type: String,
        },
        addressflag: {
            type: Boolean,
            default: false,
        }
    })
)

module.exports = UserProfile