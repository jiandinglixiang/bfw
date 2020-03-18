import React from 'react'

export default class TryCatch extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError (err) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    console.log(err)
    return { hasError: true }
  }

  render () {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1 style={{ textAlign: 'center' }}>加载失败...</h1>
    }

    // eslint-disable-next-line react/prop-types
    return this.props.children
  }
}
