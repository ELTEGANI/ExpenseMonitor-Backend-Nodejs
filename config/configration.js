const Sequelize = require('sequelize');
    
//online server
const sequelize = new Sequelize('ExpenseMonitor','root','MySqlAdminAdminAdmin_123',{ 
    dialect: 'mysql',
    host:'localhost'

});
  
//localserver
// const sequelize = new Sequelize('ExpenseMonitor','root','AdminAdminAdmin_123',{ 
//     dialect: 'mysql',
//     host:'localhost'

// })
module.exports = sequelize;


  