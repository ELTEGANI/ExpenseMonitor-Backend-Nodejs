const {validationResult} = require('express-validator/check');
const {Users,userExpenses} = require('../models');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize')
require('dotenv').config()



module.exports = {
    async createExpense (req,res,next){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
           const error = new Error('validation Failed');
           error.statusCode = 422;
           error.data = errors.array();
           throw error
        }
        const amount           = req.body.amount;
        const description      = req.body.description;
        const date             = req.body.date;
        const currency         = req.body.currency;
        const expenseCategory  = req.body.category;
        let today = new Date();
        let currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        try{
            const resultUserExpenses = await userExpenses.create({
                amount:amount,
                description:description,
                date:date,
                userId:req.userId,
                expenseCategory:expenseCategory,
                currency:currency
                })
        try{
            const amountUserExpenses = await userExpenses
                    .sum('amount', { where: { 
                        userId:resultUserExpenses.userId,date:currentDate
                    } 
                }) 
            res.status(201).json({
                            message:'Expense Created Successfully',
                            Expense:amountUserExpenses
             });
        }catch(error){
            if(!error.statusCode){
                error.statusCode = 500;
              }
              next(error);
             }       
        }catch(error){
            if(!error.statusCode){
                error.statusCode = 500;
              }
              next(error);
             }
      } ,
      
  async getExpensesBasedOnDuration (req,res,next){
     const duration  = req.body.duration
     const startDate = req.body.startDate
     const endDate   = req.body.endDate
     const today     = new Date();
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

         try{
            const todayExpenses = await userExpenses.findAll({
             attributes: ['id','amount','description','expenseCategory','currency','date'],
             where:{userId:req.userId,date:currentDate}
         })
             res
             .status(200)
             .json(todayExpenses);
         }catch(err){
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        }   
         break


         case "week":
          try{
            const weekExpenses = await userExpenses.findAll({
                attributes: ['id','amount','description','expenseCategory','currency','date'],  
                where:{userId:req.userId,date:{[Op.between]:[startDate,endDate]}}
            }) 
                res.status(200).json(weekExpenses);
        }catch(err){
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        }     
         break

         case "month":
             try{
              const monthExpenses = await userExpenses.findAll({
                    attributes: ['id','amount','description','expenseCategory','currency','date'],
                    where:{userId:req.userId,date:{[Op.between]:[startDate,endDate]}
                   }
                })  
                res.status(200).json(monthExpenses);
             }catch(err){
                if(!err.statusCode){
                    err.statusCode = 500;
                }
                next(err);
            }
         break
     }
    },

    async deleteExpense(req,res,next){
    const expenseid = req.params.expenseid
    try{
       const expense = await userExpenses.findByPk(expenseid)
       if(!expense){
        const error = new Error('Could not find Expense');
        error.statusCode = 404;
        throw error;
      }
      const deleted  = await userExpenses.destroy({ where: { id : expenseid } })
      res
      .status(200)
      .json({
          message:"expense Deleted",
          expenseDeleted:deleted
        }) 
    }catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }    
},

async updateExpense (req,res,next){
     const expenseid = req.params.expenseid
     const errors = validationResult(req);
     if(!errors.isEmpty()){
        const error = new Error('validation Failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error
     }
     const amount           = req.body.amount;
     const description      = req.body.description;
     const date             = req.body.date;
     const currency         = req.body.currency;
     const expenseCategory  = req.body.category;

       try{
        const expenseId = await userExpenses.findByPk(expenseid)
            if(!expenseId){
            const error = new Error('Could not find Expense');
            error.statusCode = 404;
            throw error;
        }
        const updatedExpense =  await userExpenses.update({
            amount: amount,
            description : description,
            date : date,
            currency:currency,
            expenseCategory:expenseCategory
        },{ where: { id : expenseid } })
         res
        .status(200)
        .json({
            message:"Expense Updated",
            updatedExpense:updatedExpense
        })  
       }catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
    
    }

    };    