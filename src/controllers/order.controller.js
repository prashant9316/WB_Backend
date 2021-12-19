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
            return res.status(200).json({ orders: [] })
        }
        else {
            return res.status(200).json({ orders: userOrders })
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
        
        for(let i = 0; i < userCart.length; i++){
            let item = userCart[i];
            const userTrip = await UserTrips.findOne({ trip_id: item.trip_id })
            payment.total_cost = item.price * item.members;
            let discount_per = 0;
            let discount_amt = payment.total_cost*discount_per;
            payment.final_cost = payment.total_cost - discount_amt;
            console.log(item)
            let newUserOrder = new UserOrders({
                place: item.place,
                user_id: req.user.id,
                trip_id: item.trip_id,
                members: item.members,
                review: item.review,
                payment_id: payment.payment_id,
                trip_unique_id: userTrip._id,
                price: item.price,
                total_cost: payment.total_cost,
                discount_per,
                discount_amt,
                final_cost: payment.final_cost 
            })
            console.log(newUserOrder)
            payment.total_payment += payment.final_cost
            payment.all_order_ids.push(newUserOrder.order_id);
            await newUserOrder.save()
        }
        const amount = (payment.total_payment * 100).toString();
        const currency = 'INR';

        const options = {
            amount,
            currency,
            receipt: shortid.generate()
        }
        if(amount == 0){
            return res.status(404).json({ message: "Cart is Empty!", code: 404 });

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
            newPayment.order_ids.push({ order_id: payment.all_order_ids[i] })
        }
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


exports.verifyPayment = async(req, res) => {
    try {
        const crypto = require('crypto')
        const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_TEST_API_SECRET)
        const digest = shasum.digest('hex')
        if(req.headers['x-razorpay-signature'] === digest ){
            order = req.body.payload.payment.entity;
            console.log("Successfull payment!");
            console.log(order)
            await UserPayments.findOneAndUpdate({ razorpay_order_id: order.order_id}, {$set: {
                payment_status: true,
                payement_id: order.id
            }})
            await UserOrders.findByIdAndUpdate({ razorpay_order_id: order.order_id }, { 
                payment_id: order.id,
                payment_status: true
            })
            await UserCart.deleteMany({ user_id: req.user.id });
            return res.status(200).json({ message: "Successful!" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error, code: 500 })
    }
}


exports.cancelTrip =async(req, res) => {
    try {
        throw "Illegal Action Error!"
        return res.status(200).json({ message: "Method NOt Support from Cart!", code: 200 })
    } catch (error) {
        return res.status(500).json({ message: error, code: 500 })
    }
}

