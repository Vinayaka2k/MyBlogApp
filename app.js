const express = require("express")
const mongoose = require("mongoose")
const logger = require("morgan")
const cors = require("cors")
const path = require("path")
require("dotenv").config()

const BlogRoutes = require("./Routes/blog.routes")
const AuthRoutes = require("./Routes/auth.routes")

const app = express()

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB")
}).catch(err => {
    console.log("Connection failed with error: ", err)
}) 

// app.use(express.static(path.resolve(__dirname, "./views/build")))
app.use(express.json())
app.use(logger("dev"))
app.use(cors())

app.use("/auth", AuthRoutes)
app.use("/api", BlogRoutes)

// app.get("/", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "./views/build", "index.html"))
// })

// app.use((req, res) => {
//     res.redirect("/")
// })

module.exports = app