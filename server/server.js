const express = require("express");
const cors = require("cors");
const pool = require("./database");

const objArrToDbInsertValues = require("./functionsforInsertRoute");
const objArrToDbUpdateSet = require("./functionsForUpdate");
const createPdf = require("./pdf");
const { error } = require("pdf-lib");

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
            INSERT INTO game_system(game_system_name, game_system_edition, game_system_version) 
            VALUES ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

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
        res.status(500).json({ error: err.message });
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
        res.status(500).json({ error: err.message });
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
        res.status(500).json({ error: err.message });
    }
});

app.post("/keyword", async (req, res) => {
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
        res.status(500).json({ error: err.message });
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
        res.status(500).json({ error: err.message });
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
        res.status(500).json({ error: err.message });
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
        res.status(500).json({ error: err.message });
    }
});

app.post("/gs_game_mode", async (req, res) => {
    try {
        const rows = objArrToDbInsertValues(req.body);
        const dbQuery = await pool.query(
            `
            INSERT INTO gs_game_mode(game_system_id, gs_gm_name) VALUES
            ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
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
        res.status(500).json({ error: err.message });
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
        res.status(500).json({ error: err.message });
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
        res.status(500).json({ error: err.message });
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
        res.status(500).json({ error: err.message });
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
        res.status(500).json({ error: err.message });
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
        res.status(500).json({ error: err.message });
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
        res.status(500).json({ error: err.message });
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
        res.status(500).json({ error: err.message });
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
        res.status(500).json({ error: err.message });
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
        res.status(500).json({ error: err.message });
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
        res.status(500).json({ error: err.message });
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
        res.status(500).json({ error: err.message });
    }
});

app.post("/army_list", async (req, res) => {
    try {
        const rows = objArrToDbInsertValues(req.body);
        const dbQuery = await pool.query(
            `
            INSERT INTO army_list(game_system_id, gs_gm_id, army_list_name) VALUES
            ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
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
        res.status(500).json({ error: err.message });
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
        res.status(500).json({ error: err.message });
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
        res.status(500).json({ error: err.message });
    }
});

app.post("/al_unit_a_unit_a_statline_quantity", async (req, res) => {
    try {
        const rows = objArrToDbInsertValues(req.body);
        const dbQuery = await pool.query(
            `
            INSERT INTO al_unit_a_unit_a_statline_quantity(al_unit_id, a_unit_id, a_statline_id, quantity) VALUES
            ${rows}
            RETURNING *;
            `
        )
        res.json(dbQuery.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// SELECT

// army list

// Get all army lists // to be tested
app.get("/army_list", async (req, res) => {
    try {
        const dbQuery = await pool.query(
            `SELECT
            *
            FROM army_list
            JOIN gs_game_mode ON army_list.gs_gm_id = gs_game_mode.gs_gm_id
            JOIN game_system ON army_list.game_system_id = game_system.game_system_id
            
            JOIN al_force ON army_list.army_list_id = al_force.army_list_id
            JOIN army ON al_force.army_id = army.army_id
            
            LEFT JOIN al_unit ON al_force.al_force_id = al_unit.al_force_id
            LEFT JOIN a_unit ON al_unit.a_unit_id = a_unit.a_unit_id
            
            LEFT JOIN al_upgrade ON  al_unit.al_unit_id = al_upgrade.al_unit_id
            LEFT JOIN a_upgrade ON al_upgrade.a_upgrade_id = a_upgrade.a_upgrade_id

            JOIN al_unit_a_unit_a_statline_quantity ON al_unit.al_unit_id = al_unit_a_unit_a_statline_quantity.al_unit_id
            LEFT JOIN a_unit_a_statline ON al_unit_a_unit_a_statline_quantity.a_statline_id = a_unit_a_statline.a_statline_id AND al_unit_a_unit_a_statline_quantity.a_unit_id = a_unit_a_statline.a_unit_id
            LEFT JOIN a_statline ON al_unit_a_unit_a_statline_quantity.a_statline_id = a_statline.a_statline_id
            ;`
        )

        res.json(dbQuery.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single unit // to be tested
app.get("/army_list/:id", async (req, res) => {
    try {
        const {id} = req.params;

        const dbQuery = await pool.query(
            `SELECT
            *
            FROM army_list
            JOIN gs_game_mode ON army_list.gs_gm_id = gs_game_mode.gs_gm_id
            JOIN game_system ON army_list.game_system_id = game_system.game_system_id
            
            JOIN al_force ON army_list.army_list_id = al_force.army_list_id
            JOIN army ON al_force.army_id = army.army_id
            
            LEFT JOIN al_unit ON al_force.al_force_id = al_unit.al_force_id
            LEFT JOIN a_unit ON al_unit.a_unit_id = a_unit.a_unit_id
            
            LEFT JOIN al_upgrade ON  al_unit.al_unit_id = al_upgrade.al_unit_id
            LEFT JOIN a_upgrade ON al_upgrade.a_upgrade_id = a_upgrade.a_upgrade_id

            JOIN al_unit_a_unit_a_statline_quantity ON al_unit.al_unit_id = al_unit_a_unit_a_statline_quantity.al_unit_id
            JOIN a_unit_a_statline ON al_unit_a_unit_a_statline_quantity.a_statline_id = a_unit_a_statline.a_statline_id
            JOIN a_statline ON al_unit_a_unit_a_statline_quantity.a_statline_id = a_statline.a_statline_id
            
            WHERE
            army_list.army_list_id = '${id}'
            ;`
        )

        res.json(dbQuery.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// army

// Get all armies // to be tested
app.get("/army", async (req, res) => {
    try {
        const dbQuery = await pool.query(
            `SELECT 
            *
            FROM army
            JOIN game_system ON army.game_system_id = game_system.game_system_id
            ;`
        )

        res.json(dbQuery.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single army // to be tested syntax error at or near "army"
app.get("/army/:id", async (req, res) => {
    try {
        const {id} = req.params;

        const dbQuery = await pool.query(
            `SELECT 
            *
            FROM army
            JOIN game_system ON army.game_system_id = game_system.game_system_id
            WHERE
            army.army_id = '${id}'
            ;`
        )

        res.json(dbQuery.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

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
        res.status(500).json({ error: err.message });
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

        res.json(dbQuery.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
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
        res.status(500).json({ error: err.message });
    }
});


// Get a single upgrade
app.get("/upgrade/:id", async (req, res) => {
    try {
        const {id} = req.params;

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
            a_upgrade.a_upgrade_id = '${id}'
            ;`
        );
        res.json(dbQuery.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// game system

// Get all game systems // to be tested
app.get("/game_system", async (req, res) => {
    try {
        const dbQuery = await pool.query(
            // `SELECT
            // *
            // FROM game_system
            // JOIN gs_unit_structure ON gs_unit_structure.game_system_id = game_system.game_system_id
            // JOIN gs_stat ON gs_unit_structure.gs_us_id = gs_stat.gs_us_id
            
            // LEFT JOIN rule ON game_system.game_system_id = rule.game_system_id
            // LEFT JOIN keyword_rule ON rule.rule_id = keyword_rule.rule_id
            // LEFT JOIN keyword ON keyword_rule.keyword_id = keyword.keyword_id
            // ;
            // `
            `SELECT 
            game_system.game_system_id, game_system_name, game_system_edition, game_system_version, gs_unit_structure.gs_us_id, gs_stat_id, gs_stat_name, gs_stat_acronyme, gs_supertype_id, gs_supertype_name, gs_supertype_lower, keyword.keyword_id, keyword_name, rule.rule_id, rule_name, rule_description 
            FROM game_system 
            LEFT JOIN gs_unit_structure ON game_system.game_system_id = gs_unit_structure.game_system_id 
            LEFT JOIN gs_stat ON gs_unit_structure.gs_us_id = gs_stat.gs_us_id 
            LEFT JOIN gs_supertype ON game_system.game_system_id = gs_supertype.game_system_id 
            LEFT JOIN rule ON game_system.game_system_id = rule.game_system_id 
            LEFT JOIN keyword_rule ON rule.rule_id = keyword_rule.rule_id 
            LEFT JOIN keyword ON keyword_rule.keyword_id = keyword.keyword_id ;`
        )

        res.json(dbQuery.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single game system // to be tested
app.get("/game_system/:id", async (req, res) => {
    try {
        const {id} = req.params;

        const dbQuery = await pool.query(
            // `
            // SELECT *
            // FROM game_system
            // JOIN gs_unit_structure ON gs_unit_structure.game_system_id = game_system.game_system_id
            // JOIN gs_stat ON gs_unit_structure.gs_us_id = gs_stat.gs_us_id
            
            // LEFT JOIN rule ON game_system.game_system_id = rule.game_system_id
            // LEFT JOIN keyword_rule ON rule.rule_id = keyword_rule.rule_id
            // LEFT JOIN keyword ON keyword_rule.keyword_id = keyword.keyword_id
            // WHERE
            `SELECT 
            game_system.game_system_id, game_system_name, game_system_edition, game_system_version, gs_unit_structure.gs_us_id, gs_stat_id, gs_stat_name, gs_stat_acronyme, gs_supertype_id, gs_supertype_name, gs_supertype_lower, keyword.keyword_id, keyword_name, rule.rule_id, rule_name, rule_description 
            FROM game_system 
            LEFT JOIN gs_unit_structure ON game_system.game_system_id = gs_unit_structure.game_system_id 
            LEFT JOIN gs_stat ON gs_unit_structure.gs_us_id = gs_stat.gs_us_id 
            LEFT JOIN gs_supertype ON game_system.game_system_id = gs_supertype.game_system_id 
            LEFT JOIN rule ON game_system.game_system_id = rule.game_system_id 
            LEFT JOIN keyword_rule ON rule.rule_id = keyword_rule.rule_id 
            LEFT JOIN keyword ON keyword_rule.keyword_id = keyword.keyword_id
            WHERE
            game_system.game_system_id = '${id}'
            ;`
        )

        res.json(dbQuery.rows);
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message });
    }
});

// UPDATE

app.put("/game_system/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const set = objArrToDbUpdateSet(req.body);
        const dbQuery = await pool.query(
            `
            UPDATE game_system
            SET ${set}
            WHERE game_system_id = $1
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'Game system not found' });
        } else {
            res.json(dbQuery.rows)
        }
    } catch (err) {
        
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put("/gs_supertype/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const set = objArrToDbUpdateSet(req.body);
        const dbQuery = await pool.query(
            `
            UPDATE gs_supertype SET
            ${set}
            WHERE
            gs_supertype.gs_supertype_id = $1
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'GS_supertype not found' });
        } else {
            res.json(dbQuery.rows)
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put("/gs_unit_structure/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const set = objArrToDbUpdateSet(req.body);
        const dbQuery = await pool.query(
            `
            UPDATE gs_unit_structure SET
            ${set}
            WHERE
            gs_unit_structure.gs_us_id = $1
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'gs_unit_structure not found' });
        } else {
            res.json(dbQuery.rows)
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put("/gs_stat/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const set = objArrToDbUpdateSet(req.body);
        const dbQuery = await pool.query(
            `
            UPDATE gs_stat SET
            ${set}
            WHERE
            gs_stat.gs_stat_id = $1
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'gs_stat not found' });
        } else {
            res.json(dbQuery.rows)
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put("/keyword/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const set = objArrToDbUpdateSet(req.body);
        const dbQuery = await pool.query(
            `
            UPDATE keyword SET
            ${set}
            WHERE
            keyword.keyword_id = $1
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'keyword not found' });
        } else {
            res.json(dbQuery.rows)
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put("/army/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const set = objArrToDbUpdateSet(req.body);
        const dbQuery = await pool.query(
            `
            UPDATE army SET
            ${set}
            WHERE
            army.army_id = $1
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'army not found' });
        } else {
            res.json(dbQuery.rows)
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.put("/rule/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const set = objArrToDbUpdateSet(req.body);
        const dbQuery = await pool.query(
            `
            UPDATE rule SET
            ${set}
            WHERE
            rule.rule_id = $1
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'rule not found' });
        } else {
            res.json(dbQuery.rows)
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put("/keyword_rule/:keywordId/:ruleId", async (req, res) => {
    try {
        const { keywordId, ruleId } = req.params;
        const set = objArrToDbUpdateSet(req.body);
        const dbQuery = await pool.query(
            `
            UPDATE keyword_rule SET
            ${set}
            WHERE
            keyword_id = $1 AND rule_id = $2
            RETURNING *;
            `,
            [keywordId, ruleId]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'keyword_rule not found' });
        } else {
            res.json(dbQuery.rows)
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put("/gs_game_mode/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const set = objArrToDbUpdateSet(req.body);
        const dbQuery = await pool.query(
            `
            UPDATE gs_game_mode SET
            ${set}
            WHERE
            gs_gm_id = $1
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'gs_game_mode not found' });
        } else {
            res.json(dbQuery.rows)
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put("/a_unit/:id", async (req, res) => {
    try {

        const { id } = req.params;
        const set = objArrToDbUpdateSet(req.body);

        const dbQuery = await pool.query(
            `
            UPDATE a_unit SET
            ${set}
            WHERE
            a_unit_id = $1
            RETURNING *;
            `,
            [id]
        );

        console.log(dbQuery)
        
        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'a_unit not found' });
        } else {
            res.json(dbQuery.rows)
        }
    } catch (err) {
        // console.error(err)
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.put("/a_upgrade_type/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const set = objArrToDbUpdateSet(req.body);
        const dbQuery = await pool.query(
            `
            UPDATE a_upgrade_type SET
            ${set}
            WHERE
            a_ut_id = $1
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'a_upgrade_type not found' });
        } else {
            res.json(dbQuery.rows)
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put("/a_upgrade/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const set = objArrToDbUpdateSet(req.body);
        const dbQuery = await pool.query(
            `
            UPDATE a_upgrade SET
            ${set}
            WHERE
            a_upgrade_id = $1
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'a_upgrade not found' });
        } else {
            res.json(dbQuery.rows)
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put("/a_unit_a_upgrade/:a_unit_id/:a_upgrade_id", async (req, res) => {
    try {
        const { a_unit_id, a_upgrade_id} = req.params;
        const set = objArrToDbUpdateSet(req.body);
        const dbQuery = await pool.query(
            `
            UPDATE a_unit_a_upgrade SET
            ${set}
            WHERE
            a_unit_id = $1 AND a_upgrade_id = $2
            RETURNING *;
            `,
            [a_unit_id, a_upgrade_id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'a_unit_a_upgrade not found' });
        } else {
            res.json(dbQuery.rows)
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.put("/a_statline/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const set = objArrToDbUpdateSet(req.body);
        const dbQuery = await pool.query(
            `
            UPDATE a_statline SET
            ${set}
            WHERE
            a_statline_id = $1
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'a_statline not found' });
        } else {
            res.json(dbQuery.rows)
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.put("/a_unit_a_statline/:a_unit_id/:a_statline_id", async (req, res) => {
    try {
        const {a_unit_id, a_statline_id} = req.params;
        const set = objArrToDbUpdateSet(req.body);
        const dbQuery = await pool.query(
            `
            UPDATE a_unit_a_statline SET
            ${set}
            WHERE
            a_unit_id = $1 AND a_statline_id = $2
            RETURNING *;
            `,
            [a_unit_id, a_statline_id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'a_unit_a_statline not found' });
        } else {
            res.json(dbQuery.rows)
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put("/a_unit_a_upgrade_type/:a_unit_id/:a_ut_id", async (req, res) => {
    try {
        const {a_unit_id, a_ut_id} = req.params;
        const set = objArrToDbUpdateSet(req.body);
        const dbQuery = await pool.query(
            `
            UPDATE a_unit_a_upgrade_type SET
            ${set}
            WHERE
            a_unit_id = $1 AND a_ut_id = $2
            RETURNING *;
            `,
            [a_unit_id, a_ut_id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'a_unit_a_upgrade_type not found' });
        } else {
            res.json(dbQuery.rows)
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put("/keyword_a_unit/:keyword_id/:a_unit_id", async (req, res) => {
    try {
        const {keyword_id, a_unit_id} = req.params;
        const set = objArrToDbUpdateSet(req.body);
        const dbQuery = await pool.query(
            `
            UPDATE keyword_a_unit SET
            ${set}
            WHERE
            keyword_id = $1 AND a_unit_id = $2
            RETURNING *;
            `,
            [keyword_id, a_unit_id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'keyword_a_unit not found' });
        } else {
            res.json(dbQuery.rows)
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.put("/rule_a_upgrade/:rule_id/:a_upgrade_id", async (req, res) => {
    try {
        const {rule_id, a_upgrade_id} = req.params;
        const set = objArrToDbUpdateSet(req.body);
        const dbQuery = await pool.query(
            `
            UPDATE rule_a_upgrade SET
            ${set}
            WHERE
            rule_id = $1 AND a_upgrade_id = $2
            RETURNING *;
            `,
            [rule_id, a_upgrade_id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'rule_a_upgrade not found' });
        } else {
            res.json(dbQuery.rows)
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.put("/rule_a_unit/:rule_id/:a_unit_id", async (req, res) => {
    try {
        const {rule_id, a_unit_id} = req.params;
        const set = objArrToDbUpdateSet(req.body);
        const dbQuery = await pool.query(
            `
            UPDATE rule_a_unit SET
            ${set}
            WHERE
            rule_id = $1 AND a_unit_id = $2
            RETURNING *;
            `,
            [rule_id, a_unit_id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'rule_a_unit not found' });
        } else {
            res.json(dbQuery.rows)
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.put("/a_statline_gs_stat/:a_statline_id/:gs_stat_id", async (req, res) => {
    try {
        const {a_statline_id, gs_stat_id} = req.params;
        const set = objArrToDbUpdateSet(req.body);
        const dbQuery = await pool.query(
            `
            UPDATE a_statline_gs_stat SET
            ${set}
            WHERE
            a_statline_id = $1 AND gs_stat_id = $2
            RETURNING *;
            `,
            [a_statline_id, gs_stat_id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'a_statline_gs_stat not found' });
        } else {
            res.json(dbQuery.rows)
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.put("/keyword_a_upgrade/:keyword_id/:a_upgrade_id", async (req, res) => {
    try {
        const {keyword_id, a_upgrade_id} = req.params;
        const set = objArrToDbUpdateSet(req.body);
        const dbQuery = await pool.query(
            `
            UPDATE keyword_a_upgrade SET
            ${set}
            WHERE
            keyword_id = $1 AND a_upgrade_id = $2
            RETURNING *;
            `,
            [keyword_id, a_upgrade_id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'keyword_a_upgrade not found' });
        } else {
            res.json(dbQuery.rows)
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put("/army_list/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const set = objArrToDbUpdateSet(req.body);
        const dbQuery = await pool.query(
            `
            UPDATE army_list SET
            ${set}
            WHERE
            army_list_id = $1
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'army_list not found' });
        } else {
            res.json(dbQuery.rows)
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.put("/al_force/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const set = objArrToDbUpdateSet(req.body);
        const dbQuery = await pool.query(
            `
            UPDATE al_force SET
            ${set}
            WHERE
            al_force_id = $1
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'al_force not found' });
        } else {
            res.json(dbQuery.rows)
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.put("/al_unit/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const set = objArrToDbUpdateSet(req.body);
        const dbQuery = await pool.query(
            `
            UPDATE al_unit SET
            ${set}
            WHERE
            al_unit_id = $1
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'al_unit not found' });
        } else {
            res.json(dbQuery.rows)
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.put("/al_upgrade/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const set = objArrToDbUpdateSet(req.body);
        const dbQuery = await pool.query(
            `
            UPDATE al_upgrade SET
            ${set}
            WHERE
            al_upgrade_id = $1
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'al_upgrade not found' });
        } else {
            res.json(dbQuery.rows)
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.put("/al_unit_a_unit_a_statline_quantity/:al_unit_id/:a_unit_id/:a_statline_id", async (req, res) => {
    try {
        const {al_unit_id, a_unit_id, a_statline_id} = req.params;
        const set = objArrToDbUpdateSet(req.body);
        const dbQuery = await pool.query(
            `
            UPDATE al_unit_a_unit_a_statline_quantity SET
            ${set}
            WHERE
            al_unit_id = $1 AND a_unit_id = $2 AND a_statline_id = $3
            RETURNING *;
            `,
            [al_unit_id, a_unit_id, a_statline_id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'al_unit_a_unit_a_statline_quantity not found' });
        } else {
            res.json(dbQuery.rows)
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});



//DELETE
app.delete("/game_system/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const dbQuery = await pool.query(
            `
            DELETE FROM game_system
            WHERE game_system_id = $1
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'Game system not found' });
        } else {
            res.json({ message: 'Game system deleted successfully', deletedGameSystem: dbQuery.rows[0] });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete("/gs_supertype/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const dbQuery = await pool.query(
            `
            DELETE FROM gs_supertype
            WHERE gs_supertype_id = $1
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'gs_supertype not found' });
        } else {
            // res.json({ message: 'gs_supertype deleted successfully', deletedGameSystem: dbQuery.rows[0] });
            res.json(dbQuery.rows);
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete("/gs_unit_structure/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const dbQuery = await pool.query(
            `
            DELETE FROM gs_unit_structure
            WHERE gs_us_id = $1
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'gs_unit_structure not found' });
        } else {
            // res.json({ message: 'gs_supertype deleted successfully', deletedGameSystem: dbQuery.rows[0] });
            res.json(dbQuery.rows);
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete("/gs_stat/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const dbQuery = await pool.query(
            `
            DELETE FROM gs_stat
            WHERE gs_stat_id = $1
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'gs_stat not found' });
        } else {
            res.json(dbQuery.rows);
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.delete("/keyword/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const dbQuery = await pool.query(
            `
            DELETE FROM keyword
            WHERE keyword_id = $1
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'keyword not found' });
        } else {
            res.json(dbQuery.rows);
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete("/army/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const dbQuery = await pool.query(
            `
            DELETE FROM army
            WHERE army_id = $1
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'army not found' });
        } else {
            res.json(dbQuery.rows);
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.delete("/rule/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const dbQuery = await pool.query(
            `
            DELETE FROM rule
            WHERE rule_id = $1
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'rule not found' });
        } else {
            res.json(dbQuery.rows);
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete("/keyword_rule/:keyword_id/:rule_id", async (req, res) => {
    try {
        const { keyword_id, rule_id } = req.params;
        const dbQuery = await pool.query(
            `
            DELETE FROM keyword_rule
            WHERE
            keyword_id = $1 AND rule_id = $2
            RETURNING *;
            `,
            [keyword_id, rule_id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'keyword_rule not found' });
        } else {
            res.json(dbQuery.rows);
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete("/gs_game_mode/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const dbQuery = await pool.query(
            `
            DELETE FROM gs_game_mode
            WHERE
            gs_gm_id = $1 
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'gs_game_mode not found' });
        } else {
            res.json(dbQuery.rows);
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete("/a_unit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const dbQuery = await pool.query(
            `
            DELETE FROM a_unit
            WHERE
            a_unit_id = $1 
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'a_unit not found' });
        } else {
            res.json(dbQuery.rows);
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete("/a_upgrade_type/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const dbQuery = await pool.query(
            `
            DELETE FROM a_upgrade_type
            WHERE
            a_ut_id = $1 
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'a_upgrade_type not found' });
        } else {
            res.json(dbQuery.rows);
        }
    } catch (err) {
        
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.delete("/a_upgrade/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const dbQuery = await pool.query(
            `
            DELETE FROM a_upgrade
            WHERE
            a_upgrade_id = $1 
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'a_upgrade not found' });
        } else {
            res.json(dbQuery.rows);
        }
    } catch (err) {
        
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete("/a_unit_a_upgrade/:a_unit_id/:a_upgrade_id", async (req, res) => {
    try {
        const { a_unit_id, a_upgrade_id } = req.params;
        const dbQuery = await pool.query(
            `
            DELETE FROM a_unit_a_upgrade
            WHERE
            a_unit_id = $1 AND a_upgrade_id = $2
            RETURNING *;
            `,
            [a_unit_id, a_upgrade_id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'a_unit_a_upgrade not found' });
        } else {
            res.json(dbQuery.rows);
        }
    } catch (err) {
        
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete("/a_statline/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const dbQuery = await pool.query(
            `
            DELETE FROM a_statline
            WHERE
            a_statline_id = $1 
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'a_statlinenot found' });
        } else {
            res.json(dbQuery.rows);
        }
    } catch (err) {
        
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete("/a_unit_a_statline/:a_unit_id/:a_statline_id", async (req, res) => {
    try {
        const { a_unit_id, a_statline_id } = req.params;
        const dbQuery = await pool.query(
            `
            DELETE FROM a_unit_a_statline
            WHERE
            a_unit_id = $1 AND a_statline_id = $2
            RETURNING *;
            `,
            [a_unit_id, a_statline_id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'a_unit_a_statline not found' });
        } else {
            res.json(dbQuery.rows);
        }
    } catch (err) {
        
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete("/a_unit_a_upgrade_type/:a_unit_id/:a_ut_id", async (req, res) => {
    try {
        const { a_unit_id, a_ut_id} = req.params;
        const dbQuery = await pool.query(
            `
            DELETE FROM a_unit_a_upgrade_type
            WHERE
            a_unit_id = $1 AND a_ut_id = $2
            RETURNING *;
            `,
            [a_unit_id, a_ut_id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'a_unit_a_upgrade_type not found' });
        } else {
            res.json(dbQuery.rows);
        }
    } catch (err) {
        
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete("/keyword_a_unit/:keyword_id/:a_unit_id", async (req, res) => {
    try {
        const { keyword_id, a_unit_id } = req.params;
        const dbQuery = await pool.query(
            `
            DELETE FROM keyword_a_unit
            WHERE
            keyword_id = $1 AND a_unit_id = $2 
            RETURNING *;
            `,
            [keyword_id, a_unit_id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'keyword_a_unit not found' });
        } else {
            res.json(dbQuery.rows);
        }
    } catch (err) {
        
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete("/rule_a_upgrade/:rule_id/:a_upgrade_id", async (req, res) => {
    try {
        const { rule_id, a_upgrade_id } = req.params;
        const dbQuery = await pool.query(
            `
            DELETE FROM rule_a_upgrade
            WHERE
            rule_id = $1 AND a_upgrade_id = $2
            RETURNING *;
            `,
            [rule_id, a_upgrade_id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'rule_a_upgrade not found' });
        } else {
            res.json(dbQuery.rows);
        }
    } catch (err) {
        
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete("/rule_a_unit/:rule_id/:a_unit_id", async (req, res) => {
    try {
        const { rule_id, a_unit_id } = req.params;
        const dbQuery = await pool.query(
            `
            DELETE FROM rule_a_unit
            WHERE
            rule_id = $1 AND a_unit_id = $2
            RETURNING *;
            `,
            [rule_id, a_unit_id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'rule_a_unit not found' });
        } else {
            res.json(dbQuery.rows);
        }
    } catch (err) {
        
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete("/a_statline_gs_stat/:a_statline_id/:gs_stat_id", async (req, res) => {
    try {
        const { a_statline_id, gs_stat_id } = req.params;
        const dbQuery = await pool.query(
            `
            DELETE FROM a_statline_gs_stat
            WHERE
            a_statline_id = $1 AND gs_stat_id = $2
            RETURNING *;
            `,
            [a_statline_id, gs_stat_id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'a_statline_gs_stat not found' });
        } else {
            res.json(dbQuery.rows);
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete("/keyword_a_upgrade/:keyword_id/:a_upgrade_id", async (req, res) => {
    try {
        const { keyword_id, a_upgrade_id} = req.params;
        const dbQuery = await pool.query(
            `
            DELETE FROM keyword_a_upgrade
            WHERE
            keyword_id = $1 AND a_upgrade_id = $2
            RETURNING *;
            `,
            [keyword_id, a_upgrade_id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'keyword_a_upgrade not found' });
        } else {
            res.json(dbQuery.rows);
        }
    } catch (err) {
        
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete("/army_list/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const dbQuery = await pool.query(
            `
            DELETE FROM army_list
            WHERE
            army_list_id = $1
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'army_list not found' });
        } else {
            res.json(dbQuery.rows);
        }
    } catch (err) {
        
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete("/al_force/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const dbQuery = await pool.query(
            `
            DELETE FROM al_force
            WHERE
            al_force_id = $1
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'al_force not found' });
        } else {
            res.json(dbQuery.rows);
        }
    } catch (err) {
        
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete("/al_unit/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const dbQuery = await pool.query(
            `
            DELETE FROM al_unit
            WHERE
            al_unit_id = $1
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'al_unit not found' });
        } else {
            res.json(dbQuery.rows);
        }
    } catch (err) {
        
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete("/al_upgrade/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const dbQuery = await pool.query(
            `
            DELETE FROM al_upgrade
            WHERE
            al_upgrade_id = $1
            RETURNING *;
            `,
            [id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'al_upgrade not found' });
        } else {
            res.json(dbQuery.rows);
        }
    } catch (err) {
        
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete("/al_unit_a_unit_a_statline_quantity/:al_unit_id/:a_unit_id/:a_statline_id", async (req, res) => {
    try {
        const {al_unit_id, a_unit_id, a_statline_id} = req.params;
        const dbQuery = await pool.query(
            `
            DELETE FROM al_unit_a_unit_a_statline_quantity
            WHERE
            al_unit_id = $1 AND a_unit_id = $2 AND a_statline_id = $3
            RETURNING *;
            `,
            [al_unit_id, a_unit_id, a_statline_id]
        );

        if (dbQuery.rowCount === 0) {
            res.status(404).json({ error: 'al_unit_a_unit_a_statline_quantity not found' });
        } else {
            res.json(dbQuery.rows);
        }
    } catch (err) {
        
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Raw PSQL request

app.post("/rawSQL", async (req, res) => {
    try {
        const content = req.body.sql;
        const dbQuery = await pool.query(content);
        res.json(dbQuery.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PDF

app.get('/pdf', async (req, res) => {
    try {
        const pdfStream = await createPdf();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="output.pdf"');
        pdfStream.pipe(res);
    } catch (error) {
        console.error('Error creating PDF:', error);
        res.status(500).send('Internal Server Error');
    }
});


const server = app.listen(4000, () => console.log("server on localhost 4000"));

module.exports = server;

// // for select specific should be /something/:id, when calling the actuall call should include whatever ID you want to find http://localhost:4000/something/actualID
