const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');


const protect = (req, res, next) => {
    const ACCESS_SECRET = process.env.ACCESS_SECRET;
    const token = req.header('authorization');
    if (!token)
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "No bearer token!" });
    try {
        const decoded = jwt.verify(token, ACCESS_SECRET);
        let { userID } = decoded;
        req.userID = userID;
        next();
    } catch (e) {
        return res.status(StatusCodes.FORBIDDEN).json({ error: "Not logged in, canot access the resource!" });
    }
};


module.exports = { protect };