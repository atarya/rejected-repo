const Pool = require('pg').Pool;
require('dotenv').config({ path: __dirname + "/../.env" });
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
})

module.exports = pool;