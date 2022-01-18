'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      poster: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      alias: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      trailer: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      description: {
        type: Sequelize.TEXT
      },
      cinemaId: {
        type: Sequelize.INTEGER,

      },
      isHot: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isNowShowing: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Movies');
  }
};