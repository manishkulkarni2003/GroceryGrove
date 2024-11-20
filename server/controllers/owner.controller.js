const Owner = require("../models/owner.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

const registerOwner = async (req, res) => {
    try {
        const { fullname, email, password, contact } = req.body;

        // Check for missing fields
        if (!fullname || !email || !password || !contact) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if owner already exists
        const existedOwner = await Owner.findOne({ email: email });
        if (existedOwner) {
            return res.status(400).json({ message: "Owner already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create new owner
        const owner = await Owner.create({
            fullname,
            email,
            contact,
            password: hash
        });

        // Generate a token
        const token = generateToken(owner);

        // Send the response
        return res.status(201).json({ message: "Owner created successfully", token });
    } catch (err) {
        console.error("Error while creating the owner:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

const loginOwner = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the owner by email
        const owner = await Owner.findOne({ email: email });
        if (!owner) {
            return res.status(400).json({ message: "Email not found" });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, owner.password);
        if (isMatch) {
            // Generate a token
            const token = generateToken(owner);

            // Send the response with the token
            res.cookie("token", token);
            return res.status(200).json({ message: "Owner logged in successfully", token });
        } else {
            return res.status(400).json({ message: "Email or password is incorrect" });
        }
    } catch (err) {
        console.error("Error during owner login:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
const logoutOwner = async function (req, res) {
    res.cookie("token", "");
    res.redirect("/")

}

module.exports = { registerOwner, loginOwner, logoutOwner };
