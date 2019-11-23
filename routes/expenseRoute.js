const express = require('express');
const { body } = require('express-validator/check');
const expenseController = require('../controllers/expenseController');
const router = express.Router();
const isAuth = require('../authenticationMiddleware/middleware');


router.post('/createexpense', isAuth, [
  body('amount').trim().not().isEmpty(),
  body('description').trim().not().isEmpty(),
  body('date').trim().not().isEmpty(),
  body('category').trim().not().isEmpty(),
  body('currency').trim().not().isEmpty()
], expenseController.createExpense);


router.put('/updateexpense/:expenseId', isAuth, [
  body('amount').trim().not().isEmpty(),
  body('description').trim().not().isEmpty(),
  body('date').trim().not().isEmpty(),
  body('currency').trim().not().isEmpty(),
  body('category').trim().not().isEmpty(),
], expenseController.updateExpense);

router.delete('/deleteexpense/:expenseId', isAuth, expenseController.deleteExpense);

router.post('/getExpensesBasedOnDuration', isAuth, [
  body('duration').trim(),
  body('startDate').trim(),
  body('endDate').trim(),
],
expenseController.getExpensesBasedOnDuration);


module.exports = router;
