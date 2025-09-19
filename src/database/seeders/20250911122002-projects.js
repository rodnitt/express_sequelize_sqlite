'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Projects', [{
      name: 'Viagem ao Himalaia',
      summary: 'Hora de fazer uma viagem inesquecível!',
      startDate: new Date(2026, 2, 12),
      dueDate: new Date(2026, 2, 24),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Jantar com Kim Jong-Ul',
      summary: 'Estreitando laços nunca antes vistos.',
      startDate: new Date(2027, 0, 31),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Projects', null, {});
  }
};
