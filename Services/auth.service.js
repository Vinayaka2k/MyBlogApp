const {User, makePassword, validPassword} = require("../Models/auth.model")

const login = async (username, password) => {
    try {
        const user = await User.findOne({username})
        if(user === null)
            throw "user not found"
        else {
            const {salt,hash} = user
            if(validPassword(password, hash, salt)) {
                return user
            
            }
            else
                throw "wrong password"
        }
    } catch(err) {
        console.log(err)
        return false
    }
}

const signup = async (username, password, role) => {
    try {
        let newUser = new User()
        newUser.username = username
        newUser.role = role
        const {hash,salt} = makePassword(password)
        newUser.hash = hash
        newUser.salt = salt
        let userRes = await newUser.save()
        console.log("NEW USER", userRes)
        return userRes
    } catch(err) {
        console.log(err)
        return false
    }
}

const isUsernameAvail = async (username) => {
    try {
        const user = await User.findOne({username})
        // console.log(user)
        return user === null
    } catch(err) {
        console.log(err)
        return false
    }
}

const getUserById = async (id) => {
    try {
        const user = await User.findById(id)
        return user === null ? false : user
    } catch(err) {
        console.log(err)
        return false
    }
}

const getAllUsers = async () => {
    try {
        const users = await User.find({role: 'user'})
        return users ? users : false
    } catch(err) {
        console.log(err)
        return false
    }
}

module.exports = {
    login, signup, isUsernameAvail, getAllUsers, getUserById
}