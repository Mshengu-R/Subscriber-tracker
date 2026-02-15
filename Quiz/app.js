const express = require('express');
const dotenv = require('dotenv');
const Port = 5050;
const {connectTodDatabase} = require('./database/mongoDb')
// we also going to use arcject because it is easier to secure the application in few lines
// howerve I must also learn the other methods of securing the application


//routes
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const subRouter = require('./routes/subscriptionRouter');

// JSON DATA IS NEVER MADE TO BE READ BY USERS

const app = express();
// app.use(express.json())
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subRouter);


// root
app.get('/', (req, res)=>{
  res.send('Hello there');
});


app.listen(Port, async ()=> {console.log(`Server for subscription tracker is running on port: ${Port}`)
  
  await connectTodDatabase();

})


module.exports = app;