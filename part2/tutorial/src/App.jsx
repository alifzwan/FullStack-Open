import React, {useState, useEffect} from 'react'
import axios from 'axios'
import noteService from './services/notes'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'

//* useEffect - used to perfom side effects(data fetching) in function components

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error occurs...')

  // get() - fetches the data
  useEffect(() => {
    console.log('effect')

    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  

  // post() - creates a new resource
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  // put() - updates the resource
  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} needs to be toggled`)


    const note = notes.find(n => n.id === id) // find the note to be updated

    const changeNote = { ...note, important: !note.important }  // create a new object with the updated importance

    noteService // send a put request to the server
      .update(id, changeNote) 
      .then(returnedNote => { 
        setNotes(notes.map(n => n.id !== id ? n : returnedNote)) 
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }





  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <div>

      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>


      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App