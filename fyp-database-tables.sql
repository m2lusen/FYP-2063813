DROP TABLE
    IF EXISTS game_system;

CREATE TABLE
    game_system(
        game_system_id SMALLSERIAL PRIMARY KEY NOT NULL,
        game_system_name VARCHAR(25) NOT NULL UNIQUE,
        game_system_edition VARCHAR(25) NOT NULL,
        game_system_version SMALLINT NOT NULL
    );



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



DROP TABLE
    IF EXISTS gs_unit_structure;

CREATE TABLE
    gs_unit_structure(
        gs_us_id SMALLSERIAL PRIMARY KEY NOT NULL,
        game_system_id SMALLINT NOT NULL REFERENCEs game_system(game_system_id)
    );



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



DROP TABLE
    IF EXISTS gs_keyword;

CREATE TABLE
    gs_keyword(
        gs_keyword_id SMALLSERIAL PRIMARY KEY NOT NULL,
        gs_us_id SMALLINT NOT NULL REFERENCEs gs_unit_structure(gs_us_id),
        gs_keyword_name VARCHAR(25) NOT NULL
    );



DROP TABLE
    IF EXISTS gs_rule;

CREATE TABLE
    gs_rule(
        gs_rule_id SMALLSERIAL PRIMARY KEY NOT NULL,
        game_system_id SMALLINT NOT NULL REFERENCEs game_system(game_system_id),
        gs_rule_name VARCHAR(25) NOT NULL,
        gs_rule_description VARCHAR(250) NOT NULL
    );



DROP TABLE
    IF EXISTS gs_keyword_gs_rule;

CREATE TABLE
    gs_keyword_gs_rule(
        gs_rule_id SMALLINT NOT NULL REFERENCEs gs_rule(gs_rule_id),
        gs_keyword_id SMALLINT NOT NULL REFERENCEs gs_keyword(gs_keyword_id),
        PRIMARY KEY (gs_rule_id, gs_keyword_id)
    );



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



DROP TABLE
    IF EXISTS a_unit;

CREATE TABLE
    a_unit(
        a_unit_id SMALLSERIAL PRIMARY KEY NOT NULL,
        army_id SMALLINT NOT NULL REFERENCEs army(army_id),
        gs_supertype_id SMALLINT NOT NULL REFERENCEs gs_supertype(gs_supertype_id),
        a_unit_name VARCHAR(25) NOT NULL,
        a_unit_PC SMALLINT NOT NULL,
        a_unit_limit_per_army SMALLINT
    );



DROP TABLE
    IF EXISTS a_upgrade_type;

CREATE TABLE
    a_upgrade_type(
        a_UT_id SMALLSERIAL PRIMARY KEY NOT NULL,
        a_UT_name VARCHAR(25) NOT NULL,
        a_UT_min SMALLINT,
        a_UT_max SMALLINT,
        a_UT_limit_per_army SMALLINT
    );



DROP TABLE
    IF EXISTS a_upgrade;

CREATE TABLE
    a_upgrade(
        a_upgrade_id SMALLSERIAL PRIMARY KEY NOT NULL,
        a_UT_id SMALLINT NOT NULL REFERENCES a_upgrade_type(a_UT_id),
        a_upgrade_PC SMALLINT NOT NULL,
        a_upgrade_name VARCHAR(25) NOT NULL
    );



DROP TABLE
    IF EXISTS a_statline;

CREATE TABLE
    a_statline(
        a_statline_id SMALLSERIAL PRIMARY KEY NOT NULL,
        a_statline_name VARCHAR(25) NOT NULL
    );

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



DROP TABLE
    IF EXISTS a_unit_a_upgrade_type;

CREATE TABLE
    a_unit_a_upgrade_type(
        a_unit_id SMALLINT NOT NULL REFERENCEs a_unit(a_unit_id),
        a_UT_id SMALLINT NOT NULL REFERENCEs a_upgrade_type(a_UT_id),
        PRIMARY KEY (a_unit_id, a_UT_id)
    );



DROP TABLE
    IF EXISTS a_keyword;

CREATE TABLE
    a_keyword(
        a_keyword_id SMALLSERIAL PRIMARY KEY NOT NULL,
        a_keyword_name VARCHAR(25) NOT NULL
    );



DROP TABLE
    IF EXISTS a_keyword_a_upgrade;

CREATE TABLE
    a_keyword_a_upgrade(
        a_keyword_id SMALLINT NOT NULL REFERENCEs a_keyword(a_keyword_id),
        a_upgrade_id SMALLINT NOT NULL REFERENCEs a_upgrade(a_upgrade_id),
        PRIMARY KEY (a_keyword_id, a_upgrade_id)
    );



DROP TABLE
    IF EXISTS a_keyword_a_unit;

CREATE TABLE
    a_keyword_a_unit(
        a_keyword_id SMALLINT NOT NULL REFERENCEs a_keyword(a_keyword_id),
        a_unit_id SMALLINT NOT NULL REFERENCEs a_unit(a_unit_id),
        PRIMARY KEY (a_keyword_id, a_unit_id)
    );



DROP TABLE
    IF EXISTS a_special_rule;

CREATE TABLE
    a_special_rule(
        a_sr_id SMALLSERIAL PRIMARY KEY NOT NULL,
        army_id SMALLINT NOT NULL REFERENCEs army(army_id),
        a_sr_name VARCHAR(25) NOT NULL,
        a_sr_description VARCHAR(250) NOT NULL
    );



DROP TABLE
    IF EXISTS a_keyword_a_special_rule;

CREATE TABLE
    a_keyword_a_special_rule(
        a_keyword_id SMALLINT NOT NULL REFERENCEs a_keyword(a_keyword_id),
        a_sr_id SMALLINT NOT NULL REFERENCEs a_special_rule(a_sr_id),
        PRIMARY KEY (a_keyword_id, a_sr_id)
    );



DROP TABLE
    IF EXISTS a_statline_gs_stat;

CREATE TABLE
    a_statline_gs_stat(
        a_statline_id SMALLINT NOT NULL REFERENCEs a_statline(a_statline_id),
        gs_stat_id SMALLINT NOT NULL REFERENCEs gs_stat(gs_stat_id),
        stat_value SMALLINT,
        PRIMARY KEY (a_statline_id, gs_stat_id)
    );



DROP TABLE
    IF EXISTS gs_keyword_a_upgrade;

CREATE TABLE
    gs_keyword_a_upgrade(
        gs_keyword_id SMALLINT NOT NULL REFERENCEs gs_keyword(gs_keyword_id),
        a_upgrade_id SMALLINT NOT NULL REFERENCEs a_upgrade(a_upgrade_id),
        PRIMARY KEY (gs_keyword_id, a_upgrade_id)
    );



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
        a_UT_id SMALLINT NOT NULL REFERENCEs  a_upgrade_type(a_UT_id)
    );
