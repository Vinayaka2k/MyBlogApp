import decode from "jwt-decode"
import useAuth from "./useAuth"

export default () => {
    const auth = useAuth()
    try {
        if(auth) {
            const authToken = localStorage.getItem("authToken")
            const {role} = decode(authToken)
            return role === "admin"
        }
    } catch(err) {
        return false
    }
}