const Header = (props) => {
  return(
    <h1>{props.course}</h1>
  )
}

// 1.2: Course Information, step 2
const Content = () => {
  return (
    <div>
      <Part />
      <Part />
      <Part />
    </div>
  )
}

const Part = () => {
  const content = [
    {part1: 'Fundamentals of React'   , exercises1 : 10},
    {part2: 'Using props to pass data', exercises2 :  7},
    {part3: 'State of a component'    , exercises3 : 14}
  ]

  return(
    <div>
      <p>{content[0].part1} {content[0].exercises1}</p>
      <p>{content[1].part2} {content[1].exercises2}</p>
      <p>{content[2].part3} {content[2].exercises3}</p>
    </div>

  )
}

const Total = () => {
  const content = [
    {part1: 'Fundamentals of React'   , exercises1 : 10},
    {part2: 'Using props to pass data', exercises2 :  7},
    {part3: 'State of a component'    , exercises3 : 14}
  ]
  return(
    <p>Number of exercises {content[0].exercises1 + content[1].exercises2 + content[2].exercises3}</p>
  )

}



//1.1: Course Information, step 1
const App = () => {
  // const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course='Half Stack application development'/>
      <Content />
      <Total />
    </div>
  )
}

export default App