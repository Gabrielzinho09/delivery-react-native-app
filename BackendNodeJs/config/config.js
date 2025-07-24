const mysql = require('mysql2');
require('dotenv').config();
const db = mysql.createConnection(
    {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
        database: process.env.DATABASE_NAME
    }
);

db.connect(function (err) {
    if (err) throw err;
    console.log('DATABASE CONNECTED');
});

module.exports = db;