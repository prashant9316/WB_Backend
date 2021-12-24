const User = require('../models/user.model')
const UserOtp = require('../models/userotp.model');
const { otpService, jwtService, smsService } = require('../services');

exports.checkLogin = async(req, res) => {
    return res.status(200).json({ message: "user logged in"})
}

exports.sendOtp = async(req, res) => {
    try {
        const user = await User.findOne({
            phoneNumber: req.body.phoneNumber
        })
        const otp = otpService.generateOtp(6)
        req.data = {
            otp,
            phoneNumber: req.body.phoneNumber
        }
        const sms_otp = smsService.sendOTP(req)
        // User does not exists 
        if(!user){
            const newUser = new User({
                phoneNumber: req.body.phoneNumber,
                username: req.body.username
            })
            const newOtp = new UserOtp({
                phoneNumber: req.body.phoneNumber,
                otp: otp
            })
            await newUser.save()
            await newOtp.save()
            return res.status(200).json({ message: "otp sent", code: 200})
        } else {
            const otpExist = await UserOtp.findOne({
                phoneNumber: req.body.phoneNumber
            })
            if(otpExist){
                await UserOtp.findOneAndUpdate({ phoneNumber: req.body.phoneNumber}, 
                    {
                        $set: {
                            otp: otp
                        }
                    })
                return res.status(200).json({ message: "otp sent", code: 200 })      
            } 
            const newOtp = new UserOtp({
                phoneNumber: req.body.phoneNumber,
                otp: otp
            })
            await newOtp.save()
            return res.status(200).json({ message: "OTP Sent", code: 200 })
             
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error, code: 500 })
    }
}


exports.login = async(req, res) => {
    const token = await jwtService.generateJwt(req)
    return res.status(200).json({ message: "login successful", AuthToken: token, code: 200 })
}