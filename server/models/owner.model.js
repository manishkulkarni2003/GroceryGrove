const mongoose = require("mongoose")

const ownerSchema = new mongoose.Schema({

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
    products: {
        type: Array,
        default: []
    },
    picture: {
        type: String,

    },
    contact: {
        type: Number,
        required: true
    }



}, { timestamps: true })

module.exports = mongoose.model("Owner", ownerSchema)