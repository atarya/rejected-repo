const pool = require('./../../config/db.config');
const router = require('express').Router();
const bcrypt = require('bcrypt');

router.post("/register", async (req, res) => {

    try {
        // extract data from request body
        const { user_name, user_email, user_password } = req.body;

        // check if user already exists
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [user_email]);
        // console.log(typeof user); returns object
        // console.log(user.rows);
        if (user.rows.length !== 0) {
            res.status(400).json("User already exists");
        }

        // bcrypt the user password
        const saltRound = 10; // Try randomising the salt rounds
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(user_password, salt); // encrypted password

        // insert user into database
        const newUser = await pool.query("Insert INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [user_name, user_email, bcryptPassword]);

        res.json(newUser.rows[0]);

        // generate jwt token


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }

})

module.exports = router;