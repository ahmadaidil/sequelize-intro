'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      username: 'johndoe',
      password: '7b225d7aee95213c31efc1d6092e9c72b0a9e0d2c4f46f5209d5170c75af7da0',
      role: 'teacher',
      private_key: 'b31gd3gc',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      username: 'pakdengklek',
      password: 'e9fa28942932fe0ccda1d647261654afa849699b4183f3265150cd24288a6258',
      role: 'academic',
      private_key: '7696k0fi',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      username: 'charlesxavier',
      password: '7aabb620d37c353dc7cb5d2712e53c359ea0659ccb49fca6ba336b5490cfb0a2',
      role: 'headmaster',
      private_key: '2146j0ch',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
