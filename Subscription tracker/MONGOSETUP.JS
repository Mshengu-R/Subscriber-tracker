// 1. Goto the mongoDb website 
// 2. Create an account (try free)
// 3. Create a project (make myself a project owner)
// 4. Then create a db cluster choose M0(free version)
// 5. Create deployment
// 6. Create usrename, (make sure I write the password down for latter use)
// 7. Then choose connection method (use mongoDbDriver(which is node.js))
// 8. Choose the first option
// 9. open terminal and run npm install mongodb
// 10. Mongoose ram(which is mongodb ram which allows us to run mongodb)
// 11. DataSetup, given a connection string( make sure to replace the given password with the password I have created)
// 12. .env dev local DB_URI = con string
// 13. create a new folder which is called database, within it create a mongodb file from mongoose
// 
// 
// 
//

import User from './modules/user.models';


// here Lemme try from W3school 
// 
const url = require('url');
const https = require('https');

function httpRequest(option, data = null) {
    return new Promise((resolve, reject) => {
        const req = https.request(option, (res) => {
            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                
                try{ 
                    const contentType = res.headers['content-type'] || '';
                    const isJson = /^application\/json/.test(contentType);

                    const response = {
                        statusCode: res.statusCode,
                        headers: res.headers,
                        data: isJson ? JSON.parse(responseData) : responseData
                    }
                    if(res.statusCode >= 200 && res.statusMessage) {

                    }

                } catch(err) {
                    throw err;
                }
            })
        })
    })
}

const upstash = require('up')