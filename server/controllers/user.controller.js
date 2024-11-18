const User = require("../models/user.model")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const { generateToken } = require("../utils/generateToken")



//creating a Register function fro the user 

const registerUser = async (req, res) => {
    try {


        const { fullname, email, password } = req.body;
        if (!fullname || !email || !password) {
            res.status(300).json({ message: "All fields are required" })
        }

        const existedUser = await User.find({
            email: email
        })
        if (existedUser.length > 0) {
            return res.status(400).send({ message: "User Already exits" })

        }

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message)
                else {
                    const user = await User.create({
                        fullname,
                        email,
                        password: hash,

                    })
                    const token = generateToken(user)
                    res.cookie("token", token)
                    return res.status(200)
                        .send({ message: "User Created Successfully", user })
                }
            })
        })




    } catch (err) {
        console.log(err.message, "error While Creating the User")
    }

}
const loginUser = async function (req, res) {
    let { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user)
        return res.send("Email or password is incorrect");


    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            const token = generateToken(user);
            res.cookie("token", token);
            return res.status(200).json({ message: "USer Logged in Successfully", user: user });
            // res.send("User logged in Successfully");
        }
        else {
            res.json({ message: "Email or password is incorrect" });


        }

    })
}
const logoutUser = async function (req, res) {
    res.cookie("token", "");
    res.redirect("/")

}


module.exports = { registerUser, loginUser, logoutUser };