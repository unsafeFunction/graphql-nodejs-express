const userResolvers = {
  users: async (parent, args, { db }, info) => {
    const { User } = db;

    const users = User.findAll();

    return users;
  },
  user: async (parent, { id }, { db }) => {
    const { User } = db;

    const user = await User.findByPk(id);

    return user;
  }
};

const userMutation = {
  signUp: async (parent, { input }, { db }, info) => {
    const { User } = db;

    await User.create({
      ...input
    });

    return {
      token: "token"
    };
  },
  updateUser: async (parent, { id, input }, { db }, info) => {
    const { User } = db;

    const user = await User.update(
      { ...input },
      {
        where: {
          id
        },
        returning: true,
        plain: true
      }
    );

    return user[1].dataValues;
  }
};

module.exports = {
  userResolvers,
  userMutation
};
