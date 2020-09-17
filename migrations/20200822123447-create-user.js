module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "User",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        email: {
          type: Sequelize.STRING,
          validate: {
            isEmail: true
          }
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        firstName: {
          type: Sequelize.STRING
        },
        lastName: {
          type: Sequelize.STRING
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      },
      {
        timestamps: true
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("User");
  }
};
