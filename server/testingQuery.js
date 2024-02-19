const pool = require("./database");

const dbQuery = `

SELECT
*
FROM game_system
JOIN gs_unit_structure ON gs_unit_structure.game_system_id = game_system.game_system_id
JOIN gs_stat ON gs_unit_structure.gs_us_id = gs_stat.gs_us_id

LEFT JOIN rule ON game_system.game_system_id = rule.game_system_id
LEFT JOIN keyword_rule ON rule.rule_id = keyword_rule.rule_id
LEFT JOIN keyword ON keyword_rule.keyword_id = keyword.keyword_id
;
`;


pool.query(dbQuery).then((response) => {
    // console.log(response);
    console.log(response.rows);
}).catch((err) => {
    console.log(err);
});

module.exports = pool;