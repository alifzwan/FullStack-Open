const {test, describe, beforeEach, after} = require('node:test');
const assert = require('node:assert');
const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const helper = require('./test_helper');

const User = require('../models/user');


describe('when there us initially one user in db', () => {
    beforeEach(async () => {

        await User.deleteMany({});

        const passwordHash = await bcrypt.hash('sekret', 10)

        const user = new User({
            username: 'root', 
            passwordHash
        })

        await user.save()
    })

    // test for viewing all users
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDB();

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDB();
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))

    })

    // if the username is already taken, the creation fails
    // test('creation fails with proper statuscode and message if username already taken', async () => {
    //     const usersAtStart = await helper.usersInDB()

    //     const newUser = {
    //         username: 'root',
    //         name: 'Superuser',
    //         password: 'salainen'
    //     }

    //     const result = await api
    //         .post('/api/users')
    //         .send(newUser)
    //         .expect(400)
    //         .expect('Content-Type', /application\/json/)

    //     const usersAtEnd = await helper.usersInDB()
    //     assert(result.body.error.includes('expected `username` to be unique'))

    //     assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    // })
})

after(async () => { //close the connection to the database after all tests have been run
    await mongoose.connection.close()
})

