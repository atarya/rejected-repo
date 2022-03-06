const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './../../../.env' });

module.exports = async (req, res, next) => {
    try {
        const jwtToken = req.header("token");
        if (!jwtToken) {
            return res.status(401).json({
                message: "Access denied. No token provided."
            });
        }
        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
        req.user_id = payload.user_id;
    } catch (error) {
        console.error(error.message);
        res.status(403).send("Server Error");
    }
}