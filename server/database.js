const {Pool} = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "meggymoo",
    host: "localhost",
    port: 5432
})


const dbQuery = `'
`;
// dbQuery becomes wharever PSQL code needs to be executed

pool.query(dbQuery).then((response) => {
    console.log("Database Created");
    console.log(response);
}).catch((err) => {
    console.log(err);
})
// fyp_db_1

module.exports = pool;