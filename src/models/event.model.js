const mongoose = require('mongoose')

const Events = mongoose.model(
    'Events',
    new mongoose.Schema({
        event_id: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true,
            required: true
        },
        event_name: {
            type: String,
            required: true
        },
        event_banner_link: {
            type: String
        },
        active: {
            type: Boolean,
            required: true
        },
        featured_destination: {
            type: String,
            required: true
        },
        latest: {
            type: Boolean, 
            required: true,
            default: true
        },
        details: {
            type: String,
            required: true
        },
        price: {
            type: Number,
        },
        coupon_allowed: [{
            coupon_name: {
                type: String,
            },
            discount_per: {
                type: Number
            },
            max_amt: {
                type: Number
            },
            active: {
                type: Boolean,
                default: false
            },
            featured: {
                type: Boolean
            }
        }],
        max_registrations:{
            type: Number,
        },
        registrations: {
            type: Number
        },
        collaborators: [{
            collaborator_name: {
                type: String,
            },
            collaborator_logo_link: {
                type: String
            },
            details: {
                type: String
            }
        }]

    })
)

module.exports = Events