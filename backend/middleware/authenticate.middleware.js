require('dotenv').config();
const jwt = require('jsonwebtoken');


const authenticate = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.key, (err, decoded) => {
            if (decoded) {
                req.body.userID = decoded.userID;
                next();
            } else {
                res.send("Please Login First");
            }
        })
    } else {
        res.send("Please Login First");
    }
};


module.exports = { authenticate };