const Sequelize = require('sequelize');
const sequelize = require('../config/configration');

const Users = sequelize.define('Users', {
 id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    allowNull: false
},
username: {
  type: Sequelize.STRING,
  allowNull: false
},
emailaddress: {
  type: Sequelize.STRING,
  allowNull: false
},
gender: {
    type: Sequelize.STRING,
    allowNull: false
}
});

module.exports = Users;
