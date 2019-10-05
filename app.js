const express    = require('express');
const sequelize  = require('./config/configration');
const bodyParser = require('body-parser');
const Users = require('./models/users');
const userExpenses = require('./models/userExpenses');
const helmet = require('helmet')

//set routes
const userRoute = require('./routes/userRoute');

//init express
const app = express()
app.use(helmet())

app.use(bodyParser.json());//application/json
   

//setup CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});



app.use('/User',userRoute);

app.use((error,req,res,next)=>{
    console.log(error);
    const status  = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
    message:message,
    data:data
    });         
})

userExpenses.belongsTo(Users);
Users.hasMany(userExpenses);

 
sequelize  
       .sync()       
      .then(result =>{   
      console.log(result);  
      app.listen(process.env.PORT || 3000); 
}).catch(err =>{
      console.log(err)
})   


