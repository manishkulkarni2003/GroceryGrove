const Product = require("../models/product.model");
const { uploadOnCloudinary } = require("../utils/cloudinary");

const createProduct = async (req, res) => {
    try {
        const imageLocalPath = req.file?.path;
        if (!imageLocalPath) {
            return res.status(400).json({ message: "No image file provided" });
        }

        const { name, price, ownerId } = req.body; // Get ownerId from request body instead of req.user

        if (!ownerId) {
            return res.status(400).json({ message: "Owner ID is required" });
        }

        const itemImage = await uploadOnCloudinary(imageLocalPath);
        if (!itemImage) {
            throw new Error("Item image upload to Cloudinary failed");
        }

        const product = await Product.create({
            name,
            price,
            image: itemImage.secure_url,
            owner: ownerId // Assign the owner ID from request body
        });

        return res.status(201).json({
            message: "Product created successfully",
            product
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};

const getSellerProducts = async (req, res) => {
    try {
        const sellerId = req.params.ownerId;
        const products = await Product.find({ owner: sellerId })
            .populate('owner', 'name email') // Populate owner details
            .sort({ createdAt: -1 });

        return res.status(200).json({ products });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
            .populate('owner', 'name email')
            .sort({ createdAt: -1 });

        return res.status(200).json({ products });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};

module.exports = { createProduct, getSellerProducts, getAllProducts };
