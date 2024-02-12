INSERT INTO game_system(game_system_name, game_system_edition, game_system_version) VALUES
('Mythic Americas', '1st edition', 1.0);

INSERT INTO gs_supertype(game_system_id, gs_supertype_name, gs_supertype_lower) VALUES
(1, 'Warlord', 1),
(1, 'Warrior', NULL),
(1, 'Mounted', NULL),
(1, 'Beast', NULL),
(1, 'Monster', NULL),
(1, 'Swarms', NULL),
(1, 'Monstrosity', NULL);

INSERT INTO gs_unit_structure(game_system_id) VALUES
(1);

-- update gs_stat before testing
INSERT INTO gs_stat(gs_us_id, gs_stat_name, gs_stat_acronyme) VALUES
(1, 'Agility', 'Ag'),
(1, 'Accuracy', 'Acc'),
(1, 'Strength', 'Str'),
(1, 'Resist', 'Res'),
(1, 'Initiative', 'Init'),
(1, 'Command', 'Co');

-- keywords, are for all intensive purposes rules in this case
INSERT INTO gs_keyword(gs_us_id, gs_keyword_name) VALUES
(1, 'though'),
(1, 'Command'),
(1, 'Wound'),
(1, 'Dread'),
(1, 'Magic Level 1'),
(1, 'Magic Level 2'),
(1, 'Magic Level 3'),
(1, 'Undead'),
(1, 'Savage'),
(1, 'Fast 6'),
(1, 'Fast 8'),
(1, '2x HtH'),
(1, '3x HtH SV2'),
(1, 'Large'),
(1, 'Venomous'),
(1, 'Flies'),
(1, 'Heavily Laden'), 
(1, 'MoD2'),
(1, '2xHtH SV3'),
(1, 'Throw Corpse'),
(1, 'Stuck In');

INSERT INTO gs_rule(game_system_id, gs_rule_name, gs_rule_description) VALUES
(1, 'though', 'Ecetera Ecetera'),
(1, 'Command', 'Ecetera Ecetera'),
(1, 'Wound', 'Ecetera Ecetera'),
(1, 'Dread', 'Ecetera Ecetera'),
(1, 'Magic Level 1', 'Ecetera Ecetera'),
(1, 'Magic Level 2', 'Ecetera Ecetera'),
(1, 'Magic Level 3', 'Ecetera Ecetera'),
(1, 'Undead', 'Ecetera Ecetera'),
(1, 'Savage', 'Ecetera Ecetera'),
(1, 'Fast 6', 'Ecetera Ecetera'),
(1, 'Fast 8', 'Ecetera Ecetera'),
(1, '2x HtH', 'Ecetera Ecetera'),
(1, '3x HtH SV2', 'Ecetera Ecetera'),
(1, 'Large', 'Ecetera Ecetera'),
(1, 'Venomous', 'Ecetera Ecetera'),
(1, 'Flies', 'Ecetera Ecetera'),
(1, 'Heavily Laden', 'Ecetera Ecetera'), 
(1, 'MoD2', 'Ecetera Ecetera'),
(1, '2xHtH SV3', 'Ecetera Ecetera'),
(1, 'Throw Corpse', 'Ecetera Ecetera'),
(1, 'Stuck In', 'Ecetera Ecetera');

INSERT INTO gs_keyword_gs_rule(gs_rule_id, gs_keyword_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10),
(11, 11),
(12, 12),
(13, 13),
(14, 14),
(15, 15),
(16, 16),
(17, 17),
(18, 18),
(19, 19),
(20, 20);

INSERT INTO gs_game_mode(game_system_id, gs_gM_name) VALUES
(1, 'Open');

INSERT INTO army(game_system_id, army_name, army_edition, army_version) VALUES
(1, 'The Tribal Nations', '1st edition', 1),
(1, 'The Aztecs', '1st edition', 1),
(1, 'The Incas', '1st edition', 1),
(1, 'The Maya', '1st edition', 1);

-- update DB
INSERT INTO a_unit(army_id, gs_supertype_id, a_unit_name, a_unit_PC, a_unit_min, a_unit_max, a_unit_limit_per_army) VALUES
(1, 1, 'Sachem Warlord', 92, 1),
(1, 1, 'Sachem Warlord Mounted on War Eagle', 131, 1),
(1, 2, 'Medicine Man', 63, 1),
(1, 2, 'Mohawk warriors', 62, NULL),
(1, 2, 'Seneca Archers', 77, NULL),
(1, 5, 'Sasquatch', 147,  NULL),
(1, 3, 'Eagles', 78, NULL),
(1, 7, 'Wendigo', 151, 1),
(1, 3, 'Wolves', 80, NULL);

INSERT INTO a_upgrade_type(a_UT_name, a_UT_min, a_UT_max) VALUES
('Upgrade', NULL, NULL),
('Monstrosity Type', 1, 1);

INSERT INTO a_upgrade(a_UT_id, a_upgrade_PC, a_upgrade_name) VALUES
(1, 10, 'Wounds 2'),
(1, 10, 'Tough 2'),
(1, 14, 'Wounds 2'),
(1, 28, 'Wounds 3'),
(1, 25, 'Magic Level 2'),
(1, 50, 'Magic Level 3'),
(1, 3, 'Tomahawks'),
(1, 10, 'Dead Eye Shot'),
(2, 0, 'Wild'),
(2, 20, 'Bound'),
(2, 40, 'Allied');


INSERT INTO a_unit_a_upgrade(a_unit_id, a_upgrade_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(2, 2),
(3, 2),
(3, 5),
(3, 6),
(3, 7),
(4, 7),
(5, 8),
(8, 9),
(8, 10),
(8, 11);


-- update DB
INSERT INTO a_statline(a_statline_name) VALUES
('Sachem with Tomahawks'),
('Mohawk Warrior'),
('Sachem with a_special_rule'),
('War Eagle'),
('Medicine Man'),
('Mohawk Warriors Leader'),
('Seneca Warrior Leader'),
('Seneca Warrior '),
('Sasquatch'),
('Eagles'),
('Wendigo'),
('Wolves');

INSERT INTO a_unit_a_statline(a_unit_id, a_statline_id, a_statline_min, a_statline_max, a_statline_point_cost) VALUES
(1, 1, 1, 1, NULL),
(1, 2, 2, 4, 13),
(2, 3, 1, 1, NULL),
(2, 4, 1, 1, NULL),
(3, 5, 1, 1, NULL),
(3, 2, 0, 4, 10),
(4, 6, 1, 1, NULL),
(4, 2, 4, 9, 10),
(5, 7, 1, 1, NULL),
(5, 8, 4, 9, 13),
(6, 8, 3, 5, 47),
(7, 9, 3, 5, 26),
(8, 10, 1, 1, NULL),
(9, 11, 5, 5, NULL);

INSERT INTO a_unit_a_upgrade_type(a_unit_id, a_UT_id) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(8, 2),
(9, 1);

-- a_keyword is blank

--  a_keyword_a_upgrade is blank

--  a_keyword_a_unit is blank

--  a_special_rule is blank

--  a_keyword_a_special_rule is blank


-- update db
INSERT INTO a_statline_gs_stat(a_statline_id, gs_stat_id, stat_value)
(1, 1, 6),
(1, 2, 5),
(1, 3, 5),
(1, 4, 5),
(1, 5, 8),
(1, 6, 8),
(2, 1, 6),
(2, 2, 5),
(2, 3, 5),
(2, 4, 5),
(2, 5, 7),
(2, 6, 7),
(3, 1, 6),
(3, 2, 5),
(3, 3, 5),
(3, 4, 6),
(3, 5, 8),
(3, 6, 8),
(4, 1, NULL),
(4, 2, NULL),
(4, 3, 6),
(4, 4, NULL),
(4, 5, NULL),
(4, 6, NULL),
(5, 1, 6),
(5, 2, 5),
(5, 3, 5),
(5, 4, 5),
(5, 5, 7),
(5, 6, 8),
(6, 1, 6),
(6, 2, 5),
(6, 3, 5),
(6, 4, 5),
(6, 5, 7),
(6, 6, 8),
(7, 1, 6),
(7, 2, 6),
(7, 3, 5),
(7, 4, 5),
(7, 5, 7),
(7, 6, 8),
(8, 1, 6),
(8, 2, 6),
(8, 3, 5),
(8, 4, 5),
(8, 5, 7),
(8, 6, 7),
(9, 1, 5),
(9, 2, 5),
(9, 3, 7),
(9, 4, 8),
(9, 5, 6),
(9, 6, 8),
(10, 1, 6),
(10, 2, 5),
(10, 3, 5),
(10, 4, 4),
(10, 5, 7),
(10, 6, 8),
(11, 1, 6),
(11, 2, 5),
(11, 3, 7),
(11, 4, 9),
(11, 5, 7),
(11, 6, 8),
(12, 1, 6),
(12, 2, 5),
(12, 3, 5),
(12, 4, 5),
(12, 5, 7),
(12, 6, 7);

-- gs_keyword_a_upgrade is blank

