const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { createProduct, getSellerProducts, getAllProducts } = require("../controllers/product.controller");

router.post("/products", upload.single("image"), createProduct);
router.get("/seller/products/:sellerId", getSellerProducts);
router.get("/products", getAllProducts);  // New route for all products

module.exports = router;