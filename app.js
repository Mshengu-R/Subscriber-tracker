const express = require('express');
const dotenv = require('dotenv');
const { PORT } = require('./config/env');
const { connectToDatabase } = require('./database/mongoDb');
const logs = require('./middleware/logging.middleware'); // app monitoring, performance and scaling


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
app.use(express.urlencoded({ extended: false })); // handles html requests
app.use(cookieParser()); // read cookies when data is parsed


// request logging middleware - must be before routes
app.use(logs);

app.use(arcjetMiddleware);

// middleware routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subRouter);
app.use(errorMiddleware);


// root
app.get('/', (req, res)=>{

     res.send('SUBSCRIPTION MANAGEMENT API');

    });


app.listen(PORT, async ()=> { 
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  
  await connectToDatabase(); // connect to the database when the server starts, if it fails the server will not start

})


module.exports = app;

// developed and maintained by Risima Chabalala
