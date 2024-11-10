const User = require("../models/user.model")
const mongoose = require("mongoose")


//creating a Register function fro the user 

const registerUser = async (req, res) => {

    const { fullname, email, password, address, contact } = req.body;


    const existedUser = await User.find({
        email: email
    })
    if (existedUser.length > 0) {
        return res.status(400).send({ message: "User Already exits" })

    }

    const user = await User.create({
        fullname,
        email,
        password,
        address,
        contact
    })

    return res.status(200)
        .send({ message: "User Created Successfully", user })

}

module.exports = { registerUser };