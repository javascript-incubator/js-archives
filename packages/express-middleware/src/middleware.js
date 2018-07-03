const path = require('path');
const rc = require('rc');
const { graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { fileLoader, mergeTypes } = require('merge-graphql-schemas');

const conf = rc('hypergraph', {
  resolver: 'graphs/resolvers.js',
  types: 'graphs/types',
  root: process.cwd(),
});

const rootDir = process.cwd();

const typesArray = fileLoader(path.resolve(rootDir, conf.types), {
  recursive: true,
});

/* eslint-disable import/no-dynamic-require */
module.exports = graphqlExpress({
  schema: makeExecutableSchema({
    typeDefs: mergeTypes(typesArray, { all: true }),
    resolvers: require(path.resolve(rootDir, conf.resolver)),
  }),
});
