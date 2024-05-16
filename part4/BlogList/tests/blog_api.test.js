const { test, after, beforeEach, describe} = require('node:test') //import test and after functions from node:test
const assert = require("node:assert")
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/blog')



// 4.8: Blog List Tests, step 1
describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({}) //delete all the blogs in the database
        await Blog.insertMany(helper.initialBlogs) //insert the initial blogs into the database
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        // console.log(response.body)
        assert(response.body.length === 5)
    })
})

// 4.9: Blog List Tests, step 2
describe('viewing a specific blog', () => {
    test('a specific blog can be viewed', async () => {
        const blogsAtStart = await helper.blogsInDb() //get all the blogs in the database
        const blogToView = blogsAtStart[0] //get the first blog in the database

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.deepStrictEqual(resultBlog.body, blogToView)
    })
})

// 4.10: Blog List Tests, step 3
// 4.11*: Blog List Tests, step 4
// 4.12*: Blog List tests, step 5


describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
        const newBlog = {
            title: "French Riviera",
            author: "Mollie",
            url: "https://molliemooreblog.com/2018/08/french-riviera-travel-guide.html",
            likes: 99,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(blog => blog.title)
        assert(titles.includes('French Riviera'))
    })

    test('defaults likes to 0 if missing', async () => {
        const newBlog = {
            title: "French Riviera",
            author: "Mollie",
            url: "https://molliemooreblog.com/2018/08/french-riviera-travel-guide.html",
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
        const addedBlog = blogsAtEnd.find(blog => blog.id === response.body.id)

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
        assert.strictEqual(addedBlog.likes, 0)
    })

    test('fails if data does not have title', async () => {
        const newBlogWithoutTitle = {
            author: "Test Author",
            url: "https://testurl.com",
            likes: 5
        }
        
        await api
            .post('/api/blogs')
            .send(newBlogWithoutTitle)
            .expect(400)
        
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
        
    test('fails if data does not have url', async () => {
        const newBlogWithoutUrl = {
            title: "Test Title",
            author: "Test Author",
            likes: 5
        }
        await api
            .post('/api/blogs')
            .send(newBlogWithoutUrl)
            .expect(400)
        
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
})


// 4.13 Blog List Expansions, step 1
describe("deletion of a blog", () => {
    test('succeeds with status code 204 if id is valid', async () => {
        blogsAtStart = await helper.blogsInDb()
        blogToDelete = blogsAtStart[4]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
            
        blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
            
        const content = blogsAtEnd.map(blog => blog.title)
        assert(!content.includes(blogToDelete.title))
    })
})

// 4.14 Blog List Expansions, step 2
describe('updating a note', () => {
    test('succeeds with status code 200 if updating complete', async () => {
        blogsAtStart = await helper.blogsInDb()
        blogToUpdate = blogsAtStart[4]

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({ likes: 100 })
            .expect(200)
        
        blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

        const like = blogsAtEnd.map(blog => blog.likes)
        assert(like.includes(100))
    }) 
})

after(async () => { //close the connection to the database after all tests have been run
    await mongoose.connection.close()
})