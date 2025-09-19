'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tasks', [{
      projectId: 1,
      title: 'Comprar malas',
      description: 'Comprar malas suficientes para trazer todas as muambas, mas sem ultrapassar o limite estabelecido pela legislação e a norma da compania aérea.',
      status: 'in progress',
      priority: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
