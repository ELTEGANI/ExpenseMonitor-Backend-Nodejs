'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
     id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emailAddress:{
      type: DataTypes.STRING,
      allowNull: false
    },
    gender:{
      type: DataTypes.STRING,
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  Users.associate = function(models) {
    Users.hasMany(models.userExpenses,{foreignKey:'userId',targetKey:'id'})
  };
  return Users;
};