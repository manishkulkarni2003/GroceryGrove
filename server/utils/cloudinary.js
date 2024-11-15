const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload Function
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: 'auto' });
        console.log("File uploaded to Cloudinary");
        fs.unlinkSync(localFilePath); // Optional: remove the local file
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // Clean up the local file if the upload fails
        console.log("Error while uploading file to Cloudinary", error);
        return null;
    }
};

module.exports = { uploadOnCloudinary };
