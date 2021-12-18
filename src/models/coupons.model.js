const mongoose = require('mongoose')

const Coupons = mongoose.model(
    "Coupons", 
    new mongoose.Schema({
        coupon_code: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true,
        },
        short_description: {
            type: String,
            required: true,
        },
        discount_per: {
            type: Number,
            required: true
        },
        discount_max_amt: {
            type: Number,
            required: true
        },
        active: {
            type: Boolean,
            required: true,
            default: false
        },
        featured: {
            type: Boolean,
            required: true,
            default: false
        },
    })
)

module.exports = Coupons