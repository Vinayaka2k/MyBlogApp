import axios from "axios";
import React, {useState, useEffect} from "react";
import {Link, useNavigate, useLocation} from "react-router-dom"
import useBearer from "../Hooks/useBearer";
const imgBaseUrl = "/images"

const Edit = () => {
    const location = useLocation()
    let id = location.pathname.split("/")[2]
    const nav = useNavigate()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [isPublic, setIsPublic] = useState(true)
    const [loading, setLoading] = useState(true)
    const [unavailable, setUnavailable] = useState(false)
    const bearer = useBearer()
    const baseUrl = ""

    useEffect(() => {
        async function foo() {
                try {
                    let res = await axios.get(baseUrl + `/api/blog/${id}`, {
                    headers: {
                        "Authorization": await bearer
                    }
                })
                if(res.data.success) {
                    setLoading(false);
                    setTitle(res.data.blog.title);
                    setThumbnail(res.data.blog.thumbnail);
                    setContent(res.data.blog.content);
                    setDescription(res.data.blog.description);
                    setIsPublic(res.data.blog.isPublic);
                    (res.data.blog.thumbnail) ? setThumbnail(res.data.blog.thumbnail) : setThumbnail(`https://via.placeholder.com/150/FFFAFA/0D0C0C?text=edit`)
                } else {
                    setUnavailable(true)
                }       
            } catch(err) {
                setUnavailable(true)
                alert(err.response.data.err)
            }
        }
        foo()
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            let res = await axios.patch(baseUrl + `/api/blog/${id}`, {
                title, description, content, thumbnail, isPublic
            }, {
                headers: {
                    "Authorization": await bearer
                }
            })
            if(res.status === 200)
                nav(`/blog/${id}`)
            else if(res.status === 401 || res.status === 403) {
                alert(res.data.err)
                setLoading(false)
            }
        } catch(err) {
            alert(err.response.data.err)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen px-4 pb-8 bg-primaryBg grid place-content-center">
            <div className="py-8 px-3 md:px-10">
                <Link aria-disabled={false} className="flex align-middle justify-center rounded-sm w-min px-2 border-2 border-navBtn text-navBtn" to={unavailable?"/":`/blog/${id}`}> 
                    <div className="w-5 mr-2 my-auto">                        
                        <img className="w-full" src= {imgBaseUrl + "/back.png" } alt="back"/>
                    </div> back</Link>
            </div>
            {
                !loading ? 
                <form onSubmit={submitHandler} method="POST" action="/api/post" className="w-screen px-3 md:px-10 m-auto space-y-4">
                    <div className="flex items-center justify-center mt-20">
                        <img className="object-none object-center w-1/5 h-fit" src={thumbnail} alt="thumbnail" />
                    </div>                    <h1 className="text-3xl text-navBtn">Edit</h1>
                    <input  value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2" type="text" name="title"  placeholder="title" required />
                    <div>
                        <input placeholder="thumbnail image" type="url" value={thumbnail} onChange={e => setThumbnail(e.target.value)} className="w-full p-2" />
                        <p className="text-xs text-gray-500">URL to thumbnail image for your blog</p>
                    </div>
                    <div className="w-56 flex justify-between align-baseline">
                        <label htmlFor="isPublic">publicily visible</label>
                        <input id="isPublic" type="checkbox" defaultChecked={isPublic} onChange={e => setIsPublic(e.target.checked)} />
                    </div>
                    <div>
                        <textarea  value={description} onChange={e => setDescription(e.target.value)} className="w-full h-32 p-2" name="description" placeholder="description" required></textarea>
                        <p className="text-xs text-gray-500">Doesn't support markdown</p>
                    </div>
                    <div>
                        <textarea value={content} onChange={e => setContent(e.target.value)} className="w-full h-72 p-2" name="content" placeholder="blog goes here" required></textarea>
                        <p className="text-xs text-gray-500">This section support some elements of markdown.</p>
                    </div>
                    <button disabled={loading} type="submit" className="w-min px-3 py-0.5 border-2 border-navBtn rounded-sm hover:bg-navBtn hover:text-white">update</button>


                </form> : 
                unavailable ? 
                <h1 className="p-10 text-center text-4xl text-navBtn"> Blog not found</h1> :
                <h1 className="p-10 text-center text-4xl text-navBtn">Loading, Please wait!</h1>
            }
            
        </div>
    )
}

export default Edit