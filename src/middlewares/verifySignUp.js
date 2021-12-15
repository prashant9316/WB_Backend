const User = require('../models/user.model')

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if(err) {
            res.status(500).send({ message: err });
            return;
        }
        if(user) {
            res.status(400).send({ message: "Failed USername is already in use!" });
            return;
        }
    })

    // Email
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if(err) {
            return res.status(500).send({ message: err })
        }
        if(user) {
            return res.status(400).send({ message: "Failed! Username is already in use!" })
        }
    })

    next()
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail
}

module.exports = verifySignUp