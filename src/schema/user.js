const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: ID
    firstName: String
    lastName: String
    email: String!
    dob: String
    password: String!
  }

  type Token {
    token: String!
  }

  input UserInput {
    email: String!
    password: String!
  }

  type Mutation {
    signIn(input: UserInput): Token!
    signUp(
      input: UserInput
      firstName: String
      lastName: String
      dob: String
    ): Token!
    updateUser(id: ID!, input: UserInput): User
  }
`;
