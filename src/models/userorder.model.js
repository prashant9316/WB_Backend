const mongoose = require('mongoose')
const shortid = require('shortid')

const UserOrders = mongoose.model(
    "UserOrders", 
    new mongoose.Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        order_id: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true,
            required: true,
            unique: true
        },
        trip_unique_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        payment_id: {
            type: String,
            required: true
        },
        payment_order_id: {
            type: String
        },
        payment_status: {
            type: Boolean,
            default: false,
            required: true
        },
        order_status: {
            type: String,
            default: "Pending",
            required: true
        },
        order_detail: {
            type: String,
            default: "Will be updated!"
        },
        members: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now()
        },
        price: {
            type: Number,
            required: true
        },
        total_cost: {
            type: Number,
            required: true
        },
        discout_per: {
            type: Number,
        },
        discount_amt: {
            type: Number
        },
        final_cost: {
            type: Number
        },
        members_details: [{
            name: String,
            age: Number,
            dob: Date,
            gender: String
        }]
    })
)

module.exports = UserOrders