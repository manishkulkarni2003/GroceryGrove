const mongoose = require("mongoose")

require("dotenv").config()

const MONGO_URI = process.env.MONGO_URI;

mongoose.
    connect(MONGO_URI)
    .then(
        () => {
            console.log("MOngoDb connected")
        }
    )
    .catch((error) => {
        console.log("Error in connecting to Db", error)
    })

module.exports = mongoose.connection;