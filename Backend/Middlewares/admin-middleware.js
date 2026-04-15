const adminMiddleware = async (req, res, next) => {
    try {
        
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized. User data not found" });
        }
      
        const adminRole = req.user.isAdmin;

        if (!adminRole) {
            return res.status(403).json({ message: "Access denied. User is not an Admin" });
        }

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = adminMiddleware;







