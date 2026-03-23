const mysql = require('mysql');

const connectTodb =  mysql.createConnection({

    host: "localhost",
    socketPath: "MYSQL",
    port: 3000,
    user: "root",
    database: 'db',

});

connectTodb.connect(function(err){
    
    if(err){
    
        throw err;
    }
    
    console.log(`Connected`);
    
    connectTodb.query("CREATE DATABASE mydb", function(err, result){
        
        if(err){
    
            throw err;
    
        }
        
        console.log(`Database created`, result);
    
    })
})

module.exports = mysql;