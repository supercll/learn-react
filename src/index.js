import React from './react'
import ReactDOM from './react-dom'
class Counter extends React.Component {
  constructor() {
    super()
    this.state = { list: ['A', 'B', 'C', 'D', 'E', 'F'] }
  }
  handleClick = () => {
    this.setState({
      list: ['A', 'C', 'E', 'B', 'G'],
    })
  }
  render() {
    return (
      <React.Fragment>
        <ul>
          {this.state.list.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <button onClick={this.handleClick}>点击</button>
      </React.Fragment>
    )
  }
}
ReactDOM.render(<Counter />, document.getElementById('root'))
