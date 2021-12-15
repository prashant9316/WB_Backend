const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

verifyToken = (req, res, next) => {
    // let token = req.headers["AuthToken"];
    const token = req.cookies.AuthToken
    if(!token){
        return res.status(403).send({ message: "No token provided" });
    }

    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
        if(err){
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.user = {
            id: decoded.id,
            role: decoded.role
        }
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findById(req.user.id).exec((err, user) => {
        if(err) {
            res.status(500).send({ message: err })
            return;
        }

        if(req.user.role == 'admin'){
            next();
        } else {
            return res.status(401).send({ message: "Unauthorized!" });
        }
    })
}

const authJwt = {
    verifyToken,
    isAdmin
};

module.exports = authJwt