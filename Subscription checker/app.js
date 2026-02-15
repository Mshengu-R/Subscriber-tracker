// Arject
// Hostinger... for vps
// Subscription checker
// npx enslit --init

const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    res.status(200).send('Welcome to the subscription check')
});

app.listen(3000, ()=>{
    console.log("Server for subscription tracker is running on http://localhost:3000")
})

// export default app;