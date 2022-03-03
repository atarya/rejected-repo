const jwt = require('jsonwebtoken');
require('dotenv').config({ path: __dirname + "/../../.env" });

function jwtGenerator(user_id) {

    // choosing reference for the token
    const payload = {
        user: user_id
    }
    // generating token using the secret key and setting expiry to 1 hour
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
    return token;
}

module.exports = jwtGenerator;