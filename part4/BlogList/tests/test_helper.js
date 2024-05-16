const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "French Riviera",
        author: "Mollie",
        url: "https://molliemooreblog.com/2018/08/french-riviera-travel-guide.html",
        likes: 99,
    },
    {
        title: "Thailand",
        author: "Alif Zakwan",
        url: "https://thailandstartshere.com/thailand-travel-blog/",
        likes: 99,
    },
    {
        title: "Paris",
        author: "Alif Zakwan",
        url: "https://everydayparisian.com/first-time-guide-to-paris/",
        likes: 99,
    },
    {
        title: "Dubai",
        author: "Alif Zakwan",
        url: "https://www.theblondeabroad.com/ultimate-dubai-travel-guide/",
        likes: 99,
    },
    {
        title: "Italy",
        author: "Alif Zakwan",
        url: "https://www.myitaliandiaries.com/",
        likes: 77,
    }
]

// nonExistingID - This function is used to generate a non-existing ID.
const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon'}) // Create a new blog object with a title of 'willremovethissoon'.
    await blog.save() // Save the blog object to the database.
    await blog.deleteOne() // Delete the blog object from the database.

    return blog._id.toString() // Return the ID of the deleted blog object as a string.
} 

// blogsInDb - This function is used to return all the blogs in the database.
const blogsInDb = async () => {
   const blogs = await Blog.find({}) // Find all the blogs in the database.
   return blogs.map(blog => blog.toJSON()) // Return the blogs as an array of JSON objects.
}

module.exports = {
    initialBlogs, 
    nonExistingId, 
    blogsInDb
}