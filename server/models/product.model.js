const mongoose = require("mongoose")

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
    }




}, {
    timestamps: true
})

module.export = mongoose.model("Product", productSchema)