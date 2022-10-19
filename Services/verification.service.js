const jwt = require("jsonwebtoken")
require("dotenv").config()

const isAuthenticated = async (req, res, next) => {
    try {
        if(!req.headers.authorization)
            throw "authorization header not available"
        if(!(req.headers.authorization.split(' ')[0] === "Bearer"))
            throw "bearer token not available"
        const authToken = req.headers.authorization.split(" ")[1]
        const user = jwt.verify(authToken, process.env.SECRET)
        if(!user)
            throw "invalid token! try to login again"
        const {username, role, id} = user
        req.user = {username, role, id}
        next()
    } catch(err) {
        res.status(401).json({success: false, err})
    }
}

const isAuthorized = async (req, res, next) => {
    try {
        if(req.user.role !== "admin")
            throw "unauthorized user!"
    } catch(err) {
        res.status(403).json({success: false ,err})
    }
}

module.exports = {
    isAuthenticated, isAuthorized
}