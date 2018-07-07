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
const resolveResolver = () => {
  const resolversPath = path.resolve(rootDir, conf.resolver);
  if (process.env.NODE_ENV === 'development')
    delete require.cache[resolversPath];
  return require(resolversPath);
};

module.exports =
  process.env.NODE_ENV === 'development'
    ? (context, options) => (req, res, next) =>
        graphqlExpress({
          schema: makeExecutableSchema({
            typeDefs: mergeTypes(typesArray, { all: true }),
            resolvers: resolveResolver(),
          }),
          context,
          ...options,
        })(req, res, next)
    : (context, options) =>
        graphqlExpress({
          schema: makeExecutableSchema({
            typeDefs: mergeTypes(typesArray, { all: true }),
            resolvers: resolveResolver(),
          }),
          context,
          ...options,
        });
