const express = require('express');
const {body} = require('express-validator/check');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/registeruser',[
        body('username').trim().not().isEmpty(),
        body('emailaddress').trim().not().isEmpty(),
        body('gender').trim().not().isEmpty()   
       ],userController.signUpUser);

router.post('/createexpense',[
        body('amount').trim().not().isEmpty(),
        body('note').trim(),
        body('date').trim().not().isEmpty(),
        body('userid').trim().not().isEmpty(),
        body('category').trim().not().isEmpty(),
        body('form').trim().not().isEmpty()   
       ],userController.createExpense);



module.exports = router;
