const Sequelize = require('sequelize');

const sequelize = new Sequelize(`${process.env.DATABASE_NAME}`,`${process.env.DATABASE_USER}`,
`${process.env.DATABASE_PASSWORD}`, { 
    operatorsAliases: false ,
    dialect: 'mysql',
    host:'localhost'

});
    
module.exports = sequelize;


  