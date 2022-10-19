const {login, signup, isUsernameAvail, getUserById, getAllUsers} = require("../Services/auth.service")
const jwt = require("jsonwebtoken")
const lodash = require("loadash")
require("dotenv").config()

const apiLogin = async (req,res) => {
    const username = req.body.username
    const password = req.body.password
    try {
        const user = await login(username, password)
        if(!user)
            throw "user not found or wrong password"
        const {role, _id} = user
        const authToken = jwt.sign({id:_id, username, role}, process.env.SECRET, {expiresIn: "20m"})
        const refreshToken = jwt.sign({id:_id}, process.env.SECRET, {expiresIn: "4d"})
        res.json({success: true, authToken, refreshToken})
    } catch(err) {
        res.status(401).json({success: false, err})
    }
}

const apiSignup = async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const confPassword = req.body.confPassword
    try {
        if(!username || !isString(username))
            throw "username is not a valid string"
        if(!password || !isString(password))
            throw "password is not a valid string"
        if(!confPassword || !isString(confPassword))
            throw "confirm Password is not a valid string"
        if(password !== confPassword)
            throw "Passwords donot match"
        if(password.length < 6)
            throw "password should be atleast 6 chars long"
        const dupName = await isUsernameAvail(username)
        if(!dupName)
            throw "username is already registered. Choose a different one"
        const user = signup(username, password)
        if(!user)
            throw "internal error"
        res.status(201).json({success: true, msg: "Please login to continue"})
    } catch(err) {
        console.log(err)
        res.status(401).json({success: false, err})
    }
}

const apiLogout = async (req, res) => {
    const {token} = req.body
    try {
        if(!isString(token))
            throw "refresh token is not a valid string"
        // @todo invalidate the token
        else
            throw "invalid refresh token"
    } catch(err) {
        res.status(400).json({success: false, err})
    }
}

const apiUpdateToken = async (req, res) => {
    const {token} = req.body
    try {
        if(!isString(token))
            throw "refresh token is not a valid string"
        const {id} = jwt.verify(token, process.env.SECRET)
        const {username, role} = await getUserById(id)
        const authToken = jwt.sign({id, username, role}, process.env.SECRET, {expiresIn: "20m"})
        const refreshToken = jwt.sign({id}, process.env.SECRET, {expiresIn: "4d"})
        res.json({success: true, authToken, refreshToken})
    } catch(err) {
        res.status(400).json({success: false, err})
    }
}

const apiGetUsers = async () => {
    try {
        const users = await getAllUsers()
        if(!users)
            throw "users not found"
        res.json({success: true, users})
    } catch(err) {
        res.status(400).json({success: false, err})
    }
}

module.exports = {
    apiLogin, apiLogout, apiSignup, apiUpdateToken, apiGetUsers
}