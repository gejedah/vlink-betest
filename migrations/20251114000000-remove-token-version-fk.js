'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // remove the foreign key constraint from token_versions.user_id
    await queryInterface.removeConstraint('token_versions', 'fk_token_versions_user');
  },

  down: async (queryInterface, Sequelize) => {
    // re-add the foreign key constraint on rollback
    await queryInterface.addConstraint('token_versions', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_token_versions_user',
      references: {
        table: 'customers',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },
};
