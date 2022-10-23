import React, {useState, useEffect} from "react"
import axios from "axios"
import BlogCard from "./PseudoComponents/BlogCard"
import Nav from "./PseudoComponents/Nav"
import {Link} from "react-router-dom"
import useAuth from "../Hooks/useAuth"

const baseUrl = "http://localhost:3001"

const Home = () => {
    const auth = useAuth()
    const [blog, setBlog] = useState(null)

    useEffect(() => {
        (async function () {
            let blogsList = await axios.get(baseUrl + "/api/blogs/latest")
            setBlog(blogsList.data.blog)
        }());
    }, [])

    return (
            <div className="min-h-screen bg-primaryBg">            
            <Nav />
            {
                auth ? null :
                <h1 className="px-3 mt-8 text-center text-2x1 text-navBtn"> Hello, please <Link className="text-secondaryBg underline" to="/login">login</Link> to view and post blogs</h1>
            }
            <div className="grid gap-20 md:flex w-100 h-full mt-32 md:my-32">
                <div className="flex-1 h-3/4 grid place-content-center">
                    <h1 className="font-mono text-3x1 text-center">
                        Latest Blog
                    </h1>
                    {
                        blog ?             
                        <BlogCard thumbnail={blog.thumbnail } title={blog.title} description={blog.description} id={blog._id}/>
                        : "Please wait, loading!"
                    }
                </div>
            </div>

            <div className="flex-1 h-1/2 md:h-3/4 grid place-content-center">
            </div>
            
        </div>
    )

}

export default Home