const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
require('dotenv').config();

// set routes
const userRoute = require('./routes/userRoute');
const expenseRoute = require('./routes/expenseRoute');

// init express
const app = express();
app.use(helmet());

app.use(bodyParser.json());// application/json

// setup CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use('/api/user', userRoute);
app.use('/api/expense', expenseRoute);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const { message } = error;
  const { data } = error;
  res.status(status).json({
    message,
    data,
  });
});

// app.listen(process.env.PORT || 5000, () => {
//   console.log(`Server is Listening To Port ${process.env.PORT}`);
// });

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is Listening To Port ${process.env.PORT}`);
});

module.exports = server;
