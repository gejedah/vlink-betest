'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    await queryInterface.bulkInsert('customers', [
      {
        id: '11111111-1111-1111-1111-111111111111',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        phone: '+15551234567',
        status: 'active',
        created_at: now,
        updated_at: now,
      },
      {
        id: '22222222-2222-2222-2222-222222222222',
        name: 'Bob Smith',
        email: 'bob@example.com',
        phone: '+15557654321',
        status: 'active',
        created_at: now,
        updated_at: now,
      },
      {
        id: '33333333-3333-3333-3333-333333333333',
        name: 'Carol Lee',
        email: 'carol@example.com',
        phone: null,
        status: 'inactive',
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('customers', {
      id: [
        '11111111-1111-1111-1111-111111111111',
        '22222222-2222-2222-2222-222222222222',
        '33333333-3333-3333-3333-333333333333',
      ],
    });
  },
};
