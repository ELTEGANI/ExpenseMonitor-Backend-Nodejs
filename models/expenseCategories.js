const Sequelize = require('sequelize');
const sequelize = require('../config/configration');

const expenseCategories = sequelize.define('expenseCategories', {
 id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    allowNull: false
},  
categories: {
  type: Sequelize.STRING,
  allowNull: false
}   
});   

module.exports = expenseCategories;
