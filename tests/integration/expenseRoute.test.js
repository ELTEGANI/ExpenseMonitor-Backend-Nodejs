const request = require('supertest');
const jwt = require('jsonwebtoken');
let server;
let token;
const expenseId = "5d318d20-127a-11ea-9f0d-e9cfc3307469"


   

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
  


// test('should not create new expense because no token provided',async() => {
//   const res = await request(server).post('/api/expense/createexpense').send({
//         amount:"4000",
//         description:"fees test",
//         date:"2019-11-23",
//         userId:"d1058960-0d05-11ea-8787-9743ba10bf5f",
//         expenseCategory:"gas",
//         currency:"SDG",   
//    })  
//    expect(res.status).toBe(401);  
// });                                     


// test('should create new expense if token provided',async() => {
//   const res = await request(server)
//        .post('/api/expense/createexpense')
//        .set('Authorization',`Bearer ${token}`)
//        .send({
//         amount:"4000",   
//         description:"fees test", 
//         date:"2019-11-29",
//         userId:"d1058960-0d05-11ea-8787-9743ba10bf5f",
//         category:"gas",
//         currency:"SDG",
//         })
//         expect(res.body.Expense).toBe(20000);
//         expect(res.body.message).toBe("Expense Created Successfully");      
//         expect(res.status).toBe(201);
// });

// test('should not get expenses based on duration if no token provided',async() => {
//   const res = await request(server).post('/api/expense/getExpensesBasedOnDuration').send({
//         duration:"today",
//         currency:"SDG",
//         startDate:"2019-11-29",
//         endDate:""
//    })
//    expect(res.status).toBe(401);
// });


// test('should return expenses based on dueation ',async() => {
//   const res = await request(server)
//   .post('/api/expense/getExpensesBasedOnDuration')
//   .set('Authorization', `Bearer ${token}`)
//   .send({
//         duration:"week",
//         currency:"SDG",
//         startDate:"2019-11-23",
//         endDate:"2019-11-29"
//    })
//    expect(res.status).toBe(200);
//    expect(res.body.length).toBe(0)
// });


// test('should not delete expense if no token provided',async() => {
//   const res = await request(server)
//   .delete('/api/expense/deleteexpense/'+`${expenseId}`)
//    expect(res.status).toBe(401);
// });

// test('should not deleting expense if no id found',async() => {
//    const res = await request(server)
//   .delete('/api/expense/deleteexpense/'+`${expenseId}`)
//   .set('Authorization', `Bearer ${token}`)
//    expect(res.status).toBe(404);
// }); 

// test('should deleting expense with id found',async() => {
//   const res = await request(server)
//  .delete('/api/expense/deleteexpense/'+`${expenseId}`)
//  .set('Authorization', `Bearer ${token}`)
//   expect(res.status).toBe(200);
// });

// test('should not updating expense no token provided',async() => {
//   const res = await request(server)
//   .put('/api/expense/updateexpense/'+`${expenseId}`)
//   .send({
//     amount:"4000",
//     description:"newnnnnnn",
//     date:"2019-11-25",
//     currency:"USD",
//     category:"fashon",
// });
//    expect(res.status).toBe(401);
// });

// test('should not updating expense if expense id not found',async() => {
//   const res = await request(server)
//   .put('/api/expense/updateexpense/'+`${expenseId}`)
//   .set('Authorization', `Bearer ${token}`)
//   .send({
//     amount:"4000",
//     description:"newnnnnnn",
//     date:"2019-11-25",
//     currency:"USD",
//     category:"fashon",
// });
//    expect(res.status).toBe(404);
// });


// test('should updating expense if expense id provided',async() => {
//    const res = await request(server)
//   .put('/api/expense/updateexpense/'+`${expenseId}`)
//   .set('Authorization', `Bearer ${token}`)
//   .send({
//     amount:"9000",
//     description:"w",
//     date:"2019-11-25",
//     currency:"USD",
//     category:"fashon",
// });
//    expect(res.status).toBe(200);
// });


