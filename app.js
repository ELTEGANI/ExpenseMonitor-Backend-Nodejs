const express    = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet')
require('dotenv').config()

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

app.listen(process.env.PORT || 5000,() => {
    console.log(`Server is Listening To Port ${process.env.PORT}`)
})

   


