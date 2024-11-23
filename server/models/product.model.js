const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner',  // Reference to the Owner model
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);