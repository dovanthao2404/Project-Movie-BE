'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn(
      'Tickets',
      'movieShowTime'
    );
    return queryInterface.addColumn(
      'Tickets',
      'movieShowtime',
      Sequelize.DATE,
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn(
      'Tickets',
      'movieShowtime',
    );
    return queryInterface.addColumn(
      'Tickets',
      'movieShowTime',
      Sequelize.DATE,
    );
  }
};
