-- structure:
-- -- the querys are structured so that
-- ---- Insert queries are only per table, each table has an insert. It is assumed that any queries required to find a foreign key (or other such information) is made before hand, and that all relevant information will be in the body
-- ---- Select queries are collections, and include both select alls and select where
-- ---- update queries are per table
-- ---- delete queries are per table and collection

-- INSERT
INSERT INTO game_system(game_system_name, game_system_edition, game_system_version) VALUES
();

INSERT INTO gs_supertype(game_system_id, gs_supertype_name, gs_supertype_lower) VALUES
();

INSERT INTO gs_unit_structure(game_system_id) VALUES
();

INSERT INTO gs_stat(gs_us_id, gs_stat_name, gs_stat_acronyme) VALUES
();

INSERT INTO keyword(gs_us_id, keyword_name) VALUES
();

INSERT INTO army(game_system_id, army_name, army_edition, army_version) VALUES
();

INSERT INTO rule(game_system_id, rule_name, rule_description) VALUES
();

INSERT INTO keyword_rule(rule_id, keyword_id) VALUES
();

INSERT INTO gs_game_mode(game_system_id, gs_gM_name) VALUES
();

INSERT INTO a_unit(army_id, gs_supertype_id, a_unit_name, a_unit_PC, a_unit_limit_per_army) VALUES
();
INSERT INTO a_upgrade_type(a_ut_name, a_ut_min, a_ut_max) VALUES
();

INSERT INTO a_upgrade(a_ut_id, a_upgrade_PC, a_upgrade_name) VALUES
();

INSERT INTO a_unit_a_upgrade(a_unit_id, a_upgrade_id) VALUES
();

INSERT INTO a_statline(a_statline_name) VALUES
();

INSERT INTO a_unit_a_statline(a_unit_id, a_statline_id, a_statline_min, a_statline_max, a_statline_point_cost) VALUES
();

INSERT INTO a_unit_a_upgrade_type(a_unit_id, a_ut_id) VALUES
();

INSERT INTO keyword_a_unit(keyword_id, a_unit_id) VALUES
();

INSERT INTO rule_a_upgrade(rule_id, a_upgrade_id) VALUES
();

INSERT INTO rule_a_unit(rule_id, a_unit_id) VALUES
();

INSERT INTO a_statline_gs_stat(a_statline_id, gs_stat_id, stat_value) VALUES
();

INSERT INTO keyword_a_upgrade(keyword_id, a_upgrade_id) VALUES
();

INSERT INTO army_list(game_system_id, gs_gM_id, army_list_name) VALUES
();

INSERT INTO al_force(army_list_id, army_id) VALUES
();

INSERT INTO al_unit(al_force_id, a_unit_id, al_unit_name, al_unit_color) VALUES
();

INSERT INTO al_upgrade(al_unit_id, a_upgrade_id, a_ut_id) VALUES
();


-- SELECT

-- army list
-- -- this is the army list as a complete entity, not just the army list table. Includes the following tables:
-- -- army list, gs_game_mode, game system, al-force, army, al_unit, a_unit, al_upgrade, a_upgrade
SELECT
*
FROM army_list
JOIN gs_game_mode ON army_list.gs_gM_id = gs_game_mode.gs_gM_id
JOIN game_system ON army_list.game_system_id = game_system.game_system_id

JOIN al_force ON army_list.army_list_id = al_force.army_list_id
JOIN army ON al_force.army_id = army.army_id

LEFT JOIN al_unit ON al_force.al_force_id = al_unit.al_force_id
LEFT JOIN a_unit ON al_unit.a_unit_id = a_unit.a_unit_id

LEFT JOIN al_upgrade ON  al_unit.al_unit_id = al_upgrade.al_unit_id
LEFT JOIN a_upgrade ON al_upgrade.a_upgrade_id = a_upgrade.a_upgrade_id
;

-- army
SELECT 
*
FROM army
JOIN game_system ON army.game_system_id = game_system.game_system_id
;

-- unit
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
;

-- upgrade
SELECT
*
FROM a_upgrade
JOIN a_upgrade_type ON a_upgrade.a_ut_id = a_upgrade_type.a_ut_id 

LEFT JOIN keyword_a_upgrade ON a_upgrade.a_upgrade_id = keyword_a_upgrade.a_upgrade_id
LEFT JOIN keyword ON keyword_a_upgrade.keyword_id = keyword.keyword_id

LEFT JOIN rule_a_upgrade ON a_upgrade.a_upgrade_id = rule_a_upgrade.a_upgrade_id
LEFT JOIN rule ON rule_a_upgrade.rule_id = rule.rule_id
;

-- game system