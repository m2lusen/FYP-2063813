- ----------------------------
-- Table structure for Game_system
-- ----------------------------
DROP TABLE
    IF EXISTS Game_system;

CREATE TABLE
    Game_system(
        Game_system_id SMALLSERIAL PRIMARY KEY NOT NULL,
        Game_system_name VARCHAR(25) NOT NULL UNIQUE,
        Game_system_edition VARCHAR(25) NOT NULL,
        Game_system_version SMALLINT NOT NULL
    );

-- ----------------------------
-- Table structure for GS_supertype
-- ----------------------------
DROP TABLE
    IF EXISTS GS_supertype;

CREATE TABLE
    GS_supertype(
        GS_supertype_id SMALLSERIAL PRIMARY KEY NOT NULL,
        Game_system_id SMALLINT NOT NULL REFERENCES Game_system(Game_system_id),
        GS_supertype_name VARCHAR(25) NOT NULL,
        GS_supertype_upper SMALLINT,
        GS_supertype_lower SMALLINT
    );

-- ----------------------------
-- Table structure for GS_unit_structure
-- ----------------------------
DROP TABLE
    IF EXISTS GS_unit_structure;

CREATE TABLE
    GS_unit_structure(
        GS_US_id SMALLSERIAL PRIMARY KEY NOT NULL,
        Game_system_id SMALLINT NOT NULL REFERENCES Game_system(Game_system_id)
    );

-- ----------------------------
-- Table structure for GS_stat
-- ----------------------------
DROP TABLE
    IF EXISTS GS_stat

CREATE TABLE
    GS_stat(
        GS_stat SMALLSERIAL PRIMARY KEY NOT NULL,
        GS_US_id SMALLINT NOT NULL REFERENCES GS_unit_structure(GS_US_id),
        GS_stat_name VARCHAR(25) NOT NULL,
        GS_stat_acronyme VARCHAR(3) NOT NULL,
        GS_stat_upper SMALLINT,
        GS_stat_low SMALLINT,
    );

-- ----------------------------
-- Table structure for GS_keyword
-- ----------------------------
DROP TABLE
    IF EXISTS GS_keyword;

CREATE TABLE
    GS_keyword(
        GS_keyword_id SMALLSERIAL PRIMARY KEY NOT NULL,
        GS_US_id SMALLINT NOT NULL REFERENCES GS_unit_structure(GS_US_id),
        GS_keyword_name VARCHAR(25) NOT NULL
    );

-- ----------------------------
-- Table structure for GS_rule
-- ----------------------------
DROP TABLE
    IF EXISTS GS_rule;

CREATE TABLE
    GS_rule(
        GS_rule_id SMALLSERIAL PRIMARY KEY NOT NULL,
        Game_system_id SMALLINT NOT NULL REFERENCES Game_system(Game_system_id),
        GS_rule_name VARCHAR(25) NOT NULL,
        GS_rule_description VARCHAR(250) NOT NULL
    );

-- ----------------------------
-- Table structure for GS_keyword_GS_rule
-- ----------------------------
DROP TABLE
    IF EXISTS GS_keyword_GS_rule;

CREATE TABLE
    GS_keyword_GS_rule(
        GS_rule_id SMALLINT NOT NULL REFERENCES GS_rule(GS_rule_id),
        GS_keyword_id SMALLINT NOT NULL REFERENCES GS_keyword(GS_keyword_id),
        PRIMARY KEY (GS_rule_id, GS_keyword_id)
    );

-- ----------------------------
-- Table structure for GS_game_mode
-- ----------------------------
DROP TABLE
    IF EXISTS GS_game_mode;

CREATE TABLE
    GS_game_mode(
        GS_GM_id SMALLSERIAL PRIMARY KEY NOT NULL,
        Game_system_id Game_system_id SMALLINT NOT NULL REFERENCES Game_system(Game_system_id),
        GS_GM_name VARCHAR(25) NOT NULL,
        GS_GM_point_upper SMALLINT,
        GS_GM_point_lower SMALLINT
    );

-- ----------------------------
-- Table structure for Army
-- ----------------------------
DROP TABLE
    IF EXISTS Army;

CREATE TABLE
    Army(
        Army_id SMALLSERIAL PRIMARY KEY NOT NULL,
        Game_system_id SMALLINT NOT NULL REFERENCES Game_system(Game_system_id),
        Army_name VARCHAR(25) NOT NULL,
        Army_edition VARCHAR(25) NOT NULL,
        Army_version SMALLINT NOT NULL
    );

-- ----------------------------
-- Table structure for A_unit
-- ----------------------------
DROP TABLE
    IF EXISTS A_unit;

CREATE TABLE
    A_unit(
        A_unit_id SMALLSERIAL PRIMARY KEY NOT NULL,
        Army_id SMALLINT NOT NULL REFERENCES Army(Army_id),
        GS_supertype_id SMALLINT NOT NULL REFERENCES GS_supertype(GS_supertype_id),
        A_unit_name VARCHAR(25) NOT NULL,
        A_unit_PC SMALLINT NOT NULL,
        A_unit_min SMALLINT,
        A_unit_max SMALLINT,
        A_unit_limit_per_army SMALLINT
    );

-- ----------------------------
-- Table structure for A_upgrade
-- ----------------------------
DROP TABLE
    IF EXISTS A_upgrade;

CREATE TABLE
    A_upgrade(
        A_upgrade_id SMALLSERIAL PRIMARY KEY NOT NULL,
        A_upgrade_PC SMALLINT NOT NULL,
        A_upgrade_name VARCHAR(25) NOT NULL,
    );

-- ----------------------------
-- Table structure for A_statline
-- ----------------------------
DROP TABLE
    IF EXISTS A_statline;

CREATE TABLE
    A_statline(
        A_statline_id SMALLSERIAL PRIMARY KEY NOT NULL,
        A_unit_id SMALLINT NOT NULL REFERENCES A_unit(A_unit_id),
        A_upgrade_id SMALLINT A_upgrade(A_upgrade_id),
        A_statline_name VARCHAR(25) NOT NULL
    );

-- ----------------------------
-- Table structure for A_upgrade_type
-- ----------------------------
DROP TABLE
    IF EXISTS A_upgrade_type;

CREATE TABLE
    A_upgrade_type(
        A_UT_id SMALLSERIAL PRIMARY KEY NOT NULL,
        A_upgrade_id SMALLINT NOT NULL REFERENCES A_upgrade(A_upgrade_id),
        A_UT_name VARCHAR(25) NOT NULL,
        A_UT_min SMALLINT,
        A_UT_max SMALLINT,
        A_UT_limit_per_army SMALLINT
    );

-- ----------------------------
-- Table structure for A_unit_A_upgrade_type
-- ----------------------------
DROP TABLE
    IF EXISTS A_unit_A_upgrade_type;

CREATE TABLE
    A_unit_A_upgrade_type(
        A_unit_id SMALLINT NOT NULL REFERENCES A_unit(A_unit_id),
        A_UT_id SMALLINT NOT NULL REFERENCES A_upgrade_type(A_UT_id),
        PRIMARY KEY (A_unit_id, A_UT_id)
    );

-- ----------------------------
-- Table structure for A_keyword
-- ----------------------------
DROP TABLE
    IF EXISTS A_keyword;

CREATE TABLE
    A_keyword(
        A_keyword_id SMALLSERIAL PRIMARY KEY NOT NULL,
        A_keyword_name VARCHAR(25) NOT NULL
    );

-- ----------------------------
-- Table structure for A_keyword_A_upgrade
-- ----------------------------
DROP TABLE
    IF EXISTS A_keyword_A_upgrade;

CREATE TABLE
    A_keyword_A_upgrade(
        A_keyword_id SMALLINT NOT NULL REFERENCES A_keyword(A_keyword_id),
        A_upgrade_id SMALLINT NOT NULL REFERENCES A_upgrade(A_upgrade_id),
        PRIMARY KEY (A_keyword_id, A_upgrade_id)
    );

-- ----------------------------
-- Table structure for A_keyword_A_unit
-- ----------------------------
DROP TABLE
    IF EXISTS A_keyword_A_unit;

CREATE TABLE
    A_keyword_A_unit(
        A_keyword_id SMALLINT NOT NULL REFERENCES A_keyword(A_keyword_id),
        A_unit_id SMALLINT NOT NULL REFERENCES A_unit(A_unit_id),
        PRIMARY KEY (A_keyword_id, A_unit_id)
    );

-- ----------------------------
-- Table structure for A_special_rule
-- ----------------------------
DROP TABLE
    IF EXISTS A_special_rule;

CREATE TABLE
    A_special_rule(
        A_SR_id SMALLSERIAL PRIMARY KEY NOT NULL,
        Army_id SMALLINT NOT NULL REFERENCES Army(Army_id),
        A_SR_name VARCHAR(25) NOT NULL,
        A_SR_description VARCHAR(250) NOT NULL
    );

-- ----------------------------
-- Table structure for A_keyword_A_special_rule
-- ----------------------------
DROP TABLE
    IF EXISTS A_keyword_A_special_rule;

CREATE TABLE
    A_keyword_A_special_rule(
        A_keyword_id SMALLINT NOT NULL REFERENCES A_keyword(A_keyword_id),
        A_SR_id SMALLINT NOT NULL REFERENCES A_special_rule(A_SR_id),
        PRIMARY KEY (A_keyword_id, A_SR_id)
    );

-- ----------------------------
-- Table structure for A_statline_gs_stat
-- ----------------------------
DROP TABLE
    IF EXISTS A_statline_gs_stat;

CREATE TABLE
    A_statline_gs_stat(
        A_statline_id SMALLINT NOT NULL REFERENCES A_statline(A_statline_id),
        GS_stat_id SMALLINT NOT NULL REFERENCES GS_stat(GS_stat_id),
        stat_value SMALLINT NOT NULL,
        PRIMARY KEY (A_statline_id, GS_stat_id)
    );

-- ----------------------------
-- Table structure for GS_keyword_A_upgrade
-- ----------------------------
DROP TABLE
    IF EXISTS GS_keyword_A_upgrade;

CREATE TABLE
    GS_keyword_A_upgrade(
        GS_keyword_id SMALLINT NOT NULL REFERENCES GS_keyword(GS_keyword_id),
        A_upgrade_id SMALLINT NOT NULL REFERENCES A_upgrade(A_upgrade_id),
        PRIMARY KEY (GS_keyword_id, A_upgrade_id)
    );

-- ----------------------------
-- Table structure for Army_list
-- ----------------------------
DROP TABLE
    IF EXISTS Army_list;

CREATE TABLE
    Army_list(
        Army_list_id SMALLSERIAL PRIMARY KEY NOT NULL,
        Game_system_id SMALLINT NOT NULL REFERENCES Game_system(Game_system_id),
        GS_GM_id SMALLINT NOT NULL REFERENCES GS_game_mode(GS_GM_id),
        Army_list_name VARCHAR(25) NOT NULL
    );

-- ----------------------------
-- Table structure for AL_force
-- ----------------------------
DROP TABLE
    IF EXISTS AL_force;

CREATE TABLE
    AL_force(
        AL_force SMALLSERIAL PRIMARY KEY NOT NULL,
        Army_list_id SMALLINT NOT NULL REFERENCES Army_list(Army_list_id),
        Army_id SMALLINT NOT NULL REFERENCES Army(Army_id)
    );

-- ----------------------------
-- Table structure for AL_unit
-- ----------------------------
DROP TABLE
    IF EXISTS AL_unit;

CREATE TABLE
    AL_unit(
        AL_unit_id SMALLSERIAL PRIMARY KEY NOT NULL,
        AL_force_id SMALLINT NOT NULL REFERENCES AL_force(AL_force_id),
        A_unit_id SMALLINT NOT NULL REFERENCES A_unit(A_unit_id),
        AL_unit_name VARCHAR(25),
        AL_unit_color VARCHAR(25)
    );

-- ----------------------------
-- Table structure for AL_upgrade
-- ----------------------------
DROP TABLE
    IF EXISTS AL_upgrade;

CREATE TABLE
    AL_upgrade(
        AL_chose_upgrade SMALLSERIAL PRIMARY KEY NOT NULL,
        AL_unit_id SMALLINT NOT NULL REFERENCES AL_unit(AL_unit_id), 
        A_upgrade_id SMALLINT NOT NULL REFERENCES A_upgrade(A_upgrade_id),
        A_UT_id SMALLINT NOT NULL REFERENCES  A_upgrade_type(A_UT_id)
    );
