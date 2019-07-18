const {validationResult} = require('express-validator/check');
const Users = require('../models/users');
const userExpenses = require('../models/userExpenses');


exports.signUpUser = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       const error = new Error('validation Failed');
       error.statusCode = 422;
       error.data = errors.array();
       throw error
    }
    const username       = req.body.username;
    const emailaddress   = req.body.emailaddress;
    const gender         = req.body.gender;

    Users.create({
            username:username,
            emailaddress:emailaddress,
            gender:gender
            }).then(result =>{
            res.status(201).json({
             message:'User Created Successfully',
             User:result
         });
         })
        .catch(
            err =>{
                if(!err.statusCode){
                    err.statusCode = 500;
                }
                next(err);
             }
        )  
}



exports.createExpense = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       const error = new Error('validation Failed');
       error.statusCode = 422;
       error.data = errors.array();
       throw error
    }
    const amount       = req.body.amount;
    const note         = req.body.note;
    const date         = req.body.date;
    const UserId       = req.body.userid;
    const expenseCategory  = req.body.category;
    const expesnseFrom      = req.body.form;

    userExpenses.create({
            amount:amount,
            note:note,
            date:date,
            UserId:UserId,
            expenseCategory:expenseCategory,
            expesnseFrom:expesnseFrom
            }).then(result =>{
            res.status(201).json({
             message:'Expense Created Successfully',
             Expense:result
         });
         })
        .catch(
            err =>{
                if(!err.statusCode){
                    err.statusCode = 500;
                }
                next(err);
             }
        )  
}
