const jsonwebtoken = require("jsonwebtoken");
const { validatePassword } = require("../utils/password");
const generateToken = require("../utils/auth");

const userResolvers = {
  users: async (parent, args, context, info) => {
    const { User } = context.db;
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

    const user = await User.create({
      ...input
    });

    const token = generateToken({ email: user.email, id: user.id }, "4h");

    return {
      token
    };
  },
  signIn: async (parent, { input }, { db }) => {
    const { User } = db;
    const { email, password: inputPassword } = input;

    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user) {
      throw new Error("Email not exist");
    }

    const isPasswordValid = await validatePassword(
      inputPassword,
      user.password
    );

    if (isPasswordValid) {
      const token = generateToken({ email: user.email, id: user.id }, "4h");

      return {
        token
      };
    }
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
