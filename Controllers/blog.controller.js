const {getBlogs, getBlogById, pushBlog, getOneBlog, deleteBlog, editBlog, checkBlogOwner, getBlogsByUser} = require("../Services/blog.service")

const apiGetBlogs = async (req, res) => {
    try {
        const blogs = await getBlogs()
        if(blogs) {
            let pBlog = []
            blogs.forEach(blog => {
                const {_id, title, thumbnail, description} = blog
                pBlog.push({_id, title, thumbnail, description})
            })
            res.json({success: true, blogs: pBlog})
        }
        else
            throw "internal error"
    } catch(err) {
        console.log(err)
        res.json({success: false, err})
    }
}

const apiGetOneBlog = async (req, res) => {
    try {
        const blog = await getOneBlog()
        if(blog) {
            const {_id, title, thumbnail, description} = blog
            res.json({success: true, blog: {_id, title, thumbnail, description}})
        } 
        else
            throw "internal error" 
    } catch(err) {
        console.log(err)
        res.json({success: false, err})
    }
}

const apiGetBlogByUser = async (req, res) => {
    const userId = req.body.userId || req.user.id
    try {
        if(!(req.user.role === "admin" || req.user.id === userId))
            throw "permission denied"
        const blogs = await getBlogsByUser(userId)
        if(blogs)
            res.json({success: true, blogs})
        else
            throw "internal error"
    } catch(err) {
        console.log(err)
        return false
    }
}

const apiGetBlogById = async(req, res) => {
    const id = req.params.id
    try {
        if(id.length != 24)
            throw "invalid id"
        const blog = await getBlogById(id)
        if(blog) {
            if(blog.isPublic)
                res.json({success: true, blog})
            else {
                if(req.user.role === "admin" || req.user.id === blog.userId)
                    res.json({success: true, blog})
                else
                    throw "access denied"
            }
        }
        else
            throw "not found"
    } catch(err) {
        console.log(err)
        res.json({success: false, err})
    }
}

const apiPushBlog = async (req, res) => {
    const userId = req.user.id
    const {title, description, content, isPublic, thumbnail} = req.body
    try {
        const blog = await pushBlog(title, description, content, isPublic, userId, thumbnail)
        if(blog)
            res.json({success: true, blog})
        else
            throw "internal error"
    } catch(err) {
        console.log(err)
        res.json({success: false, err})
    }
}

const apiDeleteBlog = async (req, res) => {
    const id = req.params.id
    const userId = req.user.id
    try {
        if(!(req.user.role === "admin" || await checkBlogOwner(id, userId)))
            throw "permission denied"
        if(id.length != 24)
            throw "incorrect id"
        const blog = await deleteBlog(id)
        if(blog)
            res.json({success: true, blog})
        else
            throw "blog not found"
    } catch(err) {
        console.log(err)
        res.status(403).json({success: false, err})
    }
}

const apiEditBlog = async (req, res) => {
    const id = req.params.id
    const userId = req.user.id
    const {title, description, content, isPublic, thumbnail} = req.body
    try {
        if(!(req.user.role === "admin" || await checkBlogOwner(id, userId)))
            throw "permission denied"
        if(id.length != 24)
            throw "incorrect id"
        const blog = await editBlog(id, title, description, content, isPublic, userId, thumbnail)
        if(blog)
            res.json({success: true, blog})
        else
            throw "internal error"
    } catch(err) {
        console.log(err)
        res.status(403).json({success: false, err})
    }
}

module.exports = {
    apiDeleteBlog, apiEditBlog, apiGetBlogById, apiGetBlogByUser, apiGetBlogs, apiGetOneBlog, apiPushBlog
}