// 
const { logger } = require('./logging.middleware');

const roleMiddleware = (...allowedRoles) => {

    return (req, res, next) => {

        // check the role of the user to see if the user should be allowed to enter 
        if(!allowedRoles.includes(req.user.role)) {
          
            const roleLogger = req.logger || logger;
            roleLogger.warn({ 
                message: 'Role authorization failed', 
                userRole: req.user.role, 
                allowedRoles: allowedRoles,
                userId: req.user.id
            });
            return res.status(403).json({ message: "You are not allowed to enter this side"})
        }

        // if user role is allowed then we let the user pass
        const roleLogger = req.logger || logger;
        roleLogger.info({ message: 'Role authorization successful', userRole: req.user.role });
        next()
    }

}

module.exports = roleMiddleware;