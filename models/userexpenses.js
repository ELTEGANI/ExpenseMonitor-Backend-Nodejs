
module.exports = (Sequelize, DataTypes) => {
  const userExpenses = Sequelize.define('userExpenses', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expenseCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  }, {});
  // eslint-disable-next-line func-names
  userExpenses.associate = function (models) {
    userExpenses.belongsTo(models.Users, { foreignKey: 'userId', targetKey: 'id' });
  };
  return userExpenses;
};
