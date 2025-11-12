'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    await queryInterface.bulkInsert('books', [
      {
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        published_year: 1925,
        stock: 10,
        created_at: now,
        updated_at: now,
      },
      {
        id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        published_year: 1960,
        stock: 5,
        created_at: now,
        updated_at: now,
      },
      {
        id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
        title: '1984',
        author: 'George Orwell',
        published_year: 1949,
        stock: 8,
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('books', {
      id: [
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        'cccccccc-cccc-cccc-cccc-cccccccccccc',
      ],
    });
  },
};
