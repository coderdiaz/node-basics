const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    status: String
    products: [Product]
    users(
      page: Int = 1,
      limit: Int = 10,
      sort: SortDirection = DESCENDING,
      sortBy: SortableUserField = createdAt
    ): [User]
  }

  enum SortDirection {
    ASCENDING,
    DESCENDING
  }

  enum SortableUserField {
    createdAt
  }

  type Mutation {
    createProduct(input: InputCreateProduct!): Product
    createUser(input: InputCreateUser!): User
    signup(input: InputSignup!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }

  type Product {
    _id: ID
    name: String
    price: Float
    description: String
    featuredImage: String
  }

  type User {
    _id: ID
    name: String
    email: String
    rol: String
    createdAt: String
  }

  type AuthPayload {
    token: String
    user: User
  }

  input InputCreateProduct {
    name: String!
    price: Float!
    description: String
    featuredImage: String!
  }

  input InputCreateUser {
    email: String!
    name: String!
    password: String!
    rol: String!
  }

  input InputSignup {
    email: String!
    name: String!
    password: String!
  }
`;

module.exports = typeDefs;