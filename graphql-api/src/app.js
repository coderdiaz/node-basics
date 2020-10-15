require('dotenv').config();

const express = require('express');
const app = express();
const { ApolloServer } = require('apollo-server-express');
const ExpressPlayground = require('graphql-playground-middleware-express').default;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const schema = require('./schema');
const resolvers = require('./resolvers');
const { UserModel } = require('./models/User');

const APP_PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => {
    let user;
    const token = req.headers.authorization;
    if (token) {
      const validToken = jwt.verify(token, process.env.JWT_SECRET);
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
mongoose.connect(process.env.MONGODB_URI, {
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
