const {Pool} = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "meggymoo",
    host: "localhost",
    port: 5432,
    database: "fyp_db_1"
})



const dbQuery = `
SELECT
*
FROM a_unit
JOIN a_unit_a_statline ON a_unit.a_unit_id = a_unit_a_statline.a_unit_id
JOIN a_statline ON a_unit_a_statline.a_statline_id = a_statline.a_statline_id
JOIN a_statline_gs_stat ON a_statline.a_statline_id = a_statline_gs_stat.a_statline_id
JOIN gs_stat ON a_statline_gs_stat.gs_stat_id = gs_stat.gs_stat_id

JOIN a_unit_a_upgrade_type ON a_unit.a_unit_id = a_unit_a_upgrade_type.a_unit_id
JOIN a_upgrade_type ON a_unit_a_upgrade_type.a_ut_id = a_upgrade_type.a_ut_id
JOIN a_upgrade ON a_upgrade_type.a_ut_id = a_upgrade.a_ut_id
LEFT JOIN gs_keyword_a_upgrade ON a_upgrade.a_upgrade_id = gs_keyword_a_upgrade.a_upgrade_id
LEFT JOIN gs_keyword ON gs_keyword_a_upgrade.gs_keyword_id = gs_keyword.gs_keyword_id
LEFT JOIN gs_keyword_gs_rule ON gs_keyword_gs_rule.gs_keyword_id = gs_keyword.gs_keyword_id
LEFT JOIN gs_rule ON gs_keyword_gs_rule.gs_rule_id = gs_rule.gs_rule_id
LEFT JOIN a_keyword_a_unit ON a_unit.a_unit_id = a_keyword_a_unit.a_unit_id
LEFT JOIN a_keyword ON a_keyword_a_unit.a_keyword_id = a_keyword.a_keyword_id

WHERE
a_unit.a_unit_name = 'Wendigo'
;






`;


pool.query(dbQuery).then((response) => {
    // console.log(response);
    console.log(response.rows);
}).catch((err) => {
    console.log(err);
})
// fyp_db_1

module.exports = pool;



