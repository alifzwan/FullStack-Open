const logger = require('../utils/logger')
const Blog = require('../models/blog');
const blogRouter = require('express').Router()


// GET
blogRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
        console.log(blogs)
    })
})

// GET
blogRouter.get('/:id', (request, response, next) => { 
    Blog.findById(request.params.id)
        .then(blog => {
            if(blog) {
                response.json(blog)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

// DELETE
blogRouter.delete('/:id', (request, response, next) => { 
    Blog.findByIdAndDelete(request.params.id)
        .then(
            response.status(204).end()
        )
        .catch(error => next(error))
})


// POST
blogRouter.post('/', (request, response, next) => {
    const body = request.body
  
    if (body.title === undefined) {
      return response.status(400).json({ 
        error: 'Please Enter Title' 
      })
    }
  
    const blog = new Blog({
      title : body.title,
      author: body.author,
      url   : body.url,
      likes : body.likes
    })
  
    blog.save()
        .then(savedblog => {
            response.json(savedblog)
        })
        .catch(error => next(error))
})

module.exports = blogRouter