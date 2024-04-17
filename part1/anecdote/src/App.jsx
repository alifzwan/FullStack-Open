import React, { useState } from "react";


// 1.12*: anecdotes step 1
// 1.13*: anecdotes step 2
// 1.14*: anecdotes step 3



const Button = ({ onClick }) => {
  return (
    <button onClick={onClick}>next anecdote</button>
  )
}
const Anecdote = ({ anecdote }) => {
  return (
    <p>{anecdote}</p>
  )
}
const VoteButton = ({ onClick }) => {
  return (
    <button onClick={onClick}>vote</button>
  )
}

const Title = ({ title }) => {
  return (
    <h1>{title}</h1>
  )
}

const App = () => {
  const anecdotes = [
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
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0)) // fill an an array with the length of the anecdotes array with zeros

  const nextAnecdote = () => {
    let nextQuote = Math.floor(Math.random() * Math.floor(anecdotes.length));  // grab a random anecdote
    setSelected(nextQuote)
  }
  const voteIncrease = () => {
    const increase = [...vote]; // spread operator to create a copy of the array
    increase[selected] += 1;    // increase the value of the selected anecdote by 1
    setVote(increase);         // set the new array with the updated value
  }

  const highestVote = Math.max(...vote)
  const highestVoteIndex = anecdotes[vote.indexOf(highestVote)] // find the highest value in the array of votes

  return (
    <div>
      <Title title = "Anecdote of the day"/>
      <Anecdote anecdote = {anecdotes[selected]}/>
      <p>has {vote[selected]} votes</p>
      <VoteButton onClick={voteIncrease}/>
      <Button onClick={nextAnecdote}/>
      <Title title = "Anecdote with most votes" />
      <Anecdote anecdote = {highestVoteIndex}/>
      <p>has {highestVote} votes</p>
    </div>
  )
}

export default App