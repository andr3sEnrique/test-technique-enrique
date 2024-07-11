require('dotenv').config();
const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).send('Token is required');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid Token');
        }
        req.userId = decoded.userId;
        next();
    });
};

module.exports = authMiddleware;
