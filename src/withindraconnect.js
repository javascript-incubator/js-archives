import { Component, createElement } from 'react'
import PT from 'prop-types'

const withIndraConnect = IndraConnectee => class IndraConnector extends Component {
  static contextTypes = {
    indraStore: PT.object
  }

  componentDidMount () {
    const { indraStore } = this.context
    this.unsubscribe = indraStore.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  render () {
    const { indraStore } = this.context
    return createElement(IndraConnectee, { indraStore, ...this.props })
  }
}

export default withIndraConnect
