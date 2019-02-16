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

Low Level API

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

