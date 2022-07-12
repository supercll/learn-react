import React from './react'
import ReactDOM from './react-dom'
// function reducer(state = { number: 0 }, action) {
//   switch (action.type) {
//     case 'ADD':
//       return { number: state.number + 1 }
//     case 'MINUS':
//       return { number: state.number - 1 }
//     default:
//       return state
//   }
// }
// function App() {
//   const [state, dispatch] = React.useReducer(reducer, { number: 0 })
//   return (
//     <div>
//       <p> Counter:{state.number}</p>
//       <button onClick={() => dispatch({ type: 'ADD' })}>+</button>
//       <button onClick={() => dispatch({ type: 'MINUS' })}>-</button>
//     </div>
//   )
// }
function App() {
  const [number, setNumber] = React.useState(() => 0)
  const handleClick = () => {
    setTimeout(() => {
      setNumber(number + 1)
    }, 1000)
  }
  const handleClickDelay = () => {
    setTimeout(() => {
      setNumber(number => number + 1)
    }, 2000)
  }
  return (
    <div>
      <p>{number}</p>
      <button onClick={handleClick}>handleClick</button>
      <button onClick={handleClickDelay}>handleClickDelay</button>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
