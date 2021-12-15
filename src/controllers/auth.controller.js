const User = require('../models/user.model')

let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username, 
        email: req.body.email,
        paassword: bcrypt.hashSync(req.body.paassword, 8)
    })

    user.save((err, user) => {
        if(err){
            res.status(500).send({ message: err })
            return;
        }
        res.send("New User is registered successfully!");
    })
}

exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username
    })
    .exec((err, user) => {
        if(err){
            res.status(500).send({ message: err })
            return;
        }
        if(!user) {
            return res.status(404).send({ message: "User not Found!" });
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )
        if(!passwordIsValid){
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            })
        };
        
        var token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_TOKEN , {
            expiresIn: 86400
        });

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            accessToken: token
        })
    })
}

exports.isloggedin = (req,res) => {
    let token = req.headers["x-access-token"];
    if(!token){
        return res.status(200).send({ message: "Not logged in", status: false})
    }
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
        if(err){
            return res.status(401).send({ message: "Unauthorized!" })
        }
        req.user = {
            id: decoded.id,
            role: decode.role
        }
        User.findOne({
            username: req.body.username
        })
        .exec((err, user) => {
            if(err){
                return res.status(400).send({ message: err })
            }
            return res.status(200).send({ message: "logged in", status: true, user: user })
        })
    })
}