const pool = require("./database");

const dbQuery = `

SELECT
*
FROM a_upgrade
JOIN a_upgrade_type ON a_upgrade.a_ut_id = a_upgrade_type.a_ut_id 

LEFT JOIN keyword_a_upgrade ON a_upgrade.a_upgrade_id = keyword_a_upgrade.a_upgrade_id
LEFT JOIN keyword ON keyword_a_upgrade.keyword_id = keyword.keyword_id

LEFT JOIN rule_a_upgrade ON a_upgrade.a_upgrade_id = rule_a_upgrade.a_upgrade_id
LEFT JOIN rule ON rule_a_upgrade.rule_id = rule.rule_id

WHERE
a_upgrade.a_upgrade_id = 1
;
`;


pool.query(dbQuery).then((response) => {
    console.log(response);
    console.log(response.rows);
}).catch((err) => {
    console.log(err);
});

module.exports = pool;