const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: ID
    firstName: String!
    lastName: String!
    email: String
    dob: String
  }

  input UserInput {
    firstName: String!
    lastName: String!
  }

  type Mutation {
    createUser(input: UserInput): User
    updateUser(id: ID!, input: UserInput): User
  }
`;
