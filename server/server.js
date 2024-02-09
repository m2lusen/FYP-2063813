const {Pool} = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "meggymoo",
    host: "localhost",
    port: 5432,
    // database: "fyp_db_1"
})


const dbQuery = `



`;


pool.query(dbQuery).then((response) => {
    console.log("Database Code executed: ");
    console.log(response);
}).catch((err) => {
    console.log(err);
})
// fyp_db_1

module.exports = pool;

