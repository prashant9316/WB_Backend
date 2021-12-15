const User = require('../models/user.model')

checkDuplicatePhoneNumber = (req, res, next) => {
    User.findOne({
        phoneNumber: req.body.phoneNumber
    }).exec((err, user) => {
        if(err) {
            return res.status(500).send({ message: err });
        }
        if(user){
            return res.status(400).send({ message: err })
        }
    })
}