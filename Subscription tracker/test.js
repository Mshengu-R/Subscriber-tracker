const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const { promisify } = require('util');
const readFileAsync = promisify(require('fs').readFile);


// app
const app = express();

// sample test
let sample = [ { 
    id: 1,
    name: 'Risima Chabalala',
    password: 'pass'
} ]

app.use(express.json());

app.post('/api/v1/create', async (req, res, next) => {

    // const salt = bcrypt.genSalt(10);
    // const hashedSample = bcrypt.hash(sample.password, salt);

    try{ 

  const user = {
    id: sample.length + 1,
    name: req.body.name,
    password: req.body.password
  };
  
    // if(!name) {
    //     res.status(400).json({ message: 'Name is required'})
    // }
    
    // if(!password) {
    //     res.status(400).json({ message: 'password is required'})
    // }

        const salt = await bcrypt.genSalt(10);
        const hashedSample = await bcrypt.hash(user.password, salt);
        

        const newUser = {id: user.id, name: user.name, password: hashedSample};


        const token = jwt.sign({userId: newUser._id }, 'admin', {expiresIn: '1d'})

        const det = await fs.writeFile('riss.json', JSON.stringify(newUser, null, 2), 'utf8')
        
        res.status(201).json({
            success: true,
            message: 'Data have succesfully been created and stored',
            token,
            data: det
        })

    } catch(error){

        next(error);
    }

});

app.post('/api/v1/login', async (req, res, next) => {


    try{

    const logger = { name: req.body.name, 
                     password: req.body.password };
 
    const name = logger.name;
    const password = logger.password;

    if(!name || !password) {
        const message = 'Invalid details';
        const error = new Error(message);
        error.status = 401;
        throw error;
    }

    const user = await readFileAsync('riss.json', 'utf8');

    const userName = await user.find({ name });

    if(!userName) {

        const message = 'User with this username does not exist';
        const error = new Error(message);
        error.status = 404;
        throw error;
    }

    const pass = "$2b$10$Cs3ix8wOIPpLQiXuVDTPueZbIUb9zJmODqPXRS6KYe2WjFtEVrT.u"
    const validPass = await bcrypt.compare(password, pass);

    if(!validPass) {
        const message = 'Invalid password';
        const error = new Error(message);
        error.status = 404;
        throw error;
    }

    // const token = jwt.sign({ userId: })

    res.status(200).json({
        success: true,
        message: 'User signned in successfully',
        data: {
            user
        }
    });

     } catch(error) {
        next(error)
    }
})


app.listen(4000, () => {
    console.log(`The server is running on port localhost:4000`)
})