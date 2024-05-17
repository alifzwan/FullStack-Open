const jwt = require('jsonwebtoken') // import jsonwebtoken
const bcrypt = require('bcrypt') // import bcrypt
const loginRouter = require('express').Router() // import express.Router
const User = require('../models/user') // import User model

// POST
loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body // get username and password from request body

    const user = await User.findOne({ username }) // find user by username

    const passwordCorrect = user === null // if user is null, 
        ? false // password is incorrect
        : await bcrypt.compare(password, user.passwordHash) // compare password with user's passwordHash

    if(!(user && passwordCorrect)) { // if user is null or password is incorrect
        return response.status(401).json({ // return 401 Unauthorized
            error: 'invalid username or password'
        })
    }

    // if the user is found and the password is correct,
    // create a token for the user

    // PURPOSE OF TOKEN
    // - to authenticate the user for subsequent requests after they logged in
    // - Once user is authenticated, the server sends this token to the client
    // - The client then includes this token in the header of subsequent requests
    // - The server can then verify the token and authenticate user's request without needing
    //   to ask for username and password again

    
    const userForToken = {
        username: user.username,
        id: user._id
    }

    // token is generated using JSON Web Token (JWT) 
    // which signed with the payload (userForToken) and secret key (process.env.SECRET)

    const token = jwt.sign(userForToken, process.env.SECRET) // jwt - sign the token with the userForToken and SECRET

    response
        .status(200)
        .send({ 
            token, 
            username: user.username, 
            name: user.name 
        })
})

module.exports = loginRouter