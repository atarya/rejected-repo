const pool = require('./../../config/db.config');
const router = require('express').Router();

router.post("/register", async (req, res) => {

    try {
        // extract data from request body
        const { user_name, user_email, user_password } = req.body;

        // check if user already exists
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [user_email]);
        // console.log(typeof user); returns object
        // console.log(user.rows);
        if (user.rows.length !== 0) {
            res.status(400).json({
                status: "error",
                message: "User already exists"
            });
        }

        // bcrypt the user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(user_password, salt);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }

})

module.exports = router;