const { gql } = require("apollo-server-express");
const User = require("./user");

const Query = gql`
  type Query {
    user(id: ID!): User
    users: [User!]
  }
`;

module.exports = [Query, User];
