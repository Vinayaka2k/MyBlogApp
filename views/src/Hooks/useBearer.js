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
        console.log(token.exp < (new Date().getTime() / 1000))
        if(token.exp < (new Date().getTime() / 1000)) {
            const res = await axios.post(baseUrl + "/auth/token", {
                token: refreshToken
            });
            let data = res.data
            if(res.status === 200) {
                console.log("HERE")
                localStorage.setItem("authToken", data.authToken)
                localStorage.setItem("refreshToken", data.refreshToken)
                }
        }
        return `Bearer ${localStorage.getItem("authToken")}`
    } catch(err) {
        // console.log(err)
        return err.response.data.err
    }
}