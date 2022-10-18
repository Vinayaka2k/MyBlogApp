const mongoose = require("mongoose")
const crypto = require("crypto")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    hash: {
        type: String,
        required: "true"
    },
    salt: {
        type: String,
        required: "true"
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
})

const makePassword = (password) => {
    return password
}

const validPassword = (password) => {
    return true
}

module.exports = {
    User: mongoose.model("User", userSchema),
    makePassword,
    validPassword
}