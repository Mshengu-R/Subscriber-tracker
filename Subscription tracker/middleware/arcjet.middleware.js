// Arcjet Middleware for rate limiting and bot detection
const aj = require('../config/arcjet');


const arcjetMiddleware = async (req, res, next) =>{

    try{

        const decision = await aj.protect(req, { requested: 1 }); // take away one token for the bucket

        if(decision.isDenied()) {
            // if the reason is rate limit, we can return a specific message
            if(decision.reason().isRateLimit()){
                
                return res.status(429).json({ error: 'Rate limit exceeded' });
            }
            // if the reason is bot detection, we can return a different message
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