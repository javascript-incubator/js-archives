#  react-delayer 🐢

A General Purpose Promise based Delayed Renderer for the React Components.
_As they say it's a Higher Order Component_

#### Features

Delayed Component rendering, well this

```javascript
  delayer([
      () => System.import('./container').then(module => module.default), // Component to be rendered
      () => System.import('./reducer').then(module => module.default), // -|  1st Promise (Curried)
      () => System.import('./sagas').then(module => module.default) //    -|  2nd Promise (Curried)
    ],
      (reducer) => injectReducer(store, { key: 'home', reducer }), // -] data received 1st after promise resolution
      (sagas) => injectSagas(store, sagas) // -] data received 2nd after promise resolution
    )(DefaultComponent /* Component to render before real component is loaded or failed*/)
```

##### Explanation

- The data resolved from the first promise must be a Component to be rendered, it usually used for code-splitting.

- Other promises are optional, the data received from those(_except first promise_) can be used in second to last arguments to take them in use, like in example.

- Component will be rendered after resolution of all the promises in array passed in 1st arg

```javascript
{.... Other Code ....}
    // Other promises
    () => getDataOne(), // -|  1st Promise (Curried)
    () => getDataTwo() //    -|  2nd Promise (Curried)
  ], // Component will be rendered after resolution of all promises
    (dataOne) => useData(dataOne),
    (dataTwo) => useData(dataTwo)
)(DefaultComponent /* Component to render before real component is loaded or failed*/)

```

#### Usage


###### Code Splitting

```javascript
  delayer([
    () => System.import('./container').then(module => module.default), // Component to be rendered
    () => System.import('./reducer').then(module => module.default),
    () => System.import('./sagas').then(module => module.default)
  ],
    (reducer) => injectReducer(store, { key: 'home', reducer }),
    (sagas) => injectSagas(store, sagas)
  )(DefaultComponent /* Component to render before real component is loaded or failed*/)
```

###### Action Dispatching

```javascript
  delayer([
    () => System.import('./component').then(module => module.default), // Component to be rendered
    () => getArtworks(),
    () => getArtists()
  ],
    (artworks) => dispatch({ type:'GOTARTWORKS', data: artworks}),
    (artists) => dispatch({ type:'GOTARTISTS', data: artists})
  )(DefaultComponent /* Component to render before real component is loaded or failed*/)
```


#### And many more involving Promises that I cannot think of right now. See ya 👋
