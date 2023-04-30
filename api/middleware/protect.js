const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

let JWT_SECRET = process.env.JWT_SECRET;

const protect = (req, res, next) => {
    const token = req.header('authorization');
    if (!token)
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Not logged in, canot log out!" });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);  // Verify token
        let { user } = decoded;  // Add user from payload
        req.user = user;
        next();
    } catch (e) {
        return res.status(StatusCodes.FORBIDDEN).json({ error: "Not logged in, canot access the resource!" });
    }
};


module.exports = { protect };