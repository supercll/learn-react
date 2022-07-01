import React from './react'
import ReactDOM from './react-dom'
let element1 = (
  <div className="title" style={{ color: 'red' }}>
    <h2>hello</h2>world
  </div>
)
console.log(element1)
console.log(JSON.stringify(element1, null, 2))

ReactDOM.render(element1, document.getElementById('root'))
// react核心设计React16
// React17 fiber
// React18 优先级调度，并发执行
