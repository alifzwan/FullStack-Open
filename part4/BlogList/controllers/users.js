const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// Bcrypt - its a library for hashing passwords
// Saltround - determine the complexity of the hash. Higher number, higher complexity

usersRouter.post('/', async (request, response) => {

    const { username, name, password } = request.body // The request body is expected to contain a username, name, and password.

    const saltRounds = 10 // the number of salt rounds is set to 10.
    const passwordHash = await bcrypt.hash(password, saltRounds) // The password is hashed with the bcrypt library

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter