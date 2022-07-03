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
class Form extends React.Component {
  input
  constructor(props) {
    super(props)
    this.input = React.createRef()
  }
  getFocus = () => {
    this.input.current.getFocus()
  }
  render() {
    return (
      <>
        <TextInput ref={this.input} />
        <button onClick={this.getFocus}>获得焦点</button>
      </>
    )
  }
}
class TextInput extends React.Component {
  input
  constructor(props) {
    super(props)
    this.input = React.createRef()
  }
  getFocus = () => {
    this.input.current.focus()
  }
  render() {
    return <input ref={this.input} />
  }
}
ReactDOM.render(<Form />, document.getElementById('root'))
//ReactDOM.render 是17写的法

//createRoot(document.getElementById('root')).render(<Counter />);
