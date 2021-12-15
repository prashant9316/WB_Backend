const mongoose = require('mongoose')

const User = mongoose.model(
    "User", 
    new mongoose.Schema({
        phoneNumber: {
            type: String,
            required: true,
            length: 10,
            unique: true
        },
        role: {
            type: String,
            default: 'user',
            required: true
        }
    })
)

module.exports = User