// info - it will accept any number of arguments (...params)
const info = (...params) => {
    console.log(...params)
}

// error - it will accept any number of arguments (...params)
const error = (...params) => {
    console.log(...params)
}

module.exports = {
    info,
    error
}