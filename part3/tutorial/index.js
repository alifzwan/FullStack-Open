const express = require('express') // Import the Express.js library
const app = express() // Create an instance of Express application

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
]

// Define a route handler for the default home page '/'
app.get('/', (request, response) => { 
    response.send('<h1>Hello World!</h1>') // Send a response to the client
})

// Define a route handler for the /api/notes endpoint
app.get('/api/notes', (request, response) => {
    response.json(notes) // Send the notes array as a JSON response
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})