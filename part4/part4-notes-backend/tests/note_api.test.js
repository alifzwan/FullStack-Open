const { test, after, beforeEach, describe} = require('node:test') //import test and after functions from node:test
const assert = require('node:assert') // import the assert function for assertion
const mongoose = require('mongoose') //import mongoose
const supertest = require('supertest') //import supertest
const app = require('../app') //import app
const api = supertest(app) 
const helper = require('./test_helper') //import the helper module

const Note = require('../models/note') //import the Note model

// create an instance of supertest that is tied to the app
// This object is used to make HTTP requests to the app

// describe('when there is initially some notes saved', () => {
//     beforeEach(async () => {
//         await Note.deleteMany({})
//         await Note.insertMany(helper.initialNotes)
//     })

//     // test for the content type of notes
//     test('notes are returned as json', async () => {
//         await api
//             .get('/api/notes') //make a get request to /api/notes
//             .expect(200) //expect status code 200
//             .expect('Content-Type', /application\/json/) //expect content type to be application/json
//     })

//     // test for the length of notes
//     test('all notes are returned', async () => {
//         const response = await api.get('/api/notes') //make a get request to /api/notes
//         assert.strictEqual(response.body.length, helper.initialNotes.length) //expect the length of the response body to be 2
//     })

//     test('a specific note is within the returned notes', async () => {
//         const response = await api.get('/api/notes') //make a get request to /api/notes
    
//         const contents = response.body.map(e => e.content) //get the content of all notes
//         // console.log(contents)
//         assert(contents.includes("HTML is easy", "Browser can execute only JavaScript"))
//     })
// })



// describe('viewing a specific note', () => {
//     // test for viewing a specific note
//     test('a specific note can be viewed', async () => {
//         const notesAtStart = await helper.notesInDB() //fetch all notes from the database
//         const noteToView = notesAtStart[0] //get the first note

//         const resultNote = await api
//             .get(`/api/notes/${noteToView.id}`) //make a get request to /api/notes/:id
//             .expect(200)
//             .expect('Content-Type', /application\/json/)

//         assert.deepStrictEqual(resultNote.body, noteToView)  //expect the response body to be the same as the note
//     })

//     test('fails with statuscode 404 if note does not exist', async () => {
//         const validNoneExistingId = await helper.nonExistingId()

//         await api
//             .get(`/api/notes/${validNoneExistingId}`)
//             .expect(404)
//     })

//     test('fails with statuscode 400 if id is invalid', async () => {
//         const invalidId = '5a3d5da59070081a82a3445'

//         await api
//             .get(`/api/notes/${invalidId}`)
//             .expect(400)
//     })
// })



describe('addition of a new note', () => {

    // test('succeeds with valid data', async () => {
    //     const newNote = {
    //         content: 'async/await simplifies making async calls',
    //         important: false,
    //     }
    
    //     await api
    //         .post('/api/notes')
    //         .send(newNote)
    //         .expect(201)
    //         .expect('Content-Type', /application\/json/)
    
    //     // const response = await api.get('/api/notes')
    //     const notesAtEnd = await helper.notesInDB()
    //     assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)    

    //     const contents = notesAtEnd.map(r => r.content)
    //     assert(contents.includes('async/await simplifies making async calls'))
    // })

    test('fails with status code 400 if data is invalid', async () => {
        const newNote = {
            important: true
        }

        await api
            .post('/api/notes')
            .send(newNote)
            .expect(400)

        const notesAtEnd = await helper.notesInDB()
        assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)
    })
})

// describe('deletion of a note', () => {
//     // test for deleting a note
//     test('succeeds with status code 204 if id is valid', async () => {
//         const notesAtStart = await helper.notesInDB() //fetch all notes from the database
//         const noteToDelete = notesAtStart[2] //get the first note

//         await api 
//             .delete(`/api/notes/${noteToDelete.id}`) //make a delete request to /api/notes/:id
//             .expect(204) //expect status code 204

//         const notesAtEnd = await helper.notesInDB()   //fetch all notes from the database
//         assert.strictEqual(notesAtEnd.length, helper.initialNotes.length) //expect the length of the notes to be 1 less than the initial length

//         const contents = notesAtEnd.map(r => r.content) // get the content of all notes
//         assert(!contents.includes(noteToDelete.content)) //expect the content of the deleted note not to be in the list of notes
//     })
// })












after(async () => { //close the connection to the database after all tests have been run
    await mongoose.connection.close()
})