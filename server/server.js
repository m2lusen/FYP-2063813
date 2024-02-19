const express = require("express");
const cors = require("cors");
const pool = require("./database");
const objArrToDbInsertValues = require("./functionsforInsertRoute");

const app = express();

app.use(express.json());
app.use(cors());

// INSERT
// two kinds of insert, single row and multi row
app.post("/game_system", async (req, res) => {
    try {
        const rows = objArrToDbInsertValues(req.body);
        const dbQuery = await pool.query(
            `
            INSERT INTO game_system(game_system_name, game_system_edition, game_system_version) VALUES
            ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});
// bellow inserts are untested
app.post("/gs_supertype", async (req, res) => {
    try {
        const rows = objArrToDbInsertValues(req.body);
        const dbQuery = await pool.query(
            `
            INSERT INTO gs_supertype(game_system_id, gs_supertype_name, gs_supertype_lower) VALUES
            ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/gs_unit_structure", async (req, res) => {
    try {
        const rows = objArrToDbInsertValues(req.body);
        const dbQuery = await pool.query(
            `
            INSERT INTO gs_unit_structure(game_system_id) VALUES
            ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/gs_stat", async (req, res) => {
    try {
        const rows = objArrToDbInsertValues(req.body);
        const dbQuery = await pool.query(
            `
            INSERT INTO gs_stat(gs_us_id, gs_stat_name, gs_stat_acronyme) VALUES
            ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/keywords", async (req, res) => {
    try {
        const rows = objArrToDbInsertValues(req.body);
        const dbQuery = await pool.query(
            `
            INSERT INTO keyword(gs_us_id, keyword_name) VALUES
            ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/army", async (req, res) => {
    try {
        const rows = objArrToDbInsertValues(req.body);
        const dbQuery = await pool.query(
            `
            INSERT INTO army(game_system_id, army_name, army_edition, army_version) VALUES
            ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/rule", async (req, res) => {
    try {
        const rows = objArrToDbInsertValues(req.body);
        const dbQuery = await pool.query(
            `
            INSERT INTO rule(game_system_id, rule_name, rule_description) VALUES
            ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/keyword_rule", async (req, res) => {
    try {
        const rows = objArrToDbInsertValues(req.body);
        const dbQuery = await pool.query(
            `
            INSERT INTO keyword_rule(rule_id, keyword_id) VALUES
            ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/gs_game_mode", async (req, res) => {
    try {
        const rows = objArrToDbInsertValues(req.body);
        const dbQuery = await pool.query(
            `
            INSERT INTO gs_game_mode(game_system_id, gs_gM_name) VALUES
            ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/a_unit", async (req, res) => {
    try {
        const rows = objArrToDbInsertValues(req.body);
        const dbQuery = await pool.query(
            `
            INSERT INTO a_unit(army_id, gs_supertype_id, a_unit_name, a_unit_PC, a_unit_limit_per_army) VALUES
            ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});


app.post("/a_upgrade_type", async (req, res) => {
    try {
        const rows = objArrToDbInsertValues(req.body);
        const dbQuery = await pool.query(
            `
            INSERT INTO a_upgrade_type(a_ut_name, a_ut_min, a_ut_max) VALUES
            ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/a_upgrade", async (req, res) => {
    try {
        const rows = objArrToDbInsertValues(req.body);
        const dbQuery = await pool.query(
            `
            INSERT INTO a_upgrade(a_ut_id, a_upgrade_PC, a_upgrade_name) VALUES
            ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/a_unit_a_upgrade", async (req, res) => {
    try {
        const rows = objArrToDbInsertValues(req.body);
        const dbQuery = await pool.query(
            `
            INSERT INTO a_unit_a_upgrade(a_unit_id, a_upgrade_id) VALUES
            ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/a_statline", async (req, res) => {
    try {
        const rows = objArrToDbInsertValues(req.body);
        const dbQuery = await pool.query(
            `
            INSERT INTO a_statline(a_statline_name) VALUES
            ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/a_unit_a_statline", async (req, res) => {
    try {
        const rows = objArrToDbInsertValues(req.body);
        const dbQuery = await pool.query(
            `
            INSERT INTO a_unit_a_statline(a_unit_id, a_statline_id, a_statline_min, a_statline_max, a_statline_point_cost) VALUES
            ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/a_unit_a_upgrade_type", async (req, res) => {
    try {
        const rows = objArrToDbInsertValues(req.body);
        const dbQuery = await pool.query(
            `
            INSERT INTO a_unit_a_upgrade_type(a_unit_id, a_ut_id) VALUES
            ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/keyword_a_unit", async (req, res) => {
    try {
        const rows = objArrToDbInsertValues(req.body);
        const dbQuery = await pool.query(
            `
            INSERT INTO keyword_a_unit(keyword_id, a_unit_id) VALUES
            ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/rule_a_upgrade", async (req, res) => {
    try {
        const rows = objArrToDbInsertValues(req.body);
        const dbQuery = await pool.query(
            `
            INSERT INTO rule_a_upgrade(rule_id, a_upgrade_id) VALUES
            ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/rule_a_unit", async (req, res) => {
    try {
        const rows = objArrToDbInsertValues(req.body);
        const dbQuery = await pool.query(
            `
            INSERT INTO rule_a_unit(rule_id, a_unit_id) VALUES
            ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/a_statline_gs_stat", async (req, res) => {
    try {
        const rows = objArrToDbInsertValues(req.body);
        const dbQuery = await pool.query(
            `
            INSERT INTO a_statline_gs_stat(a_statline_id, gs_stat_id, stat_value) VALUES
            ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/keyword_a_upgrade", async (req, res) => {
    try {
        const rows = objArrToDbInsertValues(req.body);
        const dbQuery = await pool.query(
            `
            INSERT INTO keyword_a_upgrade(keyword_id, a_upgrade_id) VALUES
            ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/army_list", async (req, res) => {
    try {
        const rows = objArrToDbInsertValues(req.body);
        const dbQuery = await pool.query(
            `
            INSERT INTO army_list(game_system_id, gs_gM_id, army_list_name) VALUES
            ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/al_force", async (req, res) => {
    try {
        const rows = objArrToDbInsertValues(req.body);
        const dbQuery = await pool.query(
            `
            INSERT INTO al_force(army_list_id, army_id) VALUES
            ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/al_unit", async (req, res) => {
    try {
        const rows = objArrToDbInsertValues(req.body);
        const dbQuery = await pool.query(
            `
            INSERT INTO al_unit(al_force_id, a_unit_id, al_unit_name, al_unit_color) VALUES
            ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/al_upgrade", async (req, res) => {
    try {
        const rows = objArrToDbInsertValues(req.body);
        const dbQuery = await pool.query(
            `
            INSERT INTO al_upgrade(al_unit_id, a_upgrade_id, a_ut_id) VALUES
            ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err.message);
    }
});
// SELECT
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
    //     const {description} = req.body;
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
