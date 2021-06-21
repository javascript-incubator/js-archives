import { Component, Children } from 'react'
import PT from 'prop-types'

class IndraProvider extends Component {
  constructor (props, context) {
    super(props, context)
    this.indraStore = this.props.indraStore
  }

  getChildContext () {
    return { indraStore: this.indraStore }
  }

  render () {
    return Children.only(this.props.children)
  }
}

IndraProvider.childContextTypes = {
  indraStore: PT.object.isRequired
}

IndraProvider.propTypes = {
  indraStore: PT.object,
  children: PT.element.isRequired
}

export default IndraProvider
