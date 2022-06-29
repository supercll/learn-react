import React from './react'
import ReactDOM from './react-dom'
//let element = <h1 className='title' style={{ color: 'red' }}>hello</h1>
/**
 * 1. 函数组件是一个接收props属性对象，返回React元素的一个函数
 * 2.它的名称必须是大写字母开头  在React里面， 是通过首字母大小写来区分原生组件和内置组件的 div p  Func
 * 3.组件必须先定义再使用
 * 4.函数组件的返回值有且只能有一个根元素
 * 5.React元素的类型可以是一个字符串 span div p,也可以是一个函数组件类型
 * 6.我们可以给函数组件传递属性，最终他们会传递给props属性对象
 */
function FunctionComponent(props) {
  return (
    <h1 className="title" style={{ color: props.color }}>
      {props.name}:{props.children}
    </h1>
  )
  //return React.createElement('h1');
}

let element = (
  <FunctionComponent color="orange" name="lc" age={18}>
    我是函数组件的儿子
  </FunctionComponent>
)
class ClassComponent extends React.Component {
  render() {
    return (
      <div className="title" style={{ color: 'red' }}>
        <span>{this.props.name}</span>
        {this.props.children}
      </div>
    )
  }
}

let element2 = <ClassComponent name="hello">world</ClassComponent>

console.log(element2)
ReactDOM.render(element2, document.getElementById('root'))
// react核心设计React16
// React17 fiber
// React18 优先级调度，并发执行
