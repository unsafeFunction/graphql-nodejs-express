const { Model } = require("sequelize");
const { hashPassword } = require("../src/utils/password.js");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      firstName: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      lastName: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "User"
    }
  );
  User.addHook("beforeCreate", user => {
    user.password = hashPassword(user.password);
  });

  return User;
};
