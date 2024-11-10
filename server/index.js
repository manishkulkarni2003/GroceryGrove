const express = require("express")
const db = require("./utils/Db")
const userRouter = require("./routes/user.route")
require("dotenv").config();

PORT = process.env.PORT || 8000
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.get("/", (req, res) => {
    res.send("Hello World")
})
app.use("/users", userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})