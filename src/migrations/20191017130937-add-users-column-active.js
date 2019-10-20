'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'active', Sequelize.BOOLEAN);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'active');
  }
};
