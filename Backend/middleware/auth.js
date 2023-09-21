const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.isAuthenticatedUser = async (req, res, next) => {
    try {   
        const { token } = req.cookies;
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Login first to access this resource.',
            });
        }

        const decodedData = jwt.verify(token, 'your-secret-key');
        req.user = await User.findById(decodedData.id);

        next();

    } catch (error) {        
        res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message,
        });        
    }
}

exports.authrorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to access this resource.',
            });
        }
        next();
    }
}