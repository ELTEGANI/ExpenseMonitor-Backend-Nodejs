const {validationResult} = require('express-validator/check');
const Users = require('../models/users');
const userExpenses = require('../models/userExpenses');
const jwt = require('jsonwebtoken');


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

    Users.findOne({where:{emailaddress:emailaddress}})
      .then(user=>{
         if(user){
            const token = jwt.sign({userId:user.id},'expensemon');
            res.status(200).json({accesstoken:token,userid:user.id})
         }else{
        Users.create({
            username:username,
            emailaddress:emailaddress,
            gender:gender
            }).then(result =>{
            const token = jwt.sign({userId:result.id},'expensemon');
            res.status(201).json({
            accesstoken:token,
            userid:userId
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
      }).catch(err =>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
       })

   
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
    const description         = req.body.description;
    const date         = req.body.date;
    const expenseCategory  = req.body.category;
    const expesnseFrom      = req.body.form;
   
    userExpenses.create({
            amount:amount,
            description:description,
            date:date,
            UserId:req.userId,
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


exports.getAllExpenses=(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       const error = new Error('validation Failed');
       error.statusCode = 422;
       error.data = errors.array();
       throw error
    }
    const userId            = req.userId;
    userExpenses.findAll({
        attributes: ['id','amount','description','expenseCategory','expesnseFrom','date'],
        where:{userId:userId}
    })
    .then(expenses=>{
        res.status(201).json({
            message:'My Expenses',
            myExpenses:expenses,
      });
    }).catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
    
 }

exports.updateExpense=(req,res,next)=>{
     const expenseid = req.params.expenseid
     const errors = validationResult(req);
     if(!errors.isEmpty()){
        const error = new Error('validation Failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error
     }
     const amount       = req.body.amount;
     const description         = req.body.description;
     const date         = req.body.date;
     const expenseCategory  = req.body.category;
     const expesnseFrom      = req.body.form;

     userExpenses.findByPk(expenseid)
        .then(expenseId=>{
            if(!expenseId){
            const error = new Error('Could not find Expense');
            error.statusCode = 404;
            throw error;
        }
     return userExpenses.update({
            amount: amount,
            description : description,
            date : date,
            expenseCategory:expenseCategory,
            expesnseFrom:expesnseFrom
          },{ where: { id : expenseid } })
          .then(() => {
            res
            .status(200)
            .json({message:"expense Updated"})  
          }) 
        })
        .catch(err=>{
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
}
 
exports.deleteExpense=(req,res,next)=>{
    const expenseid = req.params.expenseid
    userExpenses.findByPk(expenseid)
    .then(expense=>{
        if(!expense){
            const error = new Error('Could not find Expense');
            error.statusCode = 404;
            throw error;
        }
        return userExpenses.destroy({ where: { id : expenseid } })
        .then(() => {
            res
            .status(200)
            .json({message:"expense Deleted"})  
          }) 
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}