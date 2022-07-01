import { compareTowVdom, findDOM } from './react-dom'

function shouldUpdate(classInstance, nextState) {
  // 更新state
  classInstance.state = nextState
  classInstance.forceUpdate()
}

class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance
    this.pendingStates = []
  }
  addState(partialState) {
    // 将更新的state推入队列
    this.pendingStates.push(partialState)
    this.emitUpdate()
  }
  emitUpdate(nextProps) {
    this.updateComponent() //触发直接更新
  }
  updateComponent() {
    const { classInstance, pendingStates } = this
    if (pendingStates.length > 0) {
      //表示有将要进行的更新
      shouldUpdate(classInstance, this.getState())
    }
  }
  getState() {
    const { classInstance, pendingStates } = this
    let { state } = classInstance //获取 类的实例的老状态
    // 合并新老数据
    pendingStates.forEach(nextState => {
      state = { ...state, ...nextState }
    })
    pendingStates.length = 0
    return state
  }
}

export class Component {
  static isReactComponent = true // 标记为类组件
  constructor(props) {
    this.props = props
    this.state = {}
    //每个类组件的实例都配有一个自己的Updater更新器
    this.updater = new Updater(this)
  }
  setState(partialState) {
    this.updater.addState(partialState)
  }
  forceUpdate() {
    let oldRenderVdom = this.oldRenderVdom
    let oldDOM = findDOM(oldRenderVdom)
    let newRenderVdom = this.render()
    compareTowVdom(oldDOM.parentNode, oldRenderVdom, newRenderVdom)
    this.oldRenderVdom = newRenderVdom
  }
}
