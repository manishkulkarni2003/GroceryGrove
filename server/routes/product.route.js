const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer"); // Adjust the path to your multer config
const { createProduct } = require("../controllers/product.controller");

// Use the field name "image" for file upload
router.post("/products", upload.single("image"), createProduct);

module.exports = router;
