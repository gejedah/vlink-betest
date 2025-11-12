'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    await queryInterface.bulkInsert('carts', [
      {
        id: 'dddddddd-dddd-dddd-dddd-dddddddddddd',
        customer_id: '11111111-1111-1111-1111-111111111111',
        book_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        status: 'open',
        total: 29.99,
        created_at: now,
        updated_at: now,
      },
      {
        id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
        customer_id: '22222222-2222-2222-2222-222222222222',
        book_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        status: 'completed',
        total: 15.0,
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('carts', {
      id: [
        'dddddddd-dddd-dddd-dddd-dddddddddddd',
        'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
      ],
    });
  },
};
