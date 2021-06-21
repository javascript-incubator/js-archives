const graphqlPlaygroundExpress = require('graphql-playground-middleware-express')
  .default;

module.exports = endpoint => graphqlPlaygroundExpress({ endpoint });
