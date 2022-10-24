import React,{useState, useEffect} from "react";
import {Link, useLocation} from "react-router-dom"
import {marked} from "marked"
import DOMPurify from "dompurify"
import Actions from './PseudoComponents/Actions'
import useBearer from "../Hooks/useBearer"
import axios from "axios";
const baseUrl = ""
const imgBaseUrl = "/images"

const Blog = () => {
    const location = useLocation()
    let id = location.pathname.split("/")[2]
    const [title, setTitle] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [description, setDesc] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState(null)
    const [loading, setLoading] = useState(true)
    const [unavailable, setUnavaialable] = useState(false)
    const bearer = useBearer()
    useEffect(() => {
        (async function() {
            try {
                let res = await axios.get(baseUrl + `/api/blog/${id}`, {
                    headers: {
                        "Authorization": await bearer
                    }
                })
                if(res.data.success) {
                    let blogObj = res.data.blog
                    setTitle(blogObj.title)
                    setDesc(blogObj.description)
                    const unsafeHtml = marked(blogObj.content)
                    const safeHtml = DOMPurify.sanitize(unsafeHtml)
                    setContent(safeHtml)
                    setThumbnail(blogObj.thumbnail)
                    setUserId(blogObj.userId)
                    setLoading(false)
                } else 
                    setUnavaialable(true)
            } catch(err) {
                setUnavaialable(true)
                if(err.response.status === 401)
                    alert("You must be logged in to view this blog!")
                else
                    alert(err.response.data.err)
            }
        })()
    }, [])

    return (
        <div className="min-h-screen bg-secondaryBg">
            <div className="p-8">
                <Link className="flex align-middle justify-center rounded-sm w-min px-2 border-2 border-navBtn text-navBtn" to="/blogs">
                    <div className="w-5 mr-2 my-auto">
                        <img className="w-full" src= {imgBaseUrl + "/back.png" } alt="back"/>
                    </div>
                back </Link>
            </div>
            {
                !loading ?
                <div id="blog" className="lg:flex p-2">
                    <div id="main" className="h-auto w-100 lg:w-4/6 py-2 px-4 lg:h-auto min-h-full overflow-hidden">
                        <h1 className="text-4xl min-h-96 text-center underline text-white">{title}</h1>
                        <div className="flex items-center justify-center mt-20">
                            <img className="object-none object-center w-1/5 h-fit" src={thumbnail} alt="thumbnail" />
                        </div>
                        <p className="text-gray-200 text-3xl border-1-2 my-16 pt-14">{description}</p>
                        <iframe className="w-full" title="markdown" id="markdown" srcDoc={content}></iframe>
                    </div>

                    <div id="menu" className="h-auto w-100 lg:h-auto lg:w-2/6 min-h-full mt-8 lg:mt-0 sm:px-6 md:space-y-4 lg:block flex space-x-4">
                        <Actions userId={userId} id={id} />
                    </div>    
                </div> 
                :
                unavailable ? <h1 className="p-10 text-center text-4xl text-navBtn"> Blog not found</h1> :
                <h1 className="p-10 text-center text-4xl text-navBtn">Loading, Please wait!</h1>

            }
        </div>
    )

}

export default Blog