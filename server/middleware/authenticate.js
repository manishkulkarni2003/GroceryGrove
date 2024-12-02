const jwt = require("jsonwebtoken");
const User = require("../models/user.model"); // Adjust path to your User model

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        // Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user exists in the database
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Attach user information to the request object
        req.user = { id: user._id, email: user.email }; // Include additional fields if needed
        next(); // Proceed to the next middleware
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(403).json({ message: "Token expired. Please log in again." });
        }
        return res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = authenticate;
