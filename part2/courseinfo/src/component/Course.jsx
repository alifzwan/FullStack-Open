import React from 'react'
import Header from './Header'
import Content from './Content'

const Course = () => {
    const courses = [{
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },

    
    {
      name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
    }
  ]

  const totalHalfStack = courses[0].parts.reduce((s, part) => { 
    const result = s + part.exercises
    return result

  }, 0);

  const totalNode = courses[1].parts.reduce((s, part) => {
    const result = s + part.exercises
    return result
  }, 0);

  
  return (
    <div>
        <Header header='Web development curriculum'/>
        <Content courses={courses[0]}/>
        <b>total of {totalHalfStack} exercises</b>
        <Content courses={courses[1]}/>
        <b>total of {totalNode} exercises</b>
    </div>

  )
}

export default Course