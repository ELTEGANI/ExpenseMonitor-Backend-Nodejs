const Sequelize = require('sequelize');
const sequelize = require('../config/configration');

const userExpenses = sequelize.define('userExpenses', {
 id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    allowNull: false
},
amount: {
  type: Sequelize.STRING,
  allowNull: false
},
description: {
    type: Sequelize.STRING,
    allowNull: false
},
expenseCategory: {
    type: Sequelize.STRING,
    allowNull: false
},   
expesnseFrom: {
    type: Sequelize.STRING,
    allowNull: false
},
date: {
    type: Sequelize.DATEONLY,
    allowNull: false
}
});

module.exports = userExpenses;
   