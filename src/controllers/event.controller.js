const Events = require('../models/event.model')

exports.getAllEvents = async(req, res) => {
    try {
        const events = await Events.find({})
        if(!events) {
            return res.status(200).json({ events: [] , code: 200})
        }
        return res.status(200).json({ events: events , code: 200})
    } catch (err) {
        return res.status(500).json({message: err, code: 500})
    }
}

exports.getEvent = async(req, res) => {
    try {
        const event = await Events.findOne({ slug: req.params.slug })
        if(!event){
            return res.redirect('/')
        } else {
            return res.status(200).json({ event })
        }
    } catch (error) {
        return res.redirect('/events')
    }
}

exports.newEvent = async(req, res) => {
    console.log(req.body);
    try {
        const newEvent = new Events({
            event_title: req.body.event_name,
            active: req.body.event_status,
            event_tagline: req.body.tagline,
            registrations: 0,
            event_video_link: req.body.video_link,
            event_about: req.body.event_about,
            event_where: req.body.event_venue,
            event_time: req.body.event_time,
            event_days: req.body.event_days,
            event_places: [],
            itenary: {
                nodays: req.body.nodays,
                schedule: []
            },
            tickets: [],
            event_contact: {
                address: req.body.contact_address,
                mobile_number: req.body.contact_number,
                email: req.body.contact_email
            },
            max_registrations: req.body.max_registrations,
            event_banner_link: req.body.banner_link
        })
        await newEvent.save()
        return res.status(200).json({ message: "New Event Created!", code: 200})
    } catch (err) {
        return res.status(500).json({message: err, code: 500})
    }
}

exports.updateEvent = async(req, res) => {
    try {
        await Events.findOneAndUpdate({ event: req.params.event}, {$set: {
            event_name: req.body.event_name,
            event_banner_link: req.body.event_banner_link,
            featured_destination: req.body.destination,
            latest: req.body.is_latest,
            details: req.body.event_details,

        }})
    } catch (err) {
        return res.status(500).json({message: err, code: 500})
    }
}

exports.activateEvent = async(req, res) => {
    try {
        await Events.findOneAndUpdate({ event_id: req.params.event}, {$set: {
            active: true
        }})
        return res.status(200).json({message: "Activated the event", code: 200})
    } catch (err) {
        return res.status(500).json({message: err, code: 500})
    }
}

exports.deactivateEvent = async(req, res) => {
    try {
        await Events.findOneAndUpdate({ event_id: req.params.event}, {$set: {
            active: false
        }})
        return res.status(200).json({message: "Deactivated the event", code: 200})
    } catch (err) {
        return res.status(500).json({message: err, code: 500})
    }
}

exports.getAllCoupons = async(req, res) => {
    try {
        const event = await Events.findOne({ event_id: req.params.event })
        return res.status(200).json({ coupons: event.coupon_allowed, code: 200 })
    } catch (err) {
        return res.status(500).json({message: err, code: 500})
    }
}

exports.addCoupon = async(req, res) => {
    try {
        const event = await Events.findOne({ event: req.params.event })
        coupon_allowed = event.coupon_allowed;
        coupon_allowed.push({
            coupon_name: req.body.coupon_name,
            max_amt: req.body.discount_amount,
            featured: req.body.featured,
            active: req.body.status,
            discount_per: req.body.discount_percent
        })
        console.log(coupon_allowed)
        await Events.findOneAndUpdate({event: req.params.event}, {$set: {
            coupon_allowed
        }}) 
        return res.status(200).json({ message: "Added new coupon", code: 200})
    } catch (err) {
        return res.status(500).json({message: err, code: 500})
    }
}

exports.activateCoupon = async(req, res) => {
    try {
        const event = await Events.findOne({ event: req.params.event })
        let coupon_allowed= event.coupon_allowed
        for(let i=0; i < coupon_allowed.length; i++){
            if(coupon_allowed[i].coupon_name == req.params.coupon_name){
                coupon_allowed[i].active = true;
            }
        }
        await Events.findOneAndUpdate({event: req.params.event}, {$set: {
            coupon_allowed: coupon_allowed
        }})
        return res.status(200).json({ message: "Event Coupon Activated!", code: 200})
    } catch (err) {
        return res.status(500).json({message: err, code: 500})
    }
}

exports.deactivateCoupon = async(req, res) => {
    try {
        const event = await Events.findOne({ event: req.params.event })
        coupon_allowed= event.coupon_allowed
        for(let i=0; i < coupon_allowed.length; i++){
            if(coupon_allowed[i].coupon_name == req.params.coupon_name){
                coupon_allowed[i].active = false
            }
        }
        await Events.findOneAndUpdate({event: req.params.event}, {$set: {
            coupon_allowed: coupon_allowed
        }})

        return res.status(200).json({ message: "Event Coupon Deactivated!", code: 200})
    } catch (err) {
        return res.status(500).json({message: err, code: 500})
    }
}
