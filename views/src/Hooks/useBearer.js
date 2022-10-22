import axios from "axios"
import decode from "jwt-decode"
const baseUrl = "http://localhost:3001"

export default async () => {
    try {
        const authToken = localStorage.getItem("authToken")
        const refreshToken = localStorage.getItem("refreshToken")
        if(!authToken || !refreshToken)
            return false
        const token = decode(authToken)
        if(token.exp < new Date().getTime() / 1000) {
            const res = await axios.post(baseUrl + "/auth/token", JSON.stringify({
                token: refreshToken
            }));
        const data = await res.json()
        if(res.status === 200) {
            localStorage.setItem("authToken", data.authToken)
            localStorage.setItem("refreshToken", data.refreshToken)
            }
        else
            alert("Your refresh token had expired. Please login again")
        }
        return `Bearer ${localStorage.getItem("authToken")}`
    } catch(err) {
        console.log(err)
        return false
    }
}