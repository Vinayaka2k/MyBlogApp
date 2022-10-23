import React, {useRef} from "react";
import { Link, useNavigate } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin"
import useAuth from "../../Hooks/useAuth"
import useReset from "../../Hooks/useReset";
const baseUrl = "http://localhost:3001"

const Nav = () => {
    const navigate = useNavigate()
    const check = useRef()
    const btns = useRef()
    const admin = useAdmin()
    const auth = useAuth()

    const LogoutHandler = async () => {
        useReset()
        navigate("/login")
    }

    const menuToggle = (e) => {
        if(e.target.checked)
            btns.current.className = btns.current.className.replace("hidden", "grid")   
        else
            btns.current.className = btns.current.className.replace("grid", "hidden")
    }

    return (
        <div className="py-6 px-8 flex justify-between bg-primaryBg md:bg-transparent">
            <input id="menu" name="menu" ref={check} onChange={menuToggle} type="checkbox" hidden/>
            <label className="block lg:hidden z-10" htmlFor="menu">M</label>
            <div ref={btns} className="absolute w-screen left-0 top-30 hidden gap-4 place-content-center pb-4 shadow-lg lg:shadow-none md:pb-0 lg:static lg:flex md:space-x-2 lg:space-x-8 bg-primaryBg lg:bg-transparent">
                <Link className="w-navBtn text-center bg-navBtn shadow-nav rounded-sm text-white py-1" to="/">HOME</Link>
                <Link className="w-navBtn text-center bg-navBtn shadow-nav rounded-sm text-white py-1" to="/blogs">BLOGS</Link>
                {
                    auth ? 
                    <>
                        <Link className="w-navBtn text-center bg-navBtn shadow-nav rounded-sm text-white py-1" to="/me">PROFILE</Link>
                        <Link className="w-navBtn text-center bg-navBtn shadow-nav rounded-sm text-white py-1" to="/post">POST</Link>
                        { admin ? <Link className="w-navBtn text-center bg-navBtn shadow-nav rounded-sm text-white py-1" to="/admin">ADMIN</Link> : null}
                    </>: null
                }
                <a href="https://github.com/Vinayaka2k/MyBlogApp" className="w-navBtn text-center bg-navBtn shadow-nav rounded-sm text-white py-1">ABOUT</a>
                {
                    auth ? <button onClick={LogoutHandler} className="w-navBtn text-center bg-navBtn shadow-nav rounded-sm text-white py-1">LOGOUT</button>
                    : <Link className="w-navBtn text-center bg-navBtn shadow-nav rounded-sm text-white py-1" to="/login">LOGIN</Link>
                }
            </div>
        </div>
    )
}

export default Nav 