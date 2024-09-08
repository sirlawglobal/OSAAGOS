const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes
// exports.protect = async (req, res, next) => {
//     let token;
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         try {
//             token = req.headers.authorization.split(' ')[1];
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             req.user = await User.findById(decoded.id).select('-password');
//             // console.log("req.user from:" + req.user);
//             next();
//         } catch (error) {
//             res.status(401).json({ message: 'Not authorized, token failed' });
//         }
//     } else {
//         res.status(401).json({ message: 'Not authorized, no token' });
//     }
// };

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            // console.log("req_user from middle", req.user)
            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }
            // console.log("req.user from protect middleware:", req.user);
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};


// Middleware to authorize roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
       
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden: You do not have the right role' });
        }
        next();
    };
};

exports.admin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};
exports.isSuperAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'Superadmin') {
        console.log("i hear you")
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as a Superadmin');
    }
};
