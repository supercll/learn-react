import React from './react'
import ReactDOM from './react-dom'
/**
 * 1. 函数组件是一个接收props属性对象，返回React元素的一个函数
 * 2.它的名称必须是大写字母开头  在React里面， 是通过首字母大小写来区分原生组件和内置组件的 div p  Func
 * 3.组件必须先定义再使用
 * 4.函数组件的返回值有且只能有一个根元素
 * 5.React元素的类型可以是一个字符串 span div p,也可以是一个函数组件类型
 * 6.我们可以给函数组件传递属性，最终他们会传递给props属性对象
 */
class Counter extends React.Component {
  static defaultProps = {
    name: 'lc', //定义默认属性
  }
  constructor(props) {
    super(props)
    this.state = { number: 0 }
    console.log('Counter 1.constructor')
  }
  componentWillMount() {
    console.log('Counter 2.componentWillMount')
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('Counter 5.shouldComponentUpdate')
    return nextState.number % 2 === 0 //偶数才更新
  }
  componentWillUpdate() {
    console.log('Counter 6.componentWillUpdate')
  }
  handleClick = () => {
    
    this.setState({ number: this.state.number + 1 })
  }

  render() {
    console.log('Counter 3.render')
    return (
      <div>
        <p>{this.state.number}</p>
        {this.state.number === 4 ? null : (
          <ChildCounter count={this.state.number} />
        )}
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
  componentDidUpdate() {
    console.log('Counter 7.componentDidUpdate')
  }
  componentDidMount() {
    console.log('Counter 4.componentDidMount')
  }
}
class ChildCounter extends React.Component {
  componentWillUnmount() {
    console.log('ChildCounter 6.componentWillUnmount')
  }
  componentWillReceiveProps(newProps) {
    console.log('ChildCounter 4.componentWillReceiveProps')
  }
  componentWillMount() {
    console.log('ChildCounter 1.componentWillMount')
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('ChildCounter 5.shouldComponentUpdate')

    return nextProps.count % 3 === 0
  }
  render() {
    console.log('ChildCounter 2.render')
    return <div>{this.props.count}</div>
  }
  componentDidMount() {
    console.log('ChildCounter 3.componentDidMount')
  }
}
ReactDOM.render(<Counter />, document.getElementById('root'))
