const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { Users, userExpenses } = require('../models');
require('dotenv').config();


module.exports = {
  async signUpUser(req, res, next) {
    const  userName  = req.body.userName;
    const  emailAddress  = req.body.emailAddress;
    const  gender  = req.body.gender;
    const  currency  = req.body.currency;
  

      const user = await Users.findOne({ where: { emailAddress:emailAddress } });
      if (!user) {
        try {
          const result = await Users.create({
            userName:userName,
            emailAddress:emailAddress,
            gender:gender,
            currency:currency,
          });
          const token = jwt.sign({ userId: result.id }, process.env.JWT_SEC);
          res
            .status(201)
            .json({
              accessToken: token
            });
        } catch (error) {
          if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
        }
      } else {
         try{
          const token = jwt.sign({ userId: user.id }, process.env.JWT_SEC);
          res
            .status(200)
            .json({
              accessToken: token
            });
        } catch (error) {  
          if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
        }
      }
  },

};
