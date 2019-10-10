const express = require('express');
const {body} = require('express-validator/check');
const userController = require('../controllers/userController');
const router = express.Router();


router.post('/registeruser',[
        body('userName').trim().not().isEmpty(),
        body('emailAddress').trim().not().isEmpty(),
        body('gender').trim().not().isEmpty(),
        body('currency').trim().not().isEmpty(), 
        body('startWeek').trim().not().isEmpty(),
        body('endWeek').trim().not().isEmpty() ,
        body('startMonth').trim().not().isEmpty(),
        body('endMonth').trim().not().isEmpty()  
       ],userController.signUpUser);


module.exports = router;
