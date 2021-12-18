const User = require('../models/user.model')
const UserProfile = require('../models/userprofile.model')
const shortid = require('shortid')

exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id })
        const userProfile = await UserProfile.findOne({
            phoneNumber: user.phoneNumber
        })
        if(!userProfile){
            return res.status(200).json({ message: "User profile not found!", userProfile: {name: 'User'} })
        }
        return res.status(200).json({ userProfile: userProfile, message: "User Profile Found!", code: 200 })
    } catch (error) {
        console.log(error)

        return res.status(500).json({ message: error, code: 500})
    }
}


exports.createProfile = async (req, res) => {
    try {
        let userprofile = await UserProfile.findOne({ phoneNumber: req.body.phoneNumber})
        if(!userprofile){
            return res.status(400).json({ message: "User Profile already exists!", code: 400})
        }
        const userProfile = new UserProfile({
            phoneNumber: req.body.phoneNumber,
            username: req.body.username, 
            name: req.body.name, 
            age: req.body.age,
            gender: req.body.gender,
            dob: req.body.dob,
            address: req.body.address,
            email: req.body.email
        })
        await userProfile.save()
        return res.status(200).json({ message: "user Profile created!", code: 200})
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error, code: 500 })
    }
}


exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id })
        const userProfile = await UserProfile.findOne({ phoneNumber: req.body.phoneNumber })
        if(!userProfile){
            console.log(req.body)
            let username = req.body.name + "-" + shortid.generate()
            const userProfile = new UserProfile({
                username, 
                name: req.body.name, 
                age: req.body.age,
                gender: req.body.gender,
                dob: req.body.dob,
                email: req.body.email,
                phoneNumber: user.phoneNumber
            })
            await userProfile.save()
            return res.status(200).json({ message: "User Profile created successfully!", code: 200 })
        }
        await UserProfile.findOneAndUpdate({ phoneNumber: req.body.phoneNumber }, 
            {
                $set: {
                    body: req.body
                }
            })
        return res.status(200).json({ message: "User Profile Updated!", code: 200})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error, code: 500 })
    }
}


exports.uploadProfilePic = async (req, res) => {

}