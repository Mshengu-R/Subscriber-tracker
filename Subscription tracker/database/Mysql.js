const mysql = require('mysql');

const connectTodb =  mysql.createConnection({

    host: "localhost",
    socketPath: "MYSQL",
    port: 3000,
    user: "root",
    database: 'db',
    // ssl: "enabled with TLS_AES_128_GCM_SHA256",
    // password: "#MagleraDoeBoy2006645!!"
    

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