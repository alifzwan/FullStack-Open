import React from 'react'

const Content = ({ courses }) => {
  return (
   <div>
    {courses.map((course)=>( 
        <div key={course.id}>
            <b>
              {course.name}
            </b>
            {course.parts.map((part)=> ( 
              <p key={part.id}>
                {part.name} {part.exercises}
              </p>
            ))}

        </div>
      ))}
   </div>
  )
}

const Header = ({ header }) => {
  return (
    <h1>{header}</h1>
  )
}


const App = () => {
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

  const total = courses.reduce((s, course) => { 
    const result = s + course.parts.reduce((sum, part) => sum + part.exercises, 0);
    return result
  }, 0);


  return (
   <div>
      <Header header='Web development curriculum' />
      <Content courses ={courses}/>
      <b>total of {total} exercises</b>
   </div> 
  )
}

export default App