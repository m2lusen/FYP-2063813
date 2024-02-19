const express = require("express");
const cors = require("cors");
const pool = require("./database");

const app = express();

app.use(express.json());
app.use(cors());

// Unit

// Get all units
app.get("/unit", async (req, res) => {
    try {
        const dbQuery = await pool.query(
            `SELECT
            *
            FROM a_unit
            JOIN a_unit_a_statline ON a_unit.a_unit_id = a_unit_a_statline.a_unit_id
            JOIN a_statline ON a_unit_a_statline.a_statline_id = a_statline.a_statline_id
            JOIN a_statline_gs_stat ON a_statline.a_statline_id = a_statline_gs_stat.a_statline_id
            JOIN gs_stat ON a_statline_gs_stat.gs_stat_id = gs_stat.gs_stat_id
            
            JOIN gs_supertype ON a_unit.gs_supertype_id = gs_supertype.gs_supertype_id
            
            JOIN a_unit_a_upgrade ON a_unit.a_unit_id = a_unit_a_upgrade.a_unit_id
            JOIN a_upgrade ON a_unit_a_upgrade.a_upgrade_id = a_upgrade.a_upgrade_id
            JOIN a_upgrade_type ON a_upgrade.a_ut_id = a_upgrade_type.a_ut_id 
            
            LEFT JOIN keyword_a_unit ON a_unit.a_unit_id = keyword_a_unit.a_unit_id
            LEFT JOIN keyword ON keyword_a_unit.keyword_id = keyword.keyword_id
            
            LEFT JOIN rule_a_unit ON a_unit.a_unit_id = rule_a_unit.a_unit_id
            LEFT JOIN rule ON rule_a_unit.rule_id = rule.rule_id
            ;`
        )

        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});



// Get a single unit
app.get("/unit/:name", async (req, res) => {
    try {
        const {name} = req.params;

        const dbQuery = await pool.query(
            `SELECT
            *
            FROM a_unit
            JOIN a_unit_a_statline ON a_unit.a_unit_id = a_unit_a_statline.a_unit_id
            JOIN a_statline ON a_unit_a_statline.a_statline_id = a_statline.a_statline_id
            JOIN a_statline_gs_stat ON a_statline.a_statline_id = a_statline_gs_stat.a_statline_id
            JOIN gs_stat ON a_statline_gs_stat.gs_stat_id = gs_stat.gs_stat_id
            
            JOIN gs_supertype ON a_unit.gs_supertype_id = gs_supertype.gs_supertype_id
            
            JOIN a_unit_a_upgrade ON a_unit.a_unit_id = a_unit_a_upgrade.a_unit_id
            JOIN a_upgrade ON a_unit_a_upgrade.a_upgrade_id = a_upgrade.a_upgrade_id
            JOIN a_upgrade_type ON a_upgrade.a_ut_id = a_upgrade_type.a_ut_id 
            
            LEFT JOIN keyword_a_unit ON a_unit.a_unit_id = keyword_a_unit.a_unit_id
            LEFT JOIN keyword ON keyword_a_unit.keyword_id = keyword.keyword_id
            
            LEFT JOIN rule_a_unit ON a_unit.a_unit_id = rule_a_unit.a_unit_id
            LEFT JOIN rule ON rule_a_unit.rule_id = rule.rule_id
            
            WHERE
            a_unit.a_unit_name = '${name}'
            ;`
        )

        console.log(dbQuery.rows);
        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Upgrade

// Get all upgrades
app.get("/upgrade", async (req, res) => {
    try {
        const dbQuery = await pool.query(
            `SELECT
            *
            FROM a_upgrade
            JOIN a_upgrade_type ON a_upgrade.a_ut_id = a_upgrade_type.a_ut_id 
        
            LEFT JOIN keyword_a_upgrade ON a_upgrade.a_upgrade_id = keyword_a_upgrade.a_upgrade_id
            LEFT JOIN keyword ON keyword_a_upgrade.keyword_id = keyword.keyword_id
        
            LEFT JOIN rule_a_upgrade ON a_upgrade.a_upgrade_id = rule_a_upgrade.a_upgrade_id
            LEFT JOIN rule ON rule_a_upgrade.rule_id = rule.rule_id
            ;`
        )

        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});


// Get a single upgrade
app.get("/upgrade/:id", async (req, res) => {
    try {
        const upgradeID = req.body["upgradeID"];

        const dbQuery = await pool.query(
            `SELECT
            *
            FROM a_upgrade
            JOIN a_upgrade_type ON a_upgrade.a_ut_id = a_upgrade_type.a_ut_id 
        
            LEFT JOIN keyword_a_upgrade ON a_upgrade.a_upgrade_id = keyword_a_upgrade.a_upgrade_id
            LEFT JOIN keyword ON keyword_a_upgrade.keyword_id = keyword.keyword_id
        
            LEFT JOIN rule_a_upgrade ON a_upgrade.a_upgrade_id = rule_a_upgrade.a_upgrade_id
            LEFT JOIN rule ON rule_a_upgrade.rule_id = rule.rule_id
        
            WHERE
            a_upgrade.a_upgrade_id = '${upgradeID}'
            ;`
        );
        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(4000, () => console.log("server on localhost 4000"));


// examples for each of select all, select wheere, insert, delete and update

// // insert
// app.post("/insertExample", async (req, res) => {
//     try {
//         const dbQuery = await pool.query(
//         )

//         res.json(dbQuery.rows);
//     } catch (err) {
//         console.error(err.message);
//     }
// });

// // select
// app.get("/selectExample", async (req, res) => {
//     try {
//         const dbQuery = await pool.query(
//         )

//         res.json(dbQuery.rows);
//     } catch (err) {
//         console.error(err.message);
//     }
// });

// // for select specific should be /something/:id, when calling the actuall call should include whatever ID you want to find http://localhost:4000/something/actualID

// // delete
// app.delete("/deleteExamples/:id", async (req, res) => {
//     try {
//         const {params} = req.params;
//         const dbQuery = await pool.query(
//         )

//         res.json(dbQuery.rows);
//     } catch (err) {
//         console.error(err.message);
//     }
// });

// update
// app.put("/updateExample/:id", async (req, res) => {
//     try {
//         const {params} = req.params;
//         const {description} = req.body;
//         const dbQuery = await pool.query(
//         )

//         res.json(dbQuery.rows);
//     } catch (err) {
//         console.error(err.message);
//     }
// });