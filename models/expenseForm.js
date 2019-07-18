const Sequelize = require('sequelize');
const sequelize = require('../config/configration');

const expesnseFrom = sequelize.define('expesnseFrom', {
 id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    allowNull: false
},
forms: {
  type: Sequelize.STRING,
  allowNull: false
}
});

module.exports = expesnseFrom;
