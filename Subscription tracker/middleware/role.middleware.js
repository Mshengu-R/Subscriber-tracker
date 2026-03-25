// destructure it just incase it requires more than one role
const roleMiddleware = (...allowedRoles) => {
 
    return (req, res, next) => {
    const userRole = req.user.role; // accessing the user role

    if(!allowedRoles.includes(userRole)) {

        return res.status(403).json({ error: 'Access denied' });

    }

    // if the user role is allowed, proceed to the next middleware or route handler
    next();

};

};

module.exports = roleMiddleware;