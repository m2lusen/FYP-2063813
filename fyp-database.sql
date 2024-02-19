DROP TABLE
    IF EXISTS game_system;

CREATE TABLE
    game_system(
        game_system_id SMALLSERIAL PRIMARY KEY NOT NULL,
        game_system_name VARCHAR(25) NOT NULL UNIQUE,
        game_system_edition VARCHAR(25) NOT NULL,
        game_system_version SMALLINT NOT NULL
    );

INSERT INTO game_system(game_system_name, game_system_edition, game_system_version) VALUES
('Mythic Americas', '1st edition', 1.0);

DROP TABLE
    IF EXISTS gs_supertype;

CREATE TABLE
    gs_supertype(
        gs_supertype_id SMALLSERIAL PRIMARY KEY NOT NULL,
        game_system_id SMALLINT NOT NULL REFERENCES game_system(game_system_id),
        gs_supertype_name VARCHAR(25) NOT NULL,
        gs_supertype_upper SMALLINT,
        gs_supertype_lower SMALLINT
    );

INSERT INTO gs_supertype(game_system_id, gs_supertype_name, gs_supertype_lower) VALUES
(1, 'Warlord', 1),
(1, 'Warrior', NULL),
(1, 'Mounted', NULL),
(1, 'Beast', NULL),
(1, 'Monster', NULL),
(1, 'Swarms', NULL),
(1, 'Monstrosity', NULL);

DROP TABLE
    IF EXISTS gs_unit_structure;

CREATE TABLE
    gs_unit_structure(
        gs_us_id SMALLSERIAL PRIMARY KEY NOT NULL,
        game_system_id SMALLINT NOT NULL REFERENCEs game_system(game_system_id)
    );

INSERT INTO gs_unit_structure(game_system_id) VALUES
(1);

DROP TABLE
    IF EXISTS gs_stat;

CREATE TABLE
    gs_stat(
        gs_stat_id SMALLSERIAL PRIMARY KEY NOT NULL,
        gs_us_id SMALLINT NOT NULL REFERENCEs gs_unit_structure(gs_us_id),
        gs_stat_name VARCHAR(25) NOT NULL,
        gs_stat_acronyme VARCHAR(4) NOT NULL,
        gs_stat_upper SMALLINT,
        gs_stat_low SMALLINT
    );

INSERT INTO gs_stat(gs_us_id, gs_stat_name, gs_stat_acronyme) VALUES
(1, 'Agility', 'Ag'),
(1, 'Accuracy', 'Acc'),
(1, 'Strength', 'Str'),
(1, 'Resist', 'Res'),
(1, 'Initiative', 'Init'),
(1, 'Command', 'Co');


DROP TABLE
    IF EXISTS keyword;

CREATE TABLE
    keyword(
        keyword_id SMALLSERIAL PRIMARY KEY NOT NULL,
        gs_us_id SMALLINT NOT NULL REFERENCEs gs_unit_structure(gs_us_id),
        keyword_name VARCHAR(25) NOT NULL
    );

INSERT INTO keyword(gs_us_id, keyword_name) VALUES
(1, 'Tough'),
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
(1, 'Stuck In'),
(1, '3x HtH'),
(1, 'Woodsmen'),
(1, 'Hero'),
(1, 'Fast 10'),
(1, '2x HtH SV2'),
(1, 'Regrowth of the Woodsmen'),
(1, 'Frenzied Charge'),
(1, 'Drop 1 SV 1'),
(1, '4xHtH'),
(1, 'SV2'),
(1, 'MoD2');

DROP TABLE
    IF EXISTS army;

CREATE TABLE
    army(
        army_id SMALLSERIAL PRIMARY KEY NOT NULL,
        game_system_id SMALLINT NOT NULL REFERENCEs game_system(game_system_id),
        army_name VARCHAR(25) NOT NULL,
        army_edition VARCHAR(25) NOT NULL,
        army_version SMALLINT NOT NULL
    );

INSERT INTO army(game_system_id, army_name, army_edition, army_version) VALUES
(1, 'The Tribal Nations', '1st edition', 1),
(1, 'The Aztecs', '1st edition', 1),
(1, 'The Incas', '1st edition', 1),
(1, 'The Maya', '1st edition', 1);

DROP TABLE
    IF EXISTS rule;

CREATE TABLE
    rule(
        rule_id SMALLSERIAL PRIMARY KEY NOT NULL,
        game_system_id SMALLINT REFERENCEs game_system(game_system_id),
        army_id SMALLINT REFERENCES army(army_id),
        rule_name VARCHAR(25) NOT NULL,
        rule_description VARCHAR(250) NOT NULL
    );

INSERT INTO rule(game_system_id, rule_name, rule_description) VALUES
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
(1, 'Stuck In', 'Ecetera Ecetera'),
(1, '3x HtH', 'Ecetera Ecetera'),
(1, 'Woodsmen', 'Ecetera Ecetera'),
(1, 'Hero', 'Ecetera Ecetera'),
(1, 'Fast 10', 'Ecetera Ecetera'),
(1, '2x HtH SV2', 'Ecetera Ecetera'),
(1, 'Regrowth of the Woodsmen', 'Ecetera Ecetera'),
(1, 'Frenzied Charge', 'Ecetera Ecetera'),
(1, 'Drop 1 SV 1', 'Ecetera Ecetera'),
(1, '4xHtH', 'Ecetera Ecetera'),
(1, 'SV2', 'Ecetera Ecetera'),
(1, 'MoD2', 'Ecetera Ecetera');


DROP TABLE
    IF EXISTS keyword_rule;

CREATE TABLE
    keyword_rule(
        rule_id SMALLINT NOT NULL REFERENCEs rule(rule_id),
        keyword_id SMALLINT NOT NULL REFERENCEs keyword(keyword_id),
        PRIMARY KEY (rule_id, keyword_id)
    );

INSERT INTO keyword_rule(rule_id, keyword_id) VALUES
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
(20, 20),
(21, 21),
(22, 22),
(23, 23),
(24, 24),
(25, 25),
(26, 26),
(27, 27),
(28, 28),
(29, 29),
(30, 30),
(31, 31),
(32, 32);

DROP TABLE
    IF EXISTS gs_game_mode;

CREATE TABLE
    gs_game_mode(
        gs_gM_id SMALLSERIAL PRIMARY KEY NOT NULL,
        game_system_id SMALLINT NOT NULL REFERENCEs game_system(game_system_id),
        gs_gM_name VARCHAR(25) NOT NULL,
        gs_gM_point_upper SMALLINT,
        gs_gM_point_lower SMALLINT
    );

INSERT INTO gs_game_mode(game_system_id, gs_gM_name) VALUES
(1, 'Open');

DROP TABLE
    IF EXISTS a_unit;

CREATE TABLE
    a_unit(
        a_unit_id SMALLSERIAL PRIMARY KEY NOT NULL,
        army_id SMALLINT NOT NULL REFERENCEs army(army_id),
        gs_supertype_id SMALLINT NOT NULL REFERENCEs gs_supertype(gs_supertype_id),
        a_unit_name VARCHAR(250) NOT NULL,
        a_unit_PC SMALLINT NOT NULL,
        a_unit_limit_per_army SMALLINT
    );

INSERT INTO a_unit(army_id, gs_supertype_id, a_unit_name, a_unit_PC, a_unit_limit_per_army) VALUES
(1, 1, 'Sachem Warlord', 92, 1),
(1, 1, 'Sachem Warlord Mounted on War Eagle', 131, 1),
(1, 2, 'Medicine Man', 63, 1),
(1, 2, 'Mohawk warriors', 62, NULL),
(1, 2, 'Seneca Archers', 77, NULL),
(1, 5, 'Sasquatch', 147,  NULL),
(1, 3, 'Eagles', 78, NULL),
(1, 7, 'Wendigo', 151, 1),
(1, 3, 'Wolves', 80, NULL);

DROP TABLE
    IF EXISTS a_upgrade_type;

CREATE TABLE
    a_upgrade_type(
        a_ut_id SMALLSERIAL PRIMARY KEY NOT NULL,
        a_ut_name VARCHAR(25) NOT NULL,
        a_ut_min SMALLINT,
        a_ut_max SMALLINT,
        a_ut_limit_per_army SMALLINT
    );

INSERT INTO a_upgrade_type(a_ut_name, a_ut_min, a_ut_max) VALUES
('Upgrade', NULL, NULL),
('Monstrosity Type', 1, 1);

DROP TABLE
    IF EXISTS a_upgrade;

CREATE TABLE
    a_upgrade(
        a_upgrade_id SMALLSERIAL PRIMARY KEY NOT NULL,
        a_ut_id SMALLINT NOT NULL REFERENCES a_upgrade_type(a_ut_id),
        a_upgrade_PC SMALLINT NOT NULL,
        a_upgrade_name VARCHAR(25) NOT NULL
    );

INSERT INTO a_upgrade(a_ut_id, a_upgrade_PC, a_upgrade_name) VALUES
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

DROP TABLE
    IF EXISTS a_unit_a_upgrade;

CREATE TABLE
    a_unit_a_upgrade(
        a_unit_id SMALLINT NOT NULL REFERENCEs a_unit(a_unit_id),
        a_upgrade_id SMALLINT NOT NULL REFERENCEs a_upgrade(a_upgrade_id),
        PRIMARY KEY (a_unit_id, a_upgrade_id)
    );

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


DROP TABLE
    IF EXISTS a_statline;

CREATE TABLE
    a_statline(
        a_statline_id SMALLSERIAL PRIMARY KEY NOT NULL,
        a_statline_name VARCHAR(250) NOT NULL
    );

INSERT INTO a_statline(a_statline_name) VALUES
('Sachem with Tomahawks'),
('Mohawk Warrior'),
('Sachem with spear'),
('War Eagle'),
('Medicine Man'),
('Mohawk Warriors Leader'),
('Seneca Warrior Leader'),
('Seneca Warrior '),
('Sasquatch'),
('Eagles'),
('Wendigo'),
('Wolves');

DROP TABLE
    IF EXISTS a_unit_a_statline;

CREATE TABLE
    a_unit_a_statline(
        a_unit_id SMALLINT NOT NULL REFERENCEs a_unit(a_unit_id),
        a_statline_id SMALLINT REFERENCEs a_statline(a_statline_id),
        a_statline_min SMALLINT NOT NULL,
        a_statline_max SMALLINT NOT NULL,
        a_statline_point_cost SMALLINT,
        PRIMARY KEY (a_unit_id, a_statline_id)
    );

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
(6, 9, 3, 5, 47),
(7, 10, 3, 5, 26),
(8, 11, 1, 1, NULL),
(9, 12, 5, 5, NULL);

DROP TABLE
    IF EXISTS a_unit_a_upgrade_type;

CREATE TABLE
    a_unit_a_upgrade_type(
        a_unit_id SMALLINT NOT NULL REFERENCEs a_unit(a_unit_id),
        a_ut_id SMALLINT NOT NULL REFERENCEs a_upgrade_type(a_ut_id),
        PRIMARY KEY (a_unit_id, a_ut_id)
    );

INSERT INTO a_unit_a_upgrade_type(a_unit_id, a_ut_id) VALUES
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

DROP TABLE
    IF EXISTS keyword_a_unit;

CREATE TABLE
    keyword_a_unit(
        keyword_id SMALLINT NOT NULL REFERENCEs keyword(keyword_id),
        a_unit_id SMALLINT NOT NULL REFERENCEs a_unit(a_unit_id),
        PRIMARY KEY (keyword_id, a_unit_id)
    );

INSERT INTO keyword_a_unit(keyword_id, a_unit_id) VALUES
(1, 1),
(2, 1),
(22, 1),
(3, 1),
(23, 1),
(1, 2),
(2, 2),
(22, 2),
(24, 2),
(3, 2),
(16, 2),
(25, 2),
(13, 2),
(1, 3),
(3, 3),
(23, 3),
(26, 3),
(5, 3),
(1, 4),
(23, 4),
(1, 5),
(23, 5),
(27, 6),
(22, 6),
(4, 6),
(30, 6),
(23, 6),
(11, 7),
(16, 7),
(12, 7),
(26, 7),
(23, 7),
(28, 8),
(30, 8),
(31, 8),
(32, 8),
(1, 8),
(14, 8),
(23, 8),
(11, 9),
(12, 9),
(23, 9);

DROP TABLE
    IF EXISTS rule_a_upgrade;

CREATE TABLE
    rule_a_upgrade(
        rule_id SMALLINT NOT NULL REFERENCEs rule(rule_id),
        a_upgrade_id SMALLINT NOT NULL REFERENCEs a_upgrade(a_upgrade_id),
        PRIMARY KEY (rule_id, a_upgrade_id)
    );

INSERT INTO rule_a_upgrade(rule_id, a_upgrade_id) VALUES
(1, 3),
(2, 1),
(3, 3),
(4, 3),
(5, 6),
(6, 7);


DROP TABLE
    IF EXISTS rule_a_unit;

CREATE TABLE
    rule_a_unit(
        rule_id SMALLINT NOT NULL REFERENCEs rule(rule_id),
        a_unit_id SMALLINT NOT NULL REFERENCEs a_unit(a_unit_id),
        PRIMARY KEY (rule_id, a_unit_id)
    );

INSERT INTO rule_a_unit(rule_id, a_unit_id) VALUES
(1, 1),
(2, 1),
(22, 1),
(3, 1),
(23, 1),
(1, 2),
(2, 2),
(22, 2),
(24, 2),
(3, 2),
(16, 2),
(25, 2),
(13, 2),
(1, 3),
(3, 3),
(23, 3),
(26, 3),
(5, 3),
(1, 4),
(23, 4),
(1, 5),
(23, 5),
(27, 6),
(22, 6),
(4, 6),
(30, 6),
(23, 6),
(11, 7),
(16, 7),
(12, 7),
(26, 7),
(23, 7),
(28, 8),
(30, 8),
(31, 8),
(32, 8),
(1, 8),
(14, 8),
(23, 8),
(11, 9),
(12, 9),
(23, 9);


DROP TABLE
    IF EXISTS a_statline_gs_stat;

CREATE TABLE
    a_statline_gs_stat(
        a_statline_id SMALLINT NOT NULL REFERENCEs a_statline(a_statline_id),
        gs_stat_id SMALLINT NOT NULL REFERENCEs gs_stat(gs_stat_id),
        stat_value SMALLINT,
        PRIMARY KEY (a_statline_id, gs_stat_id)
    );

INSERT INTO a_statline_gs_stat(a_statline_id, gs_stat_id, stat_value) VALUES
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

DROP TABLE
    IF EXISTS keyword_a_upgrade;

CREATE TABLE
    keyword_a_upgrade(
        keyword_id SMALLINT NOT NULL REFERENCEs keyword(keyword_id),
        a_upgrade_id SMALLINT NOT NULL REFERENCEs a_upgrade(a_upgrade_id),
        PRIMARY KEY (keyword_id, a_upgrade_id)
    );

INSERT INTO keyword_a_upgrade(keyword_id, a_upgrade_id) VALUES
(1, 3),
(2, 1),
(3, 3),
(4, 3),
(5, 6),
(6, 7);

DROP TABLE
    IF EXISTS army_list;

CREATE TABLE
    army_list(
        army_list_id SMALLSERIAL PRIMARY KEY NOT NULL,
        game_system_id SMALLINT NOT NULL REFERENCEs game_system(game_system_id),
        gs_gM_id SMALLINT NOT NULL REFERENCEs gs_game_mode(gs_gM_id),
        army_list_name VARCHAR(25) NOT NULL
    );



DROP TABLE
    IF EXISTS al_force;

CREATE TABLE
    al_force(
        al_force_id SMALLSERIAL PRIMARY KEY NOT NULL,
        army_list_id SMALLINT NOT NULL REFERENCEs army_list(army_list_id),
        army_id SMALLINT NOT NULL REFERENCEs army(army_id)
    );



DROP TABLE
    IF EXISTS al_unit;

CREATE TABLE
    al_unit(
        al_unit_id SMALLSERIAL PRIMARY KEY NOT NULL,
        al_force_id SMALLINT NOT NULL REFERENCEs al_force(al_force_id),
        a_unit_id SMALLINT NOT NULL REFERENCEs a_unit(a_unit_id),
        al_unit_name VARCHAR(25),
        al_unit_color VARCHAR(25)
    );



DROP TABLE
    IF EXISTS al_upgrade;

CREATE TABLE
    al_upgrade(
        al_chose_upgrade SMALLSERIAL PRIMARY KEY NOT NULL,
        al_unit_id SMALLINT NOT NULL REFERENCEs al_unit(al_unit_id), 
        a_upgrade_id SMALLINT NOT NULL REFERENCEs a_upgrade(a_upgrade_id),
        a_ut_id SMALLINT NOT NULL REFERENCEs  a_upgrade_type(a_ut_id)
    );
