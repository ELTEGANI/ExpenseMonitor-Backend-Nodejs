const {validationResult} = require('express-validator/check');
const Users = require('../models/users');
const userExpenses = require('../models/userExpenses');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize')
const moment = require('moment');


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
    let currentExpense = null
    let today = new Date();
    let currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    Users.findOne({where:{emailaddress:emailaddress}})
      .then(user=>{
         if(user){  
            userExpenses
            .sum('amount', { where: { UserId:user.id,date:currentDate} })
            .then(amountsum=>{
                if(amountsum){
                    currentExpense = amountsum
                }else{
                    currentExpense = 0
                }
                const token = jwt.sign({userId:user.id},'expensemon');
                res
                .status(200)
                .json({
                    accesstoken:token,
                    userCurrentExpense:currentExpense
                })
            }).catch( err =>{
                if(!err.statusCode){
                    err.statusCode = 500;
                }
                next(err);
             }) 
         }else{
            let today = new Date();
            let currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();             
        Users.create({
            username:username,
            emailaddress:emailaddress,
            gender:gender
            }).then(result =>{
                userExpenses
                .sum('amount', { where: { id:result.id,date:currentDate} })
                .then(amountsum=>{
                    if(amountsum){
                        currentExpense = amountsum
                    }else{
                        currentExpense = 0
                    }
                    const token = jwt.sign({id:user.id},'expensemon');
                    res
                    .status(200)
                    .json({
                        accesstoken:token,
                        userCurrentExpense:currentExpense
                    })
                }).catch( err =>{
                    if(!err.statusCode){
                        err.statusCode = 500;
                    }
                    next(err);
                 }) 
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
    let today = new Date();
    let currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    userExpenses.create({
            amount:amount,
            description:description,
            date:date,
            UserId:req.userId,
            expenseCategory:expenseCategory
            }).then(result =>{
                userExpenses
                .sum('amount', { where: { UserId:result.UserId,date:currentDate} })
                .then(amount=>{
                    res.status(201).json({
                        message:'Expense Created Successfully',
                        Expense:amount
                    });
                }) .catch(
                    err =>{
                        if(!err.statusCode){
                            err.statusCode = 500;
                        }
                     }
                ) 
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
            expenseCategory:expenseCategory
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

exports.getExpensesBasedOnDuration=(req,res,next)=>{
     const duration = req.body.duration
     const today = new Date();
     const currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
 
     switch(duration){
         case "today":
         const errors = validationResult(req);
         if(!errors.isEmpty()){
            const error = new Error('validation Failed');
            error.statusCode = 422;
            error.data = errors.array();
            throw error
         }
         userExpenses.findAll({
             attributes: ['id','amount','description','expenseCategory','date'],
             where:{userId:req.userId,date:currentDate}
         })
         .then(expenses=>{
             res.status(200).json(expenses);
         }).catch(err=>{
             if(!err.statusCode){
                 err.statusCode = 500;
             }
             next(err);
         })     
         break

         case "weekly":
         userExpenses.findAll({
             attributes: ['id','amount','description','expenseCategory','date'],
             where:{userId:req.userId,date:{
                [Op.gte]:moment().subtract(7,'days').format('YYYY-MM-DD')
              }     
            }
         })  
         .then(expenses=>{
             res.status(200).json({
                 message:'My Daily Expenses',
                 myWeeklyExpenses:expenses,
           });
         }).catch(err=>{
             if(!err.statusCode){
                 err.statusCode = 500;
             }
             next(err);
         })    
         break

         case "monthly":
         userExpenses.findAll({
            attributes: ['id','amount','description','expenseCategory','date'],
            where:{userId:req.userId,date:{
               [Op.gte]:moment().subtract(30,'days').format('YYYY-MM-DD')
             }     
           }
        })  
        .then(expenses=>{
            res.status(200).json({
                message:'My Monthly Expenses',
                myMonthlyExpenses:expenses,
          });
        }).catch(err=>{
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
         break
     }
}