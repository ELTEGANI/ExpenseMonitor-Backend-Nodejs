const express = require('express');
const {body} = require('express-validator/check');
const userController = require('../controllers/userController');
const router = express.Router();
const isAuth = require('../authenticationMiddleware/middleware');


router.post('/registeruser',[
        body('username').trim().not().isEmpty(),
        body('emailaddress').trim().not().isEmpty(),
        body('gender').trim().not().isEmpty()   
       ],userController.signUpUser);

router.post('/createexpense',isAuth,[
        body('amount').trim().not().isEmpty(),
        body('note').trim(),
        body('date').trim().not().isEmpty(),
        body('category').trim().not().isEmpty(),
        body('form').trim().not().isEmpty()   
       ],userController.createExpense);


router.get('/retreiveallexpense',isAuth,userController.getAllExpenses)
       
module.exports = router;
