import { updateQueue } from './Component'
/**
 * 给DOM节点绑定事件，
 * @param {*} dom 真实的DOM节点 button
 * @param {*} eventType 事件类型 onclick
 * @param {*} handler 原始的事件处理函数 handleClick
 */
export function addEvent(dom, eventType, handler) {
  let store = dom.store || (dom.store = {}) //保证DOM节点有一个自定义的属性对象
  store[eventType] = handler //store.onclick=handler 把处理函数保存到真实DOM节点上
  if (!document[eventType]) document[eventType] = dispatchEvent //document.onclick  = dispatchEvent
  debugger
}

/**
 * 合成事件
 * 1.屏蔽浏览器的差异 类似于jquery的功能
 * @param {*} event 真实的事件对象
 */
function dispatchEvent(event) {
  // 只要添加合成事件时，就把批量更新设置为true
  updateQueue.isBathingUpdate = true //在事件函数执行前，让批量更新标志设置为true
  let { target, type } = event //target=button真实DOM,type事件类型click
  //target指的是事件源，点谁就是谁.它在冒泡的过程是不是变的
  let eventType = `on${type}` //onclick
  const { store } = target
  let handler = store && store[eventType]
  handler && handler(event)
  updateQueue.batchUpdate()
}
