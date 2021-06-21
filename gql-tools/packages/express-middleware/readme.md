## Hypergraph Express Middleware

_Fastest way to create Graphql Server with Express_

#### Installation

- `yarn add @gql-tools/hypergraph-express-middleware`

#### Usage

##### _middleware_

- Add Middleware

```js
import { middleware } from ' @gql-tools/hypergraph-express-middleware';

const context = { dbConnection, otherGlobals };
app.use('/graphql', middleware(context));
```

- Now place your Resolvers in `graphs/resolvers.js`.

- And your types in `graphs/types`.

- You can change default locations by defining new paths in `.hypergraphrc` in your project root.

```json
{
  "types": "some/other/graphs",
  "resolvers": "src/other/resolvers"
}
```

##### _playground_

```js
import { playground } from ' @gql-tools/hypergraph-express-middleware';

app.use('/graphiql', playground(/* graphql route*/ '/graphql'));
```

##### _merge_

- Merges two graphql resolvers, useful if you want to divide resolver to different files

### Why Hypergraph? or Hot-ish Reloading of Resolvers

- Hypergraph seperates your main node application with the graphql resolvers. You can have separate Dev Servers for your resolvers and Node Server so whenever there are changes in Resolvers only the resolver server is reloaded.

- Hypergraph does cache invalidation during development in order to achieve `hot-ish reloading` for Resolvers, so it relies on `NODE_ENV` environment variable. Server reloading will not work if there's no `NODE_ENV` var present.

- Hot Reloading can be achieved with any server, nodemon or webpack-dev-server or both(Required that only one does reloading).

eg with Nodemon

```js
const resolverReload = nodemon({
  script: 'path to root resolver',
  watch: ['root resolver', 'types dir if you want'],
  nodeArgs: process.argv.slice(2),
}).on('quit', process.exit);

const expressReload = nodemon({
  script: 'path to express app',
  watch: ['express dir'],
  nodeArgs: process.argv.slice(2),
}).on('quit', process.exit);
```
