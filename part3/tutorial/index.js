const http = require('http') // Import the http module. NodeJS use CommonJS module

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

  const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' }) // Set the response header(status code, content type)
    response.end(JSON.stringify(notes)) // Convert the notes array to a JSON string and return it to the client
  })



// request - contains informaton about the client's request
// response - used to return data to the client
// const app = http.createServer(( request, response ) => { // Create a server
//     response.writeHead(200, { 'Content-Type': 'text/plain' }) // Set the response header(status code, content type)
//     response.end('Hello World')
// })

const PORT = 3001 // Port the server listens on
app.listen(PORT) // Start the server
console.log(`Server running on port ${PORT}`) 