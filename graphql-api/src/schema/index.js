const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    status: String
    products: [Product]
  }

  type Mutation {
    createProduct(input: InputCreateProduct!): Product
  }

  type Product {
    _id: ID
    name: String
    price: Float
    description: String
    featuredImage: String
  }

  input InputCreateProduct {
    name: String!
    price: Float!
    description: String
    featuredImage: String!
  }
`;

module.exports = typeDefs;