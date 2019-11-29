const request = require('supertest');
const jwt = require('jsonwebtoken');
const userExpenses =require('../../models/userexpenses');
let server;
let token;
const expenseId = "0e48a920-0deb-11ea-873c-fd1b3ba6e9de"


   

beforeEach(()=>{
  server = require('../../app');
  token = jwt.sign({ userId: "d1058960-0d05-11ea-8787-9743ba10bf5f" }, process.env.JWT_SEC)
  // await userExpenses.destroy({
  //   where: {},
  //   truncate: true
  // })
});

afterEach(()=>{
    server.close();
})
  


test('should not create new expense because no token provided',async() => {
  const res = await request(server).post('/api/expense/createexpense').send({
        amount:"4000",
        description:"fees test",
        date:"2019-11-23",
        userId:"d1058960-0d05-11ea-8787-9743ba10bf5f",
        expenseCategory:"gas",
        currency:"SDG",
   })  
   expect(res.status).toBe(401);  
});                                     


test('should create new expense because token provided',async() => {
  const res = await request(server)
       .post('/api/expense/createexpense')
       .set('Authorization', `Bearer ${token}`)
       .send({
        amount:"4000",   
        description:"fees test", 
        date:"2019-11-23",
        userId:"d1058960-0d05-11ea-8787-9743ba10bf5f",
        category:"gas",
        currency:"SDG",
        })
   expect(res.status).toBe(201);
});



test('should return 401 if no token provided for geting expenses based on duration',async() => {
  const res = await request(server).post('/api/expense/getExpensesBasedOnDuration').send({
        duration:"today",
        startDate:"2019-11-23",
        endDate:""
   })
   expect(res.status).toBe(401);
});


test('should return 200 if token provided and array of object(expense per duration(today,week,month))',async() => {
  const res = await request(server)
  .post('/api/expense/getExpensesBasedOnDuration')
  .set('Authorization', `Bearer ${token}`)
  .send({
        duration:"week",
        startDate:"2019-12-16",
        endDate:"2019-12-23"
   })
   expect(res.status).toBe(200);
   expect(res.body.length).toBe(0)
});


test('should return 401 if token not provided for deleting expense',async() => {
  const res = await request(server)
  .delete('/api/expense/deleteexpense/'+`${expenseId}`)
   expect(res.status).toBe(401);
});

// test('should return 404 if token provided but expense not found for deleting expense,async() => {
//    const res = await request(server)
//   .delete('/api/expense/deleteexpense/'+`${expenseId}`)
//   .set('Authorization', `Bearer ${token}`)
//    expect(res.status).toBe(404);
// });

test('should return 200 if token provided and expense is found for deleting expense',async() => {
  const res = await request(server)
 .delete('/api/expense/deleteexpense/'+`${expenseId}`)
 .set('Authorization', `Bearer ${token}`)
  expect(res.status).toBe(200);
});

test('should return 401 if token not provided for updating expense',async() => {
  const res = await request(server)
  .put('/api/expense/updateexpense/'+`${expenseId}`)
  .send({
    amount:"4000",
    description:"newnnnnnn",
    date:"2019-11-25",
    currency:"USD",
    category:"fashon",
});
   expect(res.status).toBe(401);
});

test('should return 404 if token provided and expense not found for updating expense',async() => {
  const res = await request(server)
  .put('/api/expense/updateexpense/'+`${expenseId}`)
  .set('Authorization', `Bearer ${token}`)
  .send({
    amount:"4000",
    description:"newnnnnnn",
    date:"2019-11-25",
    currency:"USD",
    category:"fashon",
});
   expect(res.status).toBe(404);
});


test('should return 200 if token provided and expense found for updating expense',async() => {
   const res = await request(server)
  .put('/api/expense/updateexpense/'+`${expenseId}`)
  .set('Authorization', `Bearer ${token}`)
  .send({
    amount:"9000",
    description:"w",
    date:"2019-11-25",
    currency:"USD",
    category:"fashon",
});
   expect(res.status).toBe(200);
});


