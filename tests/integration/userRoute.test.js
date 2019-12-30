const request = require('supertest');
const jwt = require('jsonwebtoken');
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
  

test('should signup new user if not found and return accesstoken',async() => {
   const res = await request(server).post('/api/user/registeruser').send({
      userName:"adnani jaber",
      emailAddress:"adnanimoh@gmail.com",
      gender:"male",
      currency:"SDG"
    })
    expect(res.status).toBe(201);
});


