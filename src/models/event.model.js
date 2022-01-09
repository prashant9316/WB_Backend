const mongoose = require('mongoose');
const slugify = require('slugify');

const Events = 
    new mongoose.Schema({
        slug: {
            type: String,
            required: true,
            unique: true
        },
        event_id: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true,
            required: true,
        },
        event_title: {
            type: String,
            required: true,
        },
        event_banner_link: {
            type: String,
        },
        active: {
            type: Boolean, 
            required: true
        },
        event_tagline: {
            type: String,
            required: true
        },
        event_video_link: {
            type: String,
            required: true
        },
        event_about: {
            type: String
        },
        event_where: {
            type: String,
        },
        event_time: {
            type: String
        },
        event_days: {
            type: String
        },
        event_places: [{
            place_name: String,
            place_about: String,
            place_image: String
        }],
        itenary: {
            nodays: Number,
            schedule: [{
                day: Number,
                list: [{
                    time: String,
                    activity: String,
                    about_acitivity: String,
                    activity_detail: String
                }]
            }]
        },
        image_gallery: [{
            image_link: String
        }],
        collaborators: [{
            collaborator_logo: String,
            name: String,
            website_link: String
        }],
        faq: [{
            question: String,
            answer: String
        }],
        tickets: [{
            ticket_type: String,
            ticket_price: Number,
            ticket_benefits: [{
                benifits_given: String,
            }],
            missing_out: [{
                benifits_not_give: String
            }]
        }],
        event_contact: {
            address: String,
            mobile_number: String,
            email: String
        },
        coupons: [{
            coupon_name: String,
            discount_per: Number,
            max_discount: Number,
            active: Boolean,
            featured: Boolean
        }],
        registrations: {
            type: Number,
            default: 0
        },
        max_registrations: {
            type: Number,
            default: 10 
        }
    })

Events.pre('validate', function(next){
    if(this.event_title){
        this.slug = slugify(this.event_title, { lower: true, strict: true })
    }
    next();
})

module.exports = mongoose.model('Events', Events)