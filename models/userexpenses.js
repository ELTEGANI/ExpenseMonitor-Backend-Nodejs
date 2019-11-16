'use strict';
module.exports = (Sequelize, DataTypes) => {
  const userExpenses = Sequelize.define('userExpenses', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        allowNull: false
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expenseCategory:{
      type: DataTypes.STRING,
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId:{
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
  }, {});
  userExpenses.associate = function(models) {
    // associations can be defined here
  };
  return userExpenses;
};