import React from './react'
import ReactDOM from './react-dom'
//import { createRoot } from 'react-dom/client';

/**
 * 1. 函数组件是一个接收props属性对象，返回React元素的一个函数
 * 2.它的名称必须是大写字母开头  在React里面， 是通过首字母大小写来区分原生组件和内置组件的 div p  Func
 * 3.组件必须先定义再使用
 * 4.函数组件的返回值有且只能有一个根元素
 * 5.React元素的类型可以是一个字符串 span div p,也可以是一个函数组件类型
 * 6.我们可以给函数组件传递属性，最终他们会传递给props属性对象
 */
class Counter extends React.Component {
  constructor(props) {
    super(props)
    //组件里可以定义状态对象
    this.state = { number: 0 }
  }
  handleClick = event => {
    console.log(event.target) // 0
    //event.stopPropagation();
    this.setState({ number: this.state.number + 1 })
    console.log(this.state) // 0
    this.setState({ number: this.state.number + 1 })
    console.log(this.state) // 1
    setTimeout(() => {
      // 同步执行，不会批量
      this.setState({ number: this.state.number + 1 })
      console.log(this.state) // 2
      this.setState({ number: this.state.number + 1 })
      console.log(this.state) // 3
    }, 50)
  }
  handleDivClick = event => {
    console.log(event.target)
    console.log('handleDivClick')
  }
  render() {
    return (
      <div id="counter" onClick={this.handleDivClick}>
        <p>number:{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}
//ReactDOM.render 是17写的法
ReactDOM.render(<Counter />, document.getElementById('root'))

//createRoot(document.getElementById('root')).render(<Counter />);
