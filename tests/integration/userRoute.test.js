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
  

test('should signup new user and return its expenses if found',async() => {
   const res = await request(server).post('/api/user/registeruser').send({
      userName:"adnani jaber",
      emailAddress:"adnanimoh@gmail.com",
      gender:"male",
      currency:"SDG", 
      startWeek:"2019-11-15", 
      endWeek:"2019-11-23",
      startMonth:"2019-11-01",
      endMonth:"2019-11-30"
    })
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('userCurrentExpense',0);
    expect(res.body).toHaveProperty('weekExpense',16000);
    expect(res.body).toHaveProperty('monthExpense',16000); 
});


