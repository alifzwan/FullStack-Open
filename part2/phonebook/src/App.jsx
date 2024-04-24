import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'


// 2.6: The Phonebook Step 1
// 2.7: The Phonebook Step 2
// 2.8: The Phonebook Step 3
// 2.9*: The Phonebook Step 4
// 2.10: The Phonebook Step 5






const App = () => {
  
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchName, setSearchName] = useState('')

    // 2.11: The Phonebook Step 6
    useEffect(() => {
      console.log('Effect')
      
      axios
        .get('http://localhost:3001/persons')
        .then(response => {
          console.log('promise fulfilled')
          setPersons(response.data)
        })
     
    }, [])
    
    console.log('render', persons.length, 'persons')
    

    const addPerson = (event) => {
      event.preventDefault()
      const nameExists = persons.some(person => person.name === newName ) // Check if name already exists in phonebook
      const numberExists = persons.some(person => person.number === newNumber ) // Check if number already exists in phonebook

      if (nameExists) { // If name already exists, alert user
        alert(`${newName} is already added to phonebook`)
      } else if(numberExists) { // If number already exists, alert user
        alert(`${newNumber} is already added to phonebook`)
      }
        else { // If name does not exist, add name to phonebook
        setPersons(persons.concat({name: newName, number: newNumber})) 
        setNewName('') // Clear input field
        setNewNumber('') // Clear input field
      }

    }



    const handleNameChange = (event) => {
      console.log(event.target.value)
      setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
      console.log(event.target.value)
      setNewNumber(event.target.value)
    }

    const handleSearchChange = (event) => {
      console.log(event.target.value)
      setSearchName(event.target.value)
    }

    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
    

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={searchName} onChange={handleSearchChange}/>


            <h2>add a new</h2>
            <PersonForm 
              onSubmit={addPerson}
              nameValue={newName}
              numberValue={newNumber}
              nameChange={handleNameChange}
              numberChange={handleNumberChange}
            />


            
            <h2>Numbers</h2>
            <Person persons={filteredPersons}/>
            
        </div>
    )
}

export default App