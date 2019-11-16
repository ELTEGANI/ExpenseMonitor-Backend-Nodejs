const express = require('express');
const {body} = require('express-validator/check');
const userController = require('../controllers/userController');
const router = express.Router();
const isAuth = require('../authenticationMiddleware/middleware');


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

router.post('/createexpense',isAuth,[
        body('amount').trim().not().isEmpty(),
        body('description').trim().not().isEmpty(),
        body('date').trim().not().isEmpty(),
        body('currency').trim().not().isEmpty(), 
        body('category').trim().not().isEmpty()
       ],userController.createExpense);


      
// router.put('/updateexpense/:expenseid',isAuth,[
//         body('amount').trim().not().isEmpty(),
//         body('description').trim().not().isEmpty(),
//         body('date').trim().not().isEmpty(),
//         body('category').trim().not().isEmpty()
//        ],userController.updateExpense)

// router.delete('/deleteexpense/:expenseid',isAuth,userController.deleteExpense)

// router.post('/getExpensesBasedOnDuration',isAuth,[
//          body('duration').trim(),
//          body('startDate').trim(),
//          body('endDate').trim()
// ]
// ,userController.getExpensesBasedOnDuration)



module.exports = router;
