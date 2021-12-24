const SMS_API_KEY = process.env.SMS_API_KEY
const request = require('request')

exports.sendOTP = (req) => {
    let otp = req.data.otp;
    console.log("OTP is: " + otp)
    let number = `+91${req.data.phoneNumber}`
    console.log("Number = " + number)
    let url = `http://2factor.in/API/V1/${SMS_API_KEY}/SMS/${number}/${otp}`
    request(url, { json: true }, (err, res, body) => {
        if (err) { 
            console.log(err)
            return res.status(500).send({ message: err }); }
        console.log(body);
    });
}