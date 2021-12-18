const User = require('../models/user.model')
const UserCart = require('../models/usercart.model');
const userTrips = require('../models/trips.model')

exports.getUserCart = async (req, res) => {
    try {
        const userCart = await UserCart.find({ user_id: req.user.id })
        if (!userCart) {
            return res.status(200).json({ cart: [], message: "empty cart!", code: 200 })
        }
        else {
            return res.status(200).json({ cart: userCart, code: 200 })
        }
    } catch (err) {
        return res.status(500).json({ message: err, code: 500 })
    }
}


exports.addToCart = async (req, res) => {
    try {
        const userTrip = await userTrips.findOne({ trip_id: req.body.trip_id })
        if(!userTrip){
            return res.status(404).json({ message: "Trip is not active yet!", code: 404 })
        }
        let total_cost = userTrip.trip_price * req.body.members;
        let discount_per = 0;
        let discount_amt = total_cost * discount_per;
        let final_cost = total_cost - discount_amt;
        const newUserCart = new UserCart({
            user_id: req.user.id,
            trip_id: req.body.trip_id,
            members: req.body.members,
            review: req.body.review,
            price: userTrip.trip_price,
            place: userTrip.place,
            total_cost,
            discount_per,
            discount_amt,
            final_cost
        })
        await newUserCart.save()
        return res.status(200).json({ message: "Item Added to cart", code: 200 })
    } catch (error) {
        return res.status(500).json({ message: error, code: 500 })
    }
}


exports.removeFromCart = async (req, res) => {
    try {
        const userCartItem = await UserCart.findOne({ user_id: req.user.id, _id: req.body.trip_unique_id })
        if (!userCartItem) {
            return res.status(404).json({ message: "Item does not exist in Cart", code: 404 })
        }
        await UserCart.deleteOne({ user_id: req.user.id, _id: req.body.trip_unique_id })
        return res.status(200).json({ message: "Trip removed from Cart!", code: 200 })
    } catch (error) {
        return res.status(500).json({ message: error, code: 500 })
    }
}


exports.emptyCart = async (req, res) => {
    try {
        await UserCart.deleteMany({ user_id: req.user.id })
        return res.status(200).json({ message: "Cart Cleared!", code: 200 })
    } catch (error) {
        return res.status(500).json({ message: error, code: 500 })
    }
}


exports.updateCart = async (req, res) => {
    try {
        const userCart = await UserCart.findOne({ user_id: req.user.id, _id: req.body.trip_unique_id })
        if (!userCart) {
            return res.status(401).json({ message: "Illegal Action", code: 401 })
        }
        if (req.body.members) {
            const userTrip = await userTrips.findOne({ trip_id: userCart.trip_id })
            if(!userTrip){
                return res.status(404).json({ message: "Trip is not active yet!", code: 404 })
            }
            const trip_price = userTrip.trip_price;
            let totalcost = trip_price * req.body.members;
            let discount_per = userCart.discount_per;
            let discount_amt = totalcost * discount_per;
            let final_cost = totalcost - discount_amt;
            const updatedUser = await UserCart.findOneAndUpdate({ user_id: req.user.id, _id: req.body.trip_unique_id },
                {
                    $set: {
                        members: req.body.members,
                        final_cost,
                        total_cost: totalcost
                    }
                }, {new: true})
                return res.status(200).json({ message: "Cart Updated!", code: 200 })
        } else {
            return res.status(401).json({ message: "Unauthorized Action", code: 401})
        }
    } catch (error) {
        return res.status(500).json({ message: error, code: 500 })
    }
}