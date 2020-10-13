const express = require('express');
const app = express();
const { ApolloServer } = require('apollo-server-express');
const ExpressPlayground = require('graphql-playground-middleware-express').default;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const schema = require('./schema');
const resolvers = require('./resolvers');
const { UserModel } = require('./models/User');
const { GraphQLError } = require('graphql');

const APP_PORT = 3001;

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => {
    let user;
    const token = req.headers.authorization;
    if (token) {
      const validToken = jwt.verify(token, 'secretkey');
      if (validToken) {
        const { userId } = validToken;
        user = await UserModel.findById(userId);
      }
    }

    return { ...req, user };
  }
});

server.applyMiddleware({ app });
app.get('/playground', ExpressPlayground({ endpoint: '/graphql'}))

// mongodb://<host>:<port>@<user>:<password>/<database>
mongoose.connect(`mongodb://localhost/ecommerce`, {
  useNewUrlParser: true,
  useUnifiedTopology:true
}).then(() => {
  app.listen(APP_PORT, () => {
    console.log(`GraphQL API is listening on port ${APP_PORT}`);
    console.log(`Connected to MongoDB successfully`);
  });
}).catch(err => {
  throw err;
});
