require('dotenv').config()

const mongoUrl = process.env.mongoUrl
const port = process.env.port

module.exports = {
    mongoUrl,
    port
}