const Sequelize = require('sequelize');

const sequelize = new Sequelize('ExpenseMonitor','root','AdminAdminAdmin_123', { 
    operatorsAliases: false ,
    dialect: 'mysql',
    host:'localhost'

});
    
module.exports = sequelize;


  