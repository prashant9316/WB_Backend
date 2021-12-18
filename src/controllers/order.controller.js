const UserCart = require('../models/usercart.model')
const UserOrders = require('../models/userorder.model')
const UserPayments = require('../models/userpayments.model')
const shortid = require('shortid')
const Razorpay = require('razorpay')
const UserTrips = require('./../models/trips.model')

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_TEST_KEY_ID,
    key_secret: process.env.RAZORPAY_TEST_KEY_SECRET
})

exports.getUserOrders = async(req, res) => {
    try {
        const userOrders = await UserOrders.find({ user_id: req.user.id })
        if(!userOrders){
            return res.status(200).json({ cart: [] })
        }
        else {
            return res.status(200).json({ cart: userOrders })
        }
    } catch (err) {
        return res.status(500).json({ message: err, code: 500 })
    }
}


exports.getUserOrder = async(req, res) => {
    try {
        const userOrder = await UserOrders.find({ user_id: req.user.id, order_id: req.body.order_id })
        if(!userOrder){
            return res.status(200).json({ order: {}, code: 404 })
        }
        else {
            return res.status(200).json({ order: userOrder, code: 200 })
        }
    } catch (err) {
        return res.status(500).json({ message: err, code: 500 })
    }
}

exports.createOrder =async(req, res) => {
    try {
        const userCart = await UserCart.find({ user_id: req.user.id })
        if(!userCart){
            return res.status(404).json({ message: "Cart is Empty!", code: 404 });
        }
        const payment = {
            total_payment: 0,
            total_cost: 0,
            final_cost: 0,
            all_order_ids: [],
            payment_id: shortid.generate()
        }
        // var total_payment;
        // var total_cost;
        // let final_cost;
        // let all_order_ids = [];
        // let payment_id = shortid.generate();
        console.log(userCart)
        for(let i = 0; i < userCart.length; i++){
            let item = userCart[i];
            const userTrip = await UserTrips.findOne({ trip_id: item.trip_id })
            payment.total_cost = item.price * item.members;
            let discount_per = 0;
            let discount_amt = payment.total_cost*discount_per;
            payment.final_cost = payment.total_cost - discount_amt;
            let newUserOrder = new UserOrders({
                user_id: req.user.id,
                trip_id: item.trip_id,
                members: item.members,
                review: item.review,
                payment_id: payment.payment_id,
                trip_unique_id: userTrip._id,
                price: item.price,
                total_cost: payment.total_cost,
                place: item.place,
                discount_per,
                discount_amt,
                final_cost: payment.final_cost 
            })
            payment.total_payment += payment.final_cost
            console.log("total_cost:"+payment.total_cost)
            console.log("final_cost: "+payment.final_cost)
            payment.all_order_ids.push(newUserOrder.order_id);
            await newUserOrder.save()
        }
        console.log(payment.total_cost);
        console.log(payment.final_cost);
        const amount = (payment.total_payment * 100).toString();
        const currency = 'INR';

        const options = {
            amount,
            currency,
            receipt: shortid.generate()
        }

        const response = await razorpay.orders.create(options);
        const newPayment = new UserPayments({
            payment_order_id: response.id,
            receipt_id: response.receipt,
            user_id: req.user.id,
            order_ids: [],
            payment_amt: payment.total_payment
        })
        for(let i = 0; i < payment.all_order_ids.length; i++){
            console.log(payment.all_order_ids[i])
            newPayment.order_ids.push({ order_id: payment.all_order_ids[i] })
        }
        console.log(newPayment)
        await newPayment.save();

        await UserOrders.updateMany({ user_id: req.user.id }, {
            $set: { payment_order_id: newPayment.payment_order_id }
        })

        return res.status(200).json({ message: "Order Created! Ready for payment", order_id: newPayment.payment_order_id, code: 200 })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error, code: 500 })
    }
}


exports.getPaymentDetails = async(req, res) => {
    try {
        const userPayment = await UserPayments.findOne({ payment_order_id: req.params.id })
        if(!userPayment){
            return res.status(404).json({ message: "No Records found for the given Transaction!", code: 404 })
        }
        data = {
            amount: userPayment.payment_amt,
            order_id: userPayment.payment_order_id,
            currency: "INR",
            razorpay_key: process.env.RAZORPAY_TEST_KEY_ID,
            
        }
        return res.status(200).json({ code: 200, data })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error, code: 500 })
    }
}

exports.cancelTrip =async(req, res) => {
    try {
        const userCartItem = await UserCart.findOne({ user_id: req.user.id, _id: req.body.trip_unique_id })
        if(!userCartItem){
            return res.status(404).json({ message: "Item does not exist in Cart", code: 404 })
        }
        await UserCart.deleteOne({ user_id: req.user.id, _id: req.body.trip_unique_id })
        return res.status(200).json({ message: "Trip removed from Cart!", code: 200 })
    } catch (error) {
        return res.status(500).json({ message: error, code: 500 })
    }
}

