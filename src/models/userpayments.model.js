const mongoose = require('mongoose')

const UserPayments = mongoose.model(
    "UserPayments", 
    new mongoose.Schema({
        payment_id: {
            type: String
        },
        payment_order_id: {
            type: String,
            required: true,
            unique: true
        },
        receipt_id: {
            type: String,
            required: true,
            unique: true,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        order_ids: [{
            order_id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            }
        }],
        payment_amt: {
            type: Number,
            required: true
        },
        payment_status: {
            type: Boolean,
            default: false,
            required: true
        },
        date: {
            type: Date,
            required: true,
            default: Date.now()
        }
    })
)

module.exports = UserPayments