const Sequelize = require('sequelize');

const sequelize = new Sequelize('ExpenseMonitor','root','MySqlAdminAdminAdmin_123',{ 
    dialect: 'mysql',
    host:'localhost'

});
    
module.exports = sequelize;


  