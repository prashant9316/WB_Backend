const UserPayment = require('./../models/userpayments.model')
const UserCart = require('./../models/usercart.model')

const createPayment = async(req) => {
    try {
        const userCart = await UserCart.find({ user_id: req.user.id })    
        if(!userCart){
            return res.status(404).json({ message: "Cart Not Found!", code: 404 })
        }
    } catch (error) {
        return res.status(500).json({ message: error, code: 500})
    }
}

module.exports = createPayment