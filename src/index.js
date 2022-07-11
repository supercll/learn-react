import React from './react'
import ReactDOM from './react-dom'
class ClassComponent extends React.PureComponent {
  render() {
    console.log('ClassComponent render')
    return <div>ClassComponent:{this.props.number}</div>
  }
}
function FunctionComponent(props) {
  console.log('FunctionComponent render')
  return <div>FunctionComponent:{props.number}</div>
}
const MemoFunctionComponent = React.memo(FunctionComponent)
console.log(MemoFunctionComponent)
class App extends React.Component {
  state = { number: 0 }
  amountRef = React.createRef()
  handleClick = () => {
    let nextNumber = this.state.number + parseInt(this.amountRef.current.value)
    this.setState({ number: nextNumber })
  }
  render() {
    return (
      <div>
        <ClassComponent number={this.state.number} />
        <MemoFunctionComponent number={this.state.number} />
        <input ref={this.amountRef} />
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
