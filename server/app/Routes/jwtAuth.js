const pool = require('./../../config/db.config');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwtGenerator = require('./../Utils/jwtGenerator');

router.post("/register", async (req, res) => {

    try {
        // extract data from request body
        const { user_name, user_email, user_password } = req.body;

        // check if user already exists
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [user_email]);
        // console.log(typeof user); returns object
        // console.log(user.rows);
        if (user.rows.length !== 0) {
            res.status(401).send("User already exists");
        }

        // bcrypt the user password
        const saltRound = 10; // Try randomising the salt rounds
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(user_password, salt); // encrypted password

        // insert user into database
        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [user_name, user_email, bcryptPassword]);

        // generate jwt token
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error");
    }

})

router.post("/login", async (req, res) => {
    try {
        // destructure data from request body
        const { user_email, user_password } = req.body;

        // check if user exists else throw error
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [user_email]);

        if (user.rows.length === 0) {
            return res.status(400).json("Password or email is incorrect.");
        }

        // check if incoming password is the same as the one in the database
        const validPassword = await bcrypt.compare(user_password, user.rows[0].user_password);
        if (!validPassword) {
            return res.status(400).json("Password or email is incorrect.");
        }

        // assign a jwt token to the user
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;