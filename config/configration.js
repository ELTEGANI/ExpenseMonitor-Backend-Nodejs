const Sequelize = require('sequelize');

const sequelize = new Sequelize('ExpenseMonitor','root','MySqlAdminAdminAdmin_123',{ 
    dialect: 'mysql',
    host:'http://104.207.131.106'

});
    
module.exports = sequelize;


  