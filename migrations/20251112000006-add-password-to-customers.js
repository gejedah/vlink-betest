'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Only add the column if it doesn't already exist (to be safe)
    const tableDescription = await queryInterface.describeTable('customers');
    if (!tableDescription.password) {
      await queryInterface.addColumn('customers', 'password', {
        type: Sequelize.STRING(255),
        allowNull: false,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Only remove the column if it exists
    const tableDescription = await queryInterface.describeTable('customers');
    if (tableDescription.password) {
      await queryInterface.removeColumn('customers', 'password');
    }
  },
};
