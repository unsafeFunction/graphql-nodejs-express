const { userResolvers, userMutation } = require("./user");

const rootResolver = {
  Query: {
    ...userResolvers
  },
  Mutation: {
    ...userMutation
  }
};

module.exports = rootResolver;
