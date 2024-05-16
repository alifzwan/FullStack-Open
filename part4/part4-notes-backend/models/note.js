const mongoose = require('mongoose') // import mongoose

/* Define the schema for the Note

    Schema - structure that define the shape of the document
             within a MongoDB collection
           - it specifies the fields and their types, default values, validators, etc.
*/          

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true
    },
    important: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // indicate that this field has relationship to the User model
    }
})


// Define the toJSON method for the schema
// This method is used to format the object returned by Mongoose

noteSchema.set('toJSON', {
    transform:(document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString() // change _id to id
        delete returnedObject._id // remove _id
        delete returnedObject.__v // remove __v
    }
})

module.exports = mongoose.model('Note', noteSchema)