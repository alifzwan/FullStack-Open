const { test, describe, beforeEach, after} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const User = require('../models/user')

describe('when there is initially one user in db', () => {
    test("creation succeeds with a fresh username", async () => {

        const usersAtStart = await.helper.usersInDb()

        const newUser = {
            username: "alifzakwan",
            name: "Alif Zakwan",
            password: "password"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        assert(usernames.includes(newUser.username))

    })
})


after(async () => {
    await mongoose.connection.close()
})