import React from 'react'

const Part = ({courses}) => {
  return (
    <div>
      <h2>{courses.name}</h2>
      {courses.parts.map(( part )=> (
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
      ))}
    </div>
  )
}

export default Part