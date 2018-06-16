const path = require("path");
const fs = require("fs");
const rc = require("rc");
const { graphqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const conf = rc("hypergraph", {
  resolver: "graphs/resolvers.js",
  types: "graphs/types",
  root: process.cwd()
});

const rootDir = process.cwd();

const types = fs.readdirSync(path.resolve(rootDir, conf.types));

const typeDefs = types
  .map(x => fs.readFileSync(path.resolve(rootDir, conf.types, x)).toString())
  .reduce((acc, x) => acc.concat(x), "");

module.exports = graphqlExpress({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers: require(path.resolve(rootDir, conf.resolver))
  })
});
