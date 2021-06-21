#  Indra

[![Build Status](https://travis-ci.org/rajatsharma305/indra.svg?branch=master)](https://travis-ci.org/rajatsharma305/indra)
[![Coverage Status](https://coveralls.io/repos/github/rajatsharma305/indra/badge.svg?branch=master)](https://coveralls.io/github/rajatsharma305/indra?branch=master)

_<h3>Simple Mutable State Container<h3>_


<img src='inspiration.png' />

### What is Indra ?

Indra is State container just like Redux, it stores mutable state so that your redux-store stays mutation free and your components stay functional.

### Why Indra?

Redux introduces new paradigm of changing Application state by storing application state in a single immutable object, which is replaced by next state created by Reducers.

There are libraries which expose classes/services to manipulate views state provided by them. Some of these libraries are :-

- [Leaflet](http://leafletjs.com/index.html) _(Services of the Map like L.map, which includes methods like map.addFeatureLayer etc.)_
- [Esri Arcgis](https://developers.arcgis.com/javascript/) _(Services of the Map like Map, Views, which include methods like map.addFeatureLayer, view.setExtent etc.)_
- Google Maps

In order to use these libraries with Redux we can use instances of the services provided in our components locally, The component will be able to use these services internally, but no state manipulation can be done from outside the component or other components will not be able to access the instances. 🙅‍

Another method is to add these services in redux-store as Application state so that they can be accessible by every component, but the state should be normalized in Redux-store, hence functions or classes provided by these services will not be stored in Redux-store. 🤷‍

In these scenarios, Indra can help by creating another state container which can accommodate these services and can provide the services to the components connected to Indra.⚡️

Now we can use these services in our components locally and all the connected components will respond to the changes or we can use side-effects like Thunks, Sagas, Epics to use these services which will help in keeping our components functional.

Indra is useful when you want to use react/redux with javascript libraries which does DOM manipulation, Indra separates the DOM manipulation and mutable state from the redux store keeping your redux part of your application free from mutations.

### Installation and Usage

`npm install --save indra`

**API is under development and still unstable please don't use in any production projects**

##### _Creating Indra Store_


```javascript
// ...Other imports
import { indraStoreFactory, IndraProvider, withIndraConnect } from 'indra'

const Passthrough = ({ name }) => <h1>Hello! this is {name}</h1>
// Component using the indra Store

const Container = ({ indraStore }) => <Passthrough name={indraStore.getIndraStore().name} />
// Container which will pass props from indraStore to it's Children

const ContainerWithIndraConnect = withIndraConnect(Container)
// Container is connected to indra so that it can get indraStore as props

const testIndraStore = IndraStoreFactory({ name: 'Indra' })
// creating a dummy indraStore

const App = () => <IndraProvider indraStore={testIndraStore}>
  <div>
    <ContainerWithIndraConnect />
    <AnyOtherComponent/>
  </div>
</IndraProvider>

//Surrounding indraProvider to all the components so they can connect to Indra Store

ReactDOM.render(<App/> , document.getElementById('root'))

```

This will result in
<h1>Hello! this is Indra</h1>

##### _Mutating Indra Store_

```javascript

const Passthrough = ({ name }) => <h1>Hello! this is {name}</h1>

const Container = ({ indraStore }) => <Passthrough name={indraStore.getIndraStore().name} />

const ContainerWithIndraConnect = withIndraConnect(Container)

const testIndraStore = indraStoreFactory({ test: null })

const tree = TestUtils.renderIntoDocument(
  <IndraProvider indraStore={testIndraStore}>
    <div>
      <ContainerWithIndraConnect pass="through" />
    </div>
  </IndraProvider>
)

//Mutate without setIndraStore will not update connected components
testIndraStore.getIndraStore().test = 'Indra'

```

##### _Mutating Indra Store and Updating Connected Components_

```javascript

//Mutate with setIndraStore will update all connected components
testIndraStore.setIndraStore({ test: 'Indra' })
// or
testIndraStore.getIndraStore().test = 'Indra'
testIndraStore.setIndraStore()

```
The above Code will update all connected components with new indraStore

**It is advised to not to use `testIndraStore.setIndraStore` as much as possible, if you want your components to be updated use redux for that**


Built with [⚔️ Crossgear](https://github.com/rajatsharma305/crossgear)
