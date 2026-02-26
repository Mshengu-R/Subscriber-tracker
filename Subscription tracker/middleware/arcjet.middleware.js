const aj = require('../config/arcjet');


const arcjetMiddleware = async (req, res, next) =>{

    try{

        const decision = await aj.protect(req, { requested: 1 }); // take away one token for the bucket

        if(decision.isDenied()) {
            
            if(decision.reason().isRateLimit()){
                
                return res.status(429).json({ error: 'Rate limit exceeded' });
            }

            if(decision.reason().isBot()){

                return res.status(403).json({ error: 'Bot detected' })
            }

                return res.status(403).json({ error: 'Access denied' })

        }

        next(); // goes to the next function whether to create subscription

    }catch(error){
        console.log(`Arc middleware Error: ${error}`)
    }
};

module.exports = arcjetMiddleware;