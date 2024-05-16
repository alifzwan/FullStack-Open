const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
require('express-async-errors') // The express-async-errors library is used to catch errors in asynchronous functions.

const app = express()
const cors = require('cors') 

const notesRouter = require('./controllers/notes') // The express.Router middleware is used to create a new router object.
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

mongoose.set("strictQuery", false) // This is to avoid the deprecation warning.

logger.info('Connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(result => {
        logger.info('Connected to MongoDB')
    })
    .catch(error => {
        logger.error('Error connecting to MongoDB:', error.message)
    })

app.use(cors()) // The cors middleware is used to allow requests from all origins.
app.use(express.static('dist')) // The express.static middleware is used to serve static files from the dist directory.
app.use(express.json()) // The express.json middleware is used to parse JSON payloads in the request body.

app.use(middleware.requestLogger)
app.use('/api/notes', notesRouter) // The notesRouter middleware is used to handle requests made to the /api/notes route.
app.use('/api/users', usersRouter) // The usersRouter middleware is used to handle requests made to the /api/users route.
app.use('/api/login', loginRouter) // The loginRouter middleware is used to handle requests made to the /api/login route.
app.use(middleware.unknownEndpoint) // The unknownEndpoint middleware is used to catch requests made to unknown routes.
app.use(middleware.errorHandler) // The errorHandler middleware is used to catch errors in request handling.

module.exports = app