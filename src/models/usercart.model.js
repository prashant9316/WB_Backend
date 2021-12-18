const mongoose = require('mongoose')

const UserCart = mongoose.model(
    "UserCart", 
    new mongoose.Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        place: {
            type: String,
            required: true
        },
        trip_id: {
            type: String,
            required: true
        },
        members: {
            type: Number,
            required: true,
            default: 1
        },
        review: {
            type: String,
            required: false
        },
        price: {
            type: Number,
            required: true
        },
        total_cost: {
            type: Number,
            required: true
        },
        discount_per: {
            type: Number,
            required: false,
            default: 0
        },
        discount_amt: {
            type: Number,
            required: false,
            default: 0
        },
        coupon: {
            type: String,
            required: false,
        },
        final_cost: {
            type: Number,
            required: true
        }
    })
)

module.exports = UserCart