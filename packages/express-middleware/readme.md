## Hypergraph Express Middleware

_Fastest way to create Graphql Server with Express_

#### Installation

- `yarn add @gql-tools/hypergraph-express-middleware`

#### Usage

##### _middleware_

- Add Middleware

```js
import { middleware } from ' @gql-tools/hypergraph-express-middleware';

app.use('/graphql', middleware);
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
