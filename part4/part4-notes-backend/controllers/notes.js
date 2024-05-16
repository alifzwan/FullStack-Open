const notesRouter = require('express').Router() // The express.Router middleware is used to create a new router object.
const Note = require('../models/note') 
const User = require('../models/user')


// GET
notesRouter.get('/', async (request, response, next) => { 

    // ASYNC/AWAIT
    // - Built on top of promises and provide a simpler and cleaner way to work with asynchronous code
    // - It makes it easier to read and write asynchronous code
        try {
            const notes = await Note.find({})
            response.json(notes)
        } catch (error){
            next(error)
            response.status(404).end()
        }


    // PROMISES
    // - Provides a way to handle the eventual completion/failur of an asynchronous operation
    // - it can be chained together to handle the result of an asynchronous operation 
    //   where each subsequent operation depends on the result of the previous one

    // Note.find({}).then(notes => {
    //     response.json(notes)
    // }).catch(error => {
    //     response.status(404).end()
    // })
})

// GET
notesRouter.get('/:id', async (request, response, next) => { 

    const notes = await Note.findById(request.params.id)
    
    
    if (notes) {
        response.json(notes)
    } else {
        response.status(404).end()
    }


    // ASYNC/AWAIT
    // try {
    //     const notes = await Note.findById(request.params.id)
    //     response.json(notes)
    // } catch (error) {
    //     next(error)
    //     response.status(404).end()
    // }

    // PROMISES
    // Note.findById(request.params.id)
    //     .then(note => {
    //         if(note) {
    //             response.json(note)
    //         } else {
    //             response.status(404).end()
    //         }
    //     })
    //     .catch(error => next(error))
})


// POST
notesRouter.post('/', async (request, response, next) => {
    const body = request.body

    const user = await User.findById(body.userId)
  
    const note = new Note({
      content: body.content,
      important: body.important === undefined ? false : body.important,
      user: user.id
    })

    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote.id)
    await user.save()

    response.status(201).json(savedNote)


    // ASYNC/AWAIT
    // try {
    //     const savedNote = await note.save()
    //     response.status(201).json(savedNote)
    // } catch (error) {
    //     next(error)
    // }
  
    // PROMISES
    // note.save()
    //     .then(savedNote => {
    //         response.json(savedNote)
    //     })
    //     .catch(error => next(error))
})

// DELETE
notesRouter.delete('/:id', async (request, response, next) => { 

    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()


    //  ASYNC/AWAIT
    // try {
    //     await Note.findByIdAndDelete(request.params.id)
    //     response.status(204).end()
    // } catch (error) {
    //     next(error)
    // }

    // PROMISES
    // Note.findByIdAndDelete(request.params.id)
    //     .then(
    //         response.status(204).end()
    //     )
    //     .catch(error => next(error))
})

// PUT
notesRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important
    }

    // ASYNC/AWAIT
    try {
        const savedNote = Note.findByIdAndUpdate(request.params.id, note, { new: true })
        response.json(savedNote)
    } catch (error) {
        next(error)
    }

    // PROMISES
    // Note.findByIdAndUpdate(request.params.id, note, { new: true })
    //     .then(updatedNote => {
    //         response.json(updatedNote)
    //     })
    //     .catch(error => next(error))
})

module.exports = notesRouter