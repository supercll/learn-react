import { compareTwoVdom, findDOM } from './react-dom'

function shouldUpdate(classInstance, nextProps, nextState) {
  // 更新state
  let willUpdate = true
  // shouldComponentUpdate
  if (
    classInstance.shouldComponentUpdate &&
    !classInstance.shouldComponentUpdate(nextProps, nextState)
  ) {
    willUpdate = false
  }
  if (willUpdate && classInstance.componentWillUpdate) {
    classInstance.componentWillUpdate()
  }
  if (nextProps) {
    classInstance.props = nextProps
  }
  //不管shouldComponentUpdate返回true还是false,当前组件的state都会更新
  classInstance.state = nextState
  //只不过当willUpdate为true的时候，才会真正去更新界面
  if (willUpdate) classInstance.forceUpdate()
}

export const updateQueue = {
  isBathingUpdate: false, //是否是批量更新,如果为true就批量的异步的，如果是false非批量的，同步的
  updaters: new Set(),
  batchUpdate() {
    updateQueue.isBathingUpdate = false
    for (let updater of updateQueue.updaters) {
      updater.updateComponent()
    }
    updateQueue.updaters.clear()
  },
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
    this.nextProps = nextProps
    if (updateQueue.isBathingUpdate) {
      //如果是批量
      updateQueue.updaters.add(this) //就把当前的updater添加到set里保存
    } else {
      this.updateComponent() //直接更新
    }
  }
  updateComponent() {
    const { nextProps, classInstance, pendingStates } = this
    if (nextProps || pendingStates.length > 0) {
      //表示有将要进行的更新
      shouldUpdate(classInstance, nextProps, this.getState())
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
    //获取老的虚拟DOM获取老的真实DOM
    let oldDOM = findDOM(oldRenderVdom) //div#counter

    if (this.constructor.getDerivedStateFromProps) {
      let newState = this.constructor.getDerivedStateFromProps(
        this.props,
        this.state,
      )
      if (newState) {
        // 合并state
        this.state = { ...this.state, ...newState }
      }
    }
    let snapshot =
      this.getSnapshotBeforeUpdate && this.getSnapshotBeforeUpdate()
    let newRenderVdom = this.render() //渲染出新的虚拟DOM
    compareTwoVdom(oldDOM.parentNode, oldRenderVdom, newRenderVdom)
    this.oldRenderVdom = newRenderVdom
    if (this.componentDidUpdate) {
      this.componentDidUpdate(this.props, this.state, snapshot)
    }
  }
}
