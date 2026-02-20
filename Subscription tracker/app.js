const express = require('express');
const dotenv = require('dotenv');
const PORT = require('./config/env');
const {connectTodDatabase} = require('./database/mongoDb');

// I am also going to use arcject because it is easier to secure the application in few lines
// howerve I must also learn the other methods of securing the application


//routes
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const subRouter = require('./routes/subscriptionRouter');
const errorMiddleware = require('./middleware/error.Middleware');

// JSON DATA IS NEVER MADE TO BE READ BY USERS
const app = express();
app.use(express.json()) // handle json data to send a request
app.use(express.urlencoded({extended: false})) // handles html requests
app.use(cookieParser()) // read cookies when data is parsed
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subRouter);
app.use(errorMiddleware);

// root
app.get('/', (req, res)=>{
  res.send('Hello there');
});


app.listen(PORT, async ()=> {console.log(`Server for subscription tracker is running on port: ${PORT}`)
  
  await connectTodDatabase();

})


module.exports = app;

