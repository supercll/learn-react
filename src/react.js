import { wrapToVdom } from './utils'
import { REACT_ELEMENT, REACT_FORWARD_REF } from './constants'
import { Component } from './Component'
function createElement(type, config, children) {
  let ref //是后面用来获取真实DOM元素的
  let key //用来实现DOM-DIFF，高效快速进行DOM比较
  if (config) {
    delete config.__source
    delete config.__self
    ref = config.ref
    delete config.ref
    key = config.key
    delete config.key
  }
  let props = { ...config }
  if (arguments.length > 3) {
    //如果有多个儿子，那此处就是一个数组
    props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom)
  } else {
    //如果只有一个儿子，children是对象或者说字符串，如果没有儿子，就是undefined
    //children不一定是数组
    props.children = wrapToVdom(children)
  }
  return {
    $$typeof: REACT_ELEMENT, //表示这是一个虚拟DOM，也就是说这是一个React元素
    type, //虚拟DOM元素的类型
    ref,
    key,
    props, //这是属性对象 id  className style ....
  }
}
function createRef() {
  return { current: null }
}
function forwardRef(render) {
  return {
    $$typeof: REACT_FORWARD_REF,
    render,
  }
}
const React = {
  createElement,
  Component,
  createRef,
  forwardRef,
}
export default React
