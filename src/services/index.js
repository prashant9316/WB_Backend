const emailService = require('./email.service')
const otpService = require('./otp.service')
const s3Service = require('./otp.service')
const smsService = require('./sms.service')
const jwtService = require('./jwt.service')

module.exports = {
    emailService,
    otpService,
    s3Service,
    smsService,
    jwtService
}