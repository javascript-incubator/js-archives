## runiffn

> Run function with rest args if Function supplied otherwise returns the provided value.

#### High Level API

```js

const runiffn = require('runiffn');

const getConfig = config => runiffn(config, webpack);

const config = {
    // Omiitted for brevity
};

getConfig(config) === config;

const config = webpack = ({
    // Omiitted for brevity
});

getConfig(config) === config(webpack);
```

#### Low Level API

```js
const { iffn, bimap, run } = require('runiffn');

const getResult = val = iffn(val)
  |> bimap(fn => arg => fn(arg) + 'this is runiffn')(str => str + 'this is runiffn')
  |> run('hello');

getResult('world! ');
// => world! this is runiffn

getResult(str => str + ' world! ');
// => hello world! this is runiffn
```

#### Recreate Redux-thunk

> Before

```js
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}
```

> After

```js
const rightMap = bimap(_ => _);
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    return (
      iffn(action)
      |> rightMap(_action => next(_action)) // Same as bimap(_ => _, _action => next(_action))
      |> run(dispatch, getState, extraArgument)
    );
  };
}
```