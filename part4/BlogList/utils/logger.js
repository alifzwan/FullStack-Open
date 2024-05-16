require('dotenv').config()

// info - it will accept any number of arguments (...params)
const info = (...params) => {
    if(process.env.NODE_ENV !== 'test') {
        console.log(...params)
    }
}

// error - it will accept any number of arguments (...params)
const error = (...params) => {
    if(process.env.NODE_ENV !== 'test') {
        console.error(...params)
    }
}

module.exports = {
    info,
    error
}