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
    const salt = crypto.randomBytes(16).toString("hex")
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex")
    return {salt, hash}
}

const validPassword = (password, myHash, salt) => {
    let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex")
    return hash === myHash
}

module.exports = {
    User: mongoose.model("User", userSchema),
    makePassword,
    validPassword
}