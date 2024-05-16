const logger = require('../utils/logger')
const Blog = require('../models/blog');
const blogRouter = require('express').Router()


// GET
blogRouter.get('/', async (request, response, next) => {

    
    const blogs = await Blog.find({})
    response.json(blogs)

    // ASYNC/AWAIT
    // try{
    //     const blogs = await Blog.find({})
    //     response.json(blogs)
    // } catch (error) {
    //     next(error)
    // }

    // PROMISES
    // Blog.find({}).then(blogs => {
    //     response.json(blogs)
    //     console.log(blogs)
    // })
})

// GET
blogRouter.get('/:id', async (request, response, next) => { 

    const blogs = await Blog.findById(request.params.id)
    if(blogs) {
        response.json(blogs)
    } else {
        response.status(404).end()
    }
    // ASYNC/AWAIT
    // try {
    //     const blogs = await Blog.findById(request.params.id)
    //     response.json(blogs)
    // } catch (error) {
    //     next(error)
    //     response.status(404).end()
    // }


    // PROMISES
    // Blog.findById(request.params.id)
    //     .then(blog => {
    //         if(blog) {
    //             response.json(blog)
    //         } else {
    //             response.status(404).end()
    //         }
    //     })
    //     .catch(error => next(error))
})

// DELETE
blogRouter.delete('/:id', async (request, response, next) => { 

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()



    // ASYNC/AWAIT
    // try {
    //     await Blog.findByIdAndDelete(request.params.id)
    //     response.status(204).end()
    // } catch (error) {
    //     next(error)
    // }

    // PROMISES
    // Blog.findByIdAndDelete(request.params.id)
    //     .then(
    //         response.status(204).end()
    //     )
    //     .catch(error => next(error))
})


// POST
blogRouter.post('/', async (request, response, next) => {
    const body = request.body
  
    if (!body.title || !body.url) {
      return response.status(400)
        .send({ 
          error: 'title or url missing' 
        })
    }
  
    const blog = new Blog({
      title : body.title,
      author: body.author,
      url   : body.url,
      likes : body.likes || 0 
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)


    // ASYNC/AWAIT
    // try{
    //     const savedBlog = await blog.save()
    //     response.status(201).json(savedBlog)
    // } catch(error) {
    //     next(error)
    // }


    // PROMISES
    // blog.save()
    //     .then(savedblog => {
    //         response.json(savedblog)
    //     })
    //     .catch(error => next(error))
})

//PUT
blogRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json(updatedBlog)


    // ASYNC/AWAIT
    // try {
    //     const updatedBlog = Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    //     response.json(updatedBlog)
    // } catch (error) {
    //     next(error)
    // }

    // PROMISES
    // Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    //     .then(updatedBlog => {
    //         response.json(updatedBlog)
    //     })
    //     .catch(error => next(error))
})

module.exports = blogRouter