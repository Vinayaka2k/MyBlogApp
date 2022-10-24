const BlogModel = require("../Models/blog.model")

const getBlogs = async () => {
    try{
        const blogs = await BlogModel.find({isPublic: true});
        return blogs;
    } catch(err) {
        console.log(err);
        return false;
    }
}

const getOneBlog = async () => {
    try{
        const blog = await BlogModel.find({isPublic: true}).sort({ _id: -1 }).limit(1)
        return blog[0]
    } catch(err) {
        console.log(err)
        return false;
    }
}

const getBlogById = async (id) => {
    try{
        const blog = await BlogModel.findById(id)
        return blog
    } catch(err) {
        console.log(err)
        return false
    }
}

const pushBlog = async (title, description, content, isPublic, userId, thumbnail) => {
    try {
        const data = await BlogModel.insertMany({title, description, content, isPublic, userId, thumbnail})
        return data
    } catch(err) {
        console.log(err)
        return false
    }
}

const getBlogsByUser = async (userId) => {
    try {
        const blogs = await BlogModel.find({userId})
        return blogs
    } catch(err) {
        console.log(err)
        return false
    }
}

const deleteBlog = async (id) => {
    try {
        const data = await BlogModel.findByIdAndDelete(id)
        return data
    } catch(err) {
        console.log(err)
        return false
    }
}


const editBlog = async (id, title, description, content, isPublic, userId, thumbnail) => {
    try {
        const blog = await BlogModel.findByIdAndUpdate(id, {title, description, content, isPublic, userId, thumbnail})
        return blog
    } catch (err) {
        console.log(err)
        return false
    }
}

const checkBlogOwner = async (blogId, userId) => {
    try {
        const blog = await BlogModel.findById(blogId)
        if(!blog)
            throw "blog not found"
        return blog.userId === userId
    } catch(err) {
        console.log(err)
        return false
    }
    
}

module.exports = {
    getBlogs, getOneBlog, getBlogById, pushBlog, deleteBlog, editBlog, checkBlogOwner, getBlogsByUser
}