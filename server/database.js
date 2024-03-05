const {Pool} = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "meggymoo",
    host: "localhost",
    port: 5432,
    database: "fyp_db_1"
});

module.exports = pool;
