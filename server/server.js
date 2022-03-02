const express = require('express');
const app = express();
const cors = require('cors');

require("dotenv").config({ path: __dirname + "/../.env" });
const PORT = process.env.PORT;

//middleware
app.use(express.json())
app.use(cors())

//routes


//listener
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})