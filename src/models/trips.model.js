const mongoose = require('mongoose')

const Trips = mongoose.model(
    "Trips", 
    new mongoose.Schema({
        trip_id: {
            type: Number,
            required: true,
            unique: true
        },
        featured: {
            type: Boolean,
            required: true,
        },
        place: {
            type: String,
            required: true
        },
        trip_price: {
            type: Number,
            required: false
        },
        trip_discount_percent: {
            type: Number,
            default: 0
        },
        trip_discount_amt_max: {
            type: Number,
            default: 0
        },
        coupon_allowed: [{
            coupon_name: {
                type: String,
            },
            max_amt: {
                type: Number
            }
        }]
    })
)

module.exports = Trips