const UserOtp = require('./../models/userotp.model')

const verifyOtp = async(req, res, next) => {
    try {
        console.log(req.body)
        const userOtp = await UserOtp.findOne({
            phoneNumber: req.body.phoneNumber
        })
        if(userOtp) { 
            if(userOtp.otp == req.body.otp){
                await UserOtp.findOneAndDelete({ phoneNumber: req.body.phoneNumber })
                next()
            } else {
                return res.status(401).json({ message: "Incorrect OTP", code: 401})
            }
        } else {
            return res.status(404).json({ message: "Error Occured while Logging in!", code: 404 })
        }
    } catch (error) {
        return res.status(500).json({ message: error, code: 500 })
    }
}

const verifyLogin = {
    verifyOtp
}

module.exports = verifyLogin