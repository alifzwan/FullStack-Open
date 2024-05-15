const { test, after, beforeEach} = require('node:test') //import test and after functions from node:test
const Note = require('../models/note') //import the Note model
const assert = require('node:assert') // import the assert function for assertion
const mongoose = require('mongoose') //import mongoose
const supertest = require('supertest') //import supertest
const app = require('../app') //import app

// create an instance of supertest that is tied to the app
// This object is used to make HTTP requests to the app
const api = supertest(app) 

const initialNotes =[
    {
        content: 'HTML is easy',
        important: false,
    },
    {
        content: 'Browser can execute only JavaScript',
        important: true,
    }
]



test.only('notes are returned as json', async () => {
    // console.log(initialNotes)
    await api
        .get('/api/notes') //make a get request to /api/notes
        .expect(200) //expect status code 200
        .expect('Content-Type', /application\/json/) //expect content type to be application/json
})

test('there are two notes', async () => {
    const response = await api.get('/api/notes') //make a get request to /api/notes
    assert.strictEqual(response.body.length, initialNotes.length) //expect the length of the response body to be 2
})

test('the first note is about HTTP methods', async () => {
    const response = await api.get('/api/notes') //make a get request to /api/notes

    const contents = response.body.map(e => e.content) //get the content of all notes
    console.log(contents)
    assert(contents.includes("HTML is easy", "Browser can execute only JavaScript"))

})


beforeEach(async () => {
    await Note.deleteMany({})
    let noteObject = new Note(initialNotes[0])
    await noteObject.save()
    noteObject = new Note(initialNotes[1])
    await noteObject.save()
})


after(async () => { //close the connection to the database after all tests have been run
    await mongoose.connection.close()
})