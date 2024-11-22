const express = require("express")
const db = require("./utils/Db")
const userRouter = require("./routes/user.route")
const ownerrouter = require("./routes/owner.route")
const productrouter = require("./routes/product.route")
const cors = require("cors")
require("dotenv").config();

PORT = process.env.PORT || 8000
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())


app.use("/users", userRouter)
app.use("/owner", ownerrouter)
app.use("/product", productrouter)

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})