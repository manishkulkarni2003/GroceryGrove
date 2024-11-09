const express = require("express")


require("dotenv").config();

PORT = process.env.PORT || 8000
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})