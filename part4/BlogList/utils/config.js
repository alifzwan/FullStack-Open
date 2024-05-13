require('dotenv').config()

const port = process.env.port
const mongoUrl = process.env.NODE_ENV === 'test'
    ? process.env.test_mongoUrl
    : process.env.mongoUrl

module.exports = {
    mongoUrl,
    port
}