import React from 'react'

const Person = ({ filteredPersons }) => {
  return (
    <div>
      <ul>
        {filteredPersons.map((person) => 
          <li key={person.id}>{person.name} {person.number} </li>
        )}
      </ul>
    </div>
  )
}

export default Person