const Note = require('../models/note')

const initialNotes =[
    {
        content: 'HTML is easy',
        important: false,
    },
    {
        content: 'Browser can execute only JavaScript',
        important: true,
    }
]


// nonExistingID - This function is used to generate a non-existing ID.
const nonExistingId = async () => {
    const note = new Note({ content: "willremovethissoon"}) // A new note object is created based on the model.
    await note.save() // The note object is saved to the database.
    await note.deleteOne() // The note object is deleted from the database.

    return note._id.toString() // The ID of the note object is returned as a string.
}


// notesInDB - This function is used to fetch all notes from the database.
const notesInDB = async () => { 
    const notes = await Note.find({}) // The notes in the database are fetched.
    return notes.map(note => note.toJSON()) // The notes are returned as JSON objects.
}


module.exports = {
    initialNotes, 
    nonExistingId, 
    notesInDB
}
