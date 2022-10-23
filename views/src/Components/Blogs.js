import React, {useEffect, useState} from "react"
import BlogCard from "./PseudoComponents/BlogCard"
import { Link } from "react-router-dom"
import axios from "axios"
const baseUrl = "http://localhost:3001/api"
const imgBaseUrl = "http://localhost:3001/images"

const Blogs = () => {
    const [blogs, setBlogs] = useState([])
    // const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async function() {
            let blogList = await axios.get(baseUrl + "/blogs")
            setBlogs(blogList.data.blogs)
            // setLoading(false)
        }())
    }, [])

    return (
        <div className="md:min-h-screen w-screen bg-primaryBg pb-24 md:pb-0">
            <div className="p-4">
                <Link className="flex align-middle justify-center rounded-sm w-min px-2 border-2 border-navBtn" to="/">
                    <div className="w-5 mr-2 my-auto">
                        <img className="w-full" src= {imgBaseUrl + "/back.png" } alt="back"/>
                    </div>
                back </Link>
            </div>

            <div className="grid place-content-center min-h-screen my-16 md:my-0">
                <div className="grid gap-5 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 md:align-middle lg:gap-5">
                    {
                    blogs.length === 0 ? <h1 className="text-navBtn text-2x1 text-center">Please wait</h1> : 
                        blogs.map((blog,i) => {
                            return <BlogCard key={i} title={blog.title} description={blog.description} thumbnail={blog.thumbnail}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Blogs