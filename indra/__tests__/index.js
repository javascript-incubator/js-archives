/* eslint-disable */
import { indraStoreFactory, IndraProvider, withIndraConnect } from '../src'
import React, { Children } from 'react'
import PropTypes from 'prop-types'
import TestUtils from 'react-dom/test-utils'

class Passthrough extends React.Component {
  render() {
    return <div />
  }
}

test('should receive the indrastore in the context', () => {
  class Container extends React.Component {
    render() {
      return <Passthrough {...this.props} />
    }
  }

  const ContainerWithIndraConnect = withIndraConnect(Container)

  const testIndraStore = indraStoreFactory({ test: 1 })

  const tree = TestUtils.renderIntoDocument(
    <IndraProvider indraStore={testIndraStore}>
      <div>
        <ContainerWithIndraConnect pass="through" />
      </div>
    </IndraProvider>
  )

  const container = TestUtils.findRenderedComponentWithType(tree, ContainerWithIndraConnect)
  expect(container.context.indraStore).toBe(testIndraStore)
});


test('should update the indrastore on calling setIndraStore', () => {
  class Container extends React.Component {
    render() {
      return <Passthrough {...this.props} />
    }
  }

  const ContainerWithIndraConnect = withIndraConnect(Container)

  const testIndraStore = indraStoreFactory({ test: null })

  const tree = TestUtils.renderIntoDocument(
    <IndraProvider indraStore={testIndraStore}>
      <div>
        <ContainerWithIndraConnect pass="through" />
      </div>
    </IndraProvider>
  )

  //Mutate with setIndraStore will update all connected components
  testIndraStore.setIndraStore({ test: 'Indra' })

  const container = TestUtils.findRenderedComponentWithType(tree, ContainerWithIndraConnect)
  expect(container.context.indraStore.getIndraStore().test).toBe('Indra')
});

test('should update the indrastore on mutating indraStore', () => {
  class Container extends React.Component {
    render() {
      return <Passthrough {...this.props} />
    }
  }

  const ContainerWithIndraConnect = withIndraConnect(Container)

  const testIndraStore = indraStoreFactory({ test: null })

  const tree = TestUtils.renderIntoDocument(
    <IndraProvider indraStore={testIndraStore}>
      <div>
        <ContainerWithIndraConnect pass="through" />
      </div>
    </IndraProvider>
  )

  //Mutate without setIndraStore will not update all connected components
  testIndraStore.getIndraStore().test = 'Indra'
  testIndraStore.setIndraStore()
  const container = TestUtils.findRenderedComponentWithType(tree, ContainerWithIndraConnect)
  expect(container.context.indraStore.getIndraStore().test).toBe('Indra')
});
