require('dotenv').config()

const port = process.env.port
const mongoUrl = process.env.mongoUrl

module.exports = {
    port,
    mongoUrl
}