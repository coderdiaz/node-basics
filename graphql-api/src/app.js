const express = require('express');
const app = express();
const { ApolloServer } = require('apollo-server-express');
const ExpressPlayground = require('graphql-playground-middleware-express').default;

const schema = require('./schema');
const resolvers = require('./resolvers');

const APP_PORT = 3001;

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

server.applyMiddleware({ app });
app.get('/playground', ExpressPlayground({ endpoint: '/graphql'}))

app.listen(APP_PORT, () => {
  console.log(`GraphQL API is listening on port ${APP_PORT}`);
});
