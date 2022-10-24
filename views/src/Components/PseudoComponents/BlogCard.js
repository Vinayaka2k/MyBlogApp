import React from "react"
import {Link} from "react-router-dom"

const BlogCard = ({thumbnail, title, description, id}) => {
    return (
        <Link to={`/blog/${id}`} >
        <div className="w-60 overflow-hidden rounded-3xl m-12">
            <div className="w-full bg-white">
                <img className="w-4/6 h-44 m-auto" src={thumbnail} alt="img" />
            </div>
            <div className="px-3 py-2 space-y-1 bg-purpleBg text-white">
                <h1 className="text-xl text-center overflow-hidden truncate">{title}</h1>
            </div>
            <div className="px-3 py-2 space-y-1 bg-secondaryBg text-black">
                <p className="text-sm text-center overflow-hidden truncate">{description}</p>
               
            </div>
        </div>
        </Link>
    )
}

export default BlogCard


 {/* <Link className="flex-align-middle justify-center px-2 text-md border border-white w-14"
                    to={`/blog/${id}`}
                > */}
                    {/* <span className="mr-1">visit</span> */}
                    {/* <img width="10px" height="10px" src="https://img.icons8.com/ios-glyphs/30/000000/share-3.png" alt="external link"/> */}