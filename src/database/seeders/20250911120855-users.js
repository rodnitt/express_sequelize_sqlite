'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: 'Amarildo Junio',
      email: 'amarildojr@crentes.com',
      password: 'd3uSEh++',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Paola Longa',
      email: 'longapao@sshop.com',
      password: '1uxur33A',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Etevildo Maurus',
      email: 'et_mau@ovni.com',
      password: 'in1mig0D4CIA',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
