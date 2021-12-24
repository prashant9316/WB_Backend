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
            id: decoded._id,
            role: decoded.role
        }
        next();
    });
};

isAdmin = (req, res, next) => {
    const token = req.cookies.AuthToken
    if(!token){
        return res.status(403).send({ message: "No token provided" });
    }

    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
        if(err){
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.user = {
            id: decoded._id,
            role: decoded.role
        }
        console.log(req.user)
        if(req.user.role == 'admin'){
            next();
        }else {
            return res.status(401).json({message: "UnAuthorized Access", code: 401})
        }
    });
}

const authJwt = {
    verifyToken,
    isAdmin
};

module.exports = authJwt