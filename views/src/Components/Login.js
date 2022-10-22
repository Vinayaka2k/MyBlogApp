import axios from "axios"
import React from "react"
import {Link, useNavigate} from "react-router-dom"
let baseUrl = "http://localhost:3001"

const Login = () => {
    const nav = useNavigate()
    const submitHandler = async (e) => {
        e.preventDefault()
        const username = e.target.username.value
        const password = e.target.password.value
        try {   
            let res = await axios.post(baseUrl + "/auth/login", {
                username,
                password
            })
            if(res.status === 200) {
                localStorage.setItem("authToken", res.data.authToken)
                localStorage.setItem("refreshToken", res.data.refreshToken)
                nav("/")
            } else {
                alert(res.data.err)
            }
        } catch(err) {
            alert(err.response.data.err)
        }
    }

    return (
        <div className="min-h-screen  px-4 pb-8  bg-primaryBg grid place-content-center">
            <div className="py-8 px-3 md:px-10">
                <Link className="flex align-middle justify-center rounded-sm w-min px-2 border-2 border-navBtn text-navBtn" to="/"> <div className="w-5 mr-2 my-auto"><img className="w-full" src="/back.png" alt="back" /></div> back</Link>
            </div>
            <form onSubmit={submitHandler} method="POST" action="/auth/login" className="md:w-96 m-auto space-y-4 px-3 md:px-10">
                <h1 className="text-2xl text-navBtn">Login</h1>
                <div>
                    <input className="w-full p-2" type="text" name="username"  placeholder="username" required />
                    <p className="text-xs text-gray-500">Enter username</p>
                </div>
                <div>
                    <input type="password" className="w-full p-2" name="password" placeholder="password" required />
                    <p className="text-xs text-gray-500">Enter password</p>
                </div>
                <div className="flex justify-between align-middle">
                    <button type="submit" className="w-26 text-center px-3 py-0.5 border-2 border-navBtn rounded-sm hover:bg-navBtn hover:text-white">log in</button>
                    <Link to="/signup">Create account</Link>
                </div>
            </form>
        </div>
    )
}

export default Login