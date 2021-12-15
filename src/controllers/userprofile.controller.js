const User = require('../models/user.model')
const UserProfile = require('../models/userprofile.model')

exports.getUserInfo = async (req, res) => {
    try {
        const userProfile = UserProfile.findOne({
            phoneNumber: req.body.phoneNumber
        })
        if(!userProfile){
            return res.status(404).json({ message: "User profile not found!" })
        }
        return res.status(200).json({ userProfile, message: "User Profile Found!" })
    } catch (error) {
        return res.status(500).json({ message: error, code: 500})
    }
}


exports.createProfile = async (req, res) => {
    try {
        let userprofile = await UserProfile.findOne({ phoneNumber: req.body.phoneNumber})
        if(userprofile){
            return res.status(400).json({ message: "User Profile already exists!", code: 400})
        }
        const userProfile = new UserProfile({
            phoneNumber: req.body.phoneNumber,
            username: req.body.username, 
            name: req.body.name, 
            age: req.body.age,
            gender: req.body.gender,
            dob: req.body.dob,
            address: req.body.address
        })
        await userProfile.save()
        return res.status(200).json({ message: "user Profile created!", code: 200})
    } catch (error) {
        return res.status(500).send({ message: error, code: 500 })
    }
}


exports.updateProfile = async (req, res) => {
    try {
        const userProfile = await UserProfile.findOne({ phoneNumber: req.body.phoneNumber })
        if(!userProfile){
            return res.status(404).json({ message: "User Profile doesn't Exist. Please First Create New User Profile", code: 404})
        }
        await UserProfile.findOneAndUpdate({ phoneNumber: req.body.phoneNumber }, 
            {
                $set: {
                    body: req.body
                }
            })
        return res.status(200).json({ message: "User Profile Updated!", code: 200})
    } catch (error) {
        return res.status(500).json({ message: error, code: 500 })
    }
}


exports.uploadProfilePic = async (req, res) => {

}