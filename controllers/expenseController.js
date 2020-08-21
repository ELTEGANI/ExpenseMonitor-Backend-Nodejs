
const { validationResult } = require('express-validator/check');
const { Op } = require('sequelize');
const { userExpenses } = require('../models');
const sequelize = require('sequelize');
require('dotenv').config();


module.exports = {
  async createExpense(req, res, next) {
    try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('validation Failed');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const { amount } = req.body;
    const { description } = req.body;
    const { date } = req.body;
    const { currency } = req.body;
    const {category} = req.body;
    const today = new Date();
    const resultUserExpenses = await userExpenses.create({
        amount:amount,   
        description:description,
        expenseCategory:category,
        currency:currency,
        date:date,
        userId: req.userId
        });
        res.status(201).json({
        message: 'Expense Created Successfully',
        expense:resultUserExpenses
      });
      
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  },

 
async getExpensesBasedOnDuration(req, res, next) {
    const { startDate } = req.body;
    const { endDate } = req.body;
        try {
          const durationExpenses = await userExpenses.findAll({
            attributes: ['id', 'amount', 'description', 'expenseCategory', 'currency', 'date'],
            where: { userId: req.userId, date: { [Op.between]: [startDate, endDate]} },
          });
              res
              .status(200)
              .json(durationExpenses);
        } catch (err) {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        }
  },

                
  async deleteExpense(req, res, next) {
    try {
      const expense = await userExpenses.findByPk(req.params.expenseId);
      if (!expense) {
        const error = new Error('Could not find Expense');
        error.statusCode = 404;
        throw error;
      }
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
    try{
      const deleted = await userExpenses.destroy({ where: { id: req.params.expenseId } });
      res
        .status(200)
        .json({
          message: 'expense Deleted'
        });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },

  async updateExpense(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('validation Failed');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const amount  = req.body.amount;
    const description  = req.body.description;
    const date  = req.body.date;
    const currency  = req.body.currency;
    const expenseCategory = req.body.category;

    try {
      const expenseId = await userExpenses.findByPk(req.params.expenseId);
      if (!expenseId) {
        const error = new Error('Could not find Expense');
        error.statusCode = 404;
        throw error;
      }
      const updatedExpense = await userExpenses.update({
        amount:amount,
        description:description,
        date:date,
        currency:currency,
        expenseCategory:expenseCategory,
      }, { where: { id: expenseId.id } });
      res
        .status(200)
        .json({
          message: 'Expense Updated'
        });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
};
