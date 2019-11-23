const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { Users, userExpenses } = require('../models');
require('dotenv').config();


module.exports = {
  async signUpUser(req, res, next) {
    const { userName } = req.body;
    const { emailAddress } = req.body;
    const { gender } = req.body;
    const { currency } = req.body;
    const { startWeek } = req.body;
    const { endWeek } = req.body;
    const { startMonth } = req.body;
    const { endMonth } = req.body;

    let currentExpense = null;
    let weekExpense = null;
    let monthExpense = null;
    const today = new Date();
    const currentDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    try {
      const user = await Users.findOne({ where: { emailAddress:emailAddress } });
      if (!user) {
        try {
          const result = await Users.create({
            userName:userName,
            emailAddress:emailAddress,
            gender:gender,
            currency:currency,
          });
          const amountsum = await userExpenses
            .sum('amount', { where: { userId: result.id, date: currentDate } });
          if (amountsum) {
            currentExpense = amountsum;
          } else {
            currentExpense = 0;
          }
          const token = jwt.sign({ userId: result.id }, process.env.JWT_SEC);
          res
            .status(200)
            .json({
              accessToken: token,
              userCurrentExpense: currentExpense,
              weekExpense: 0,
              monthExpense: 0,
            });
        } catch (error) {
          if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
        }
      } else {
        // ///////////////weekExpense/////////////////
        try {
          const sumationOfWeekExpense = await userExpenses.sum('amount', {
            where:
                 {
                   userId: user.id, date: { [Op.between]: [startWeek, endWeek] },
                 },
          });
          if (sumationOfWeekExpense) {
            weekExpense = sumationOfWeekExpense;
          } else {
            weekExpense = 0;
          }
        } catch (error) {
          if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
        }
        // ///////////////monthExpense/////////////////
        try {
          const sumationOfMonthExpense = await userExpenses.sum('amount', {
            where:
                         {
                           userId: user.id, date: { [Op.between]: [startMonth, endMonth] },
                         },
          });
          if (sumationOfMonthExpense) {
            monthExpense = sumationOfMonthExpense;
          } else {
            monthExpense = 0;
          }
        } catch (error) {
          if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
        }
        // ///////////////todayExpense/////////////////
        try {
          const sumationOfWeekExpense = await userExpenses.sum('amount', {
            where:
                {
                  userId: user.id, date: currentDate,
                },
          });
          if (sumationOfWeekExpense) {
            currentExpense = sumationOfWeekExpense;
          } else {
            currentExpense = 0;
          }
          const token = jwt.sign({ userId: user.id }, process.env.JWT_SEC);
          res
            .status(200)
            .json({
              accessToken: token,
              userCurrentExpense: currentExpense,
              weekExpense,
              monthExpense,
            });
        } catch (error) {  
          if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
        }
      }
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  },

};
