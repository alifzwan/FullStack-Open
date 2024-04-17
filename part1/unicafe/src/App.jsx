import React, { useState } from 'react'


// 1.6: unicafe step 1
// 1.7: unicafe step 2
// 1.8: unicafe step 3
// 1.9: unicafe step 4
// 1.10: unicafe step 5
// 1.11*: unicafe step 6





const App = () => {
  const anectodes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]  
  const [selected, setSelected] = useState(0)
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }

  

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <Statistic title='statistic' good={good} neutral={neutral} bad={bad} />
    </div>
  )
}
//
const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistic = (props) => {
  if(props.good === 0 && props.neutral === 0 && props.bad === 0){
    return(
      <div>
        <h1>{props.title}</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  
  
  return(
    <div>
      <table>
        <h1>{props.title}</h1>
        <StatisticLine text='good' value={props.good}/>
        <StatisticLine text='neutral' value={props.neutral} />
        <StatisticLine text='bad' value={props.bad} />
        <StatisticLine text='allScore' value={props.good + props.neutral + props.bad} />
        <StatisticLine text='average' value={(props.good - props.bad)/(props.good + props.neutral + props.bad)} />
        <StatisticLine text='positive' value={props.good/(props.good + props.neutral + props.bad)*100 + '%'} />
      </table>
      
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </tbody>
  )
}

export default App