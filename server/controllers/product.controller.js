const Product = require("../models/product.model");
const { uploadOnCloudinary } = require("../utils/cloudinary");


const createProduct = async (req, res) => {
    try {
        const imageLocalPath = req.file?.path;
        if (!imageLocalPath) {
            return res.status(400).json({ message: "No image file provided" });
        }

        const { name, price } = req.body;

        const itemImage = await uploadOnCloudinary(imageLocalPath); // Use the correct function
        if (!itemImage) {
            throw new Error("Item image upload to Cloudinary failed");
        }

        const product = await Product.create({
            name,
            price,
            image: itemImage.secure_url, // Extract the URL from the Cloudinary response
        });

        return res.status(200).json({ message: "Uploaded the item", product });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

module.exports = { createProduct };

