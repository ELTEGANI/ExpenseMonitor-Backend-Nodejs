const Sequelize = require('sequelize');

const sequelize = new Sequelize(`${process.env.DATABASE_NAME}`,`${process.env.DATABASE_USER}`,
`${process.env.DATABASE_PASSWORD}`, { 
    // operatorsAliases: false ,
    dialect: 'mysql',
    host:'eu-cdbr-west-02.cleardb.net/heroku_8c5f8d5377ca51a?reconnect=true'

});
    
module.exports = sequelize;


  