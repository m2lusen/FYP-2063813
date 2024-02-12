-- query to find all of the relevant stats for any units. Ledft joins are present on tables that can be null. 


-- issues with rules, since rules can come from so many different places

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

LEFT JOIN rule_a_unit ON a_unit.a_unit_id = rule_a_unit.a_unit_id
LEFT JOIN rule ON rule_a_unit.rule_id = rule.rule_id

LEFT JOIN gs_keyword_gs_rule ON gs_keyword_gs_rule.gs_keyword_id = gs_keyword.gs_keyword_id




WHERE
a_unit.a_unit_name = 'Wendigo'
;

-- notes for code
-- response.rows.gs_stat_acronyme
-- response.rows.stat_value



-- all gsKeyword
-- all gs_rule
-- all a_keyword
-- ass special rule