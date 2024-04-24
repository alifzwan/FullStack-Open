import React from 'react'

const Person = ({ persons }) => {
  return (
    <div>
      <ul>
        {persons.map((person) => 
          <li key={person.id}>{person.name} {person.number} </li>
        )}
      </ul>
    </div>
  )
}

export default Person