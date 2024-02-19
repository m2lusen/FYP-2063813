SELECT
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
a_unit.a_unit_name = 'Wendigo'
;






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
