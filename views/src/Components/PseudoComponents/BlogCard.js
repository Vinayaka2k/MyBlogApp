import React from "react"
import {Link} from "react-router-dom"

const BlogCard = ({thumbnail, title, description, id}) => {
    return (
        <div className="w-60 overflow-hidden rounded-md m-auto">
            <div className="w-full bg-white">
                <img className="h-32 m-auto" src={thumbnail} alt="img" />
            </div>
            <div className="px-3 py-2 space-y-2 bg-purpleBg text-white">
                <h1 className="text-center">{title}</h1>
                <p className="text-xs text-justify h-12 overflow-ellipsis overflow-hidden">{description}</p>
                <Link className="flex-align-middle justify-center px-2 text-xs border border-white w-14"
                    to={`/blog/${id}`}
                >
                    <span className="mr-1">visit</span> <img width="10px" height="10px" src="https://img.icons8.com/ios-glyphs/30/000000/share-3.png" alt="external link"/>
                </Link>
            </div>
        </div>
    )
}

export default BlogCard