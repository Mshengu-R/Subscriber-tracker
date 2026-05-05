const aj = require('../config/arcjet');
const { logger } = require('./logging.middleware');


const arcjetMiddleware = async (req, res, next) =>{

    try{

        const decision = await aj.protect(req, { requested: 1 }); // take away one token for the bucket

        if(decision.isDenied()) {
            
            if(decision.reason().isRateLimit()){
                const arcLogger = req.logger || logger;
                arcLogger.warn({ message: 'Rate limit exceeded', ip: req.ip });
                return res.status(429).json({ error: 'Rate limit exceeded' });
            }

            if(decision.reason().isBot()){
                const arcLogger = req.logger || logger;
                arcLogger.warn({ message: 'Bot detected', ip: req.ip });
                return res.status(403).json({ error: 'Bot detected' })
            }

                const arcLogger = req.logger || logger;
                arcLogger.warn({ message: 'Access denied', ip: req.ip });
                return res.status(403).json({ error: 'Access denied' })

        }

        next(); // goes to the next function whether to create subscription

    }catch(error){
        const arcLogger = req.logger || logger;
        arcLogger.error({ message: 'Arcjet middleware error', error: error.message });
        next(error);
    }
};

module.exports = arcjetMiddleware;