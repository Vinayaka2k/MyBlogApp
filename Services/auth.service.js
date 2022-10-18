const {User, makePassword, validPassword} = require("../Models/auth.model")

const login = (username, password) => {
    try {
        const user = await User.findOne({username})
        if(user === null)
            throw "user not found"
        else {
            const 
            if(validPassword(password, hash, salt))
                return user
            else
                throw "wrong password"
        }
    } catch(err) {
        console.log(err)
        return false
    }
}

const signup = () => {

}

const isUsernameAvail = () => {
    
}

const getUserById = () => {

}

const getAllUsers = () => {

}

module.exports = {

}