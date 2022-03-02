const express = require('express');
const app = express();
const cors = require('cors');

require("dotenv").config({ path: __dirname + "/../.env" });
const PORT = process.env.PORT;

// MIDDLEWARES
app.use(express.json())
app.use(cors())

// ROUTES
// Signup and Login Routes
app.use("/auth", require("./app/Routes/jwtAuth"))

//listener
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})