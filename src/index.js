import React, { Component } from 'react'

const delayer = (loaderPromises, ...thunks) => DefaultComponent => class AsyncComponent extends Component {
  static Component = null

  state = { Component: AsyncComponent.Component }

  componentWillMount () {
    if (!this.state.Component) {
      Promise.all(loaderPromises.map(x => x())).then(([Component, ...fns]) => {
        AsyncComponent.Component = Component
        thunks.map((x, i) => x(fns[i]))
        this.setState({ Component })
      })
    }
  }

  render () {
    const { Component } = this.state
    if (Component) {
      return <Component {...this.props} />
    }
    if (DefaultComponent) return <DefaultComponent />
    return <div />
  }
}

/* Quick and Dirty Code Splitting in RRv4
https://gist.github.com/acdlite/a68433004f9d6b4cbc83b5cc3990c194
*/
export default delayer
