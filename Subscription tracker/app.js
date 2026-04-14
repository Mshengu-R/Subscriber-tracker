////////////////////////////////////////////////////////////////////////
// # Subscription Tracker API //////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

const express = require('express');
const dotenv = require('dotenv');
const { PORT } = require('./config/env');
const { connectToDatabase } = require('./database/mongoDb');
// I am also going to use arcject because it is easier to secure the application in few lines
// howerve I must also learn the other methods of securing the application


// routes middlewares
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const subRouter = require('./routes/subscriptionRouter');
const errorMiddleware = require('./middleware/error.Middleware');
const arcjetMiddleware = require('./middleware/arcjet.middleware');

// JSON DATA IS NEVER MADE TO BE READ BY USERS
const app = express();
app.use(express.json()); // handle json data to send a request
app.use(express.urlencoded({extended: false})); // handles html requests
app.use(cookieParser()); // read cookies when data is parsed
app.use(arcjetMiddleware);

// middlewareroutes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subRouter);
app.use(errorMiddleware);

// root
app.get('/', (req, res)=>{
  res.send(' Welcome to the subscription tracker API');
});

(app.listen(PORT, async ()=> { console.log(`Server for subscription tracker is running on port: ${PORT}`)
  
    // connect to the database when the server starts, if it fails the server will not start
    await connectToDatabase(); 
                              
}))() 
// PLEASE NOTE: I just updated it here on github to have this self invoking functions if it doesnt work remove them.
// Which means I did not really test them to check if they work


module.exports = app;

/////////////////////////////////////////////////////////////////
//# copyright 2024 subscription tracker API, all rights reserved.
/////////////////////////////////////////////////////////////////
