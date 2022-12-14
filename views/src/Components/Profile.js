import React, {useState, useEffect} from "react";
import BlogCard from "./PseudoComponents/BlogCard";
import useUid from "../Hooks/useUid"
import useBearer from "../Hooks/useBearer";
import useUsername from "../Hooks/useUsername"
import Nav from "./PseudoComponents/Nav"
import useAdmin from "../Hooks/useAdmin";
import axios from "axios";
const baseUrl = ""

const Profile = () =>   {
    const [blogs, setBlogs] = useState([])
    const [unavailable, setUnavailable] = useState(false)
    const bearer = useBearer()
    const uid = useUid()
    const username = useUsername()
    const [loading, setLoading] = useState(true)
    const admin = useAdmin()

    useEffect(() => {
        (async function () {
            let res = await axios.post(baseUrl + "/api/blogs", {
                userId: uid
            }, {
                headers: {
                    "Authorization": await bearer
                }, 
            })
            if(res.data.success) {
                if(res.data.blogs.length == 0)
                    setUnavailable(true)
                else {
                    setLoading(false)
                    setBlogs(res.data.blogs)
                }
            } else {
                setUnavailable(true)
            }
        })()
    }, [])

    return (
        <div className="min-h-screen w-screen bg-primaryBg pb-24 md:pb-0">
            <Nav />
            <div className="grid place-content-center sm:my-16 md:my-0">
                {
                    uid ? 
                    <div className="h-44 my-4 space-y-2">
                        <div className="flex space-x-4 text-xl text-navBtn">
                            <h1>username:</h1>
                            <p>{username}</p>
                        </div>
                        <div className="flex space-x-4 text-xl text-navBtn">
                            <h1>Role:</h1>
                            <p>{admin ? "admin" : "user"}</p>
                        </div>
                    </div> : null
                }

                <div className="mb-6">
                    <h1 className="text-2xl text-navBtn">Your Blogs</h1>
                    <p className="text-md">your public as well as private blogs are here</p>
                </div>

                <div className="grid gap-5 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 md:align-middle lg:gap-5">
                {
                    !loading ? 
                    blogs.map((blog, i) => {
                        return <BlogCard key={i} title={blog.title} description={blog.description} id={blog._id} thumbnail={blog.thumbnail} />
                    })
                    : unavailable ?   <h1 className="p-10 text-center text-4xl text-navBtn"> No Blogs found!</h1> 
                    : <h1 className="p-10 text-center text-4xl text-navBtn">Loading, Please wait!</h1>
                }
                </div>

            </div>
        </div>
    )

}

export default Profile