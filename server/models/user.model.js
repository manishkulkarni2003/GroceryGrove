const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],
    orders: {
        type: Array,
        default: []
    },
    contact: {
        type: Number,

    },
    address: {
        type: String,

    }




}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)