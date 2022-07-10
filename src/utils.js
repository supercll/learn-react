export const REACT_TEXT = Symbol('react.text')
export const REACT_FRAGMENT = Symbol('react.fragment') //类似于文档片断
//注意 此逻辑在源码里没有的，是我们的为了后面方便DOM-DIFF添加的
//经过包装之后所有的儿子元素都是一个对象，而且也都有类型，可以方便后面的比较
export function wrapToVdom(element) {
  return typeof element === 'string' || typeof element === 'number'
    ? {
        type: REACT_TEXT,
        props: element,
      }
    : element
}
