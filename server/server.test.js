const request = require('supertest');
const server = require('./server.js'); // Import the server instance
// const { toHexString } = require('pdf-lib');

let insertedGameSystemId;
let insertedGsSupertypeID;
let insertedGsUnitStructureId;
let insertedGsStatId;
let insertedKeywordsId;
let insertedArmyId;
let insertedRuleId;
let insertedGsGameModeId;
let insertedAUnitId;
let insertedAUpgradeTypeId;
let insertedAUpgradeId;
let insertedAStatlineId;
let insertedArmyListId;
let insertedAlForceId;
let insertedAlUnitId;
let insertedAlUpgradeId;

// POST
describe('POST /game_system', () => {
    it('should insert a new game system', async () => {
        const gameSystem = {
            "game_system_name": ["Game System Name"],
            "game_system_edition": ["1st edition"],
            "game_system_version": [1]
        };

        const response = await request(server)
            .post('/game_system')
            .send(gameSystem);

        insertedGameSystemId = response.body[0].game_system_id;

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('game_system_name', 'Game System Name');
        expect(response.body[0]).toHaveProperty('game_system_edition', '1st edition');
        expect(response.body[0]).toHaveProperty('game_system_version', 1);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .post('/game_system')
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('POST /gs_supertype', () => {
    it('should insert a new gs_supertype', async () => {
        const gsSupertype = {
            "game_system_id": [insertedGameSystemId],
            "gs_supertype_name": ["gs_supertype_name"],
            "gs_supertype_lower": [2]
        };
        
        const response = await request(server)
            .post('/gs_supertype')
            .send(gsSupertype);

        insertedGsSupertypeID = response.body[0].gs_supertype_id;
        // console.log(insertedGsSupertypeID)

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('game_system_id', insertedGameSystemId);
        expect(response.body[0]).toHaveProperty('gs_supertype_name', 'gs_supertype_name');
        expect(response.body[0]).toHaveProperty('gs_supertype_lower', 2);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .post('/gs_supertype')
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('POST /gs_unit_structure', () => {
    it('should insert a new gs_unit_structure', async () => {
        const gsUnitStructure = {
            "game_system_id": [insertedGameSystemId],
        };
        
        const response = await request(server)
            .post('/gs_unit_structure')
            .send(gsUnitStructure);

        insertedGsUnitStructureId = response.body[0].gs_us_id;

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('game_system_id', insertedGameSystemId);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .post('/gs_unit_structure')
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('POST /gs_stat', () => {
    it('should insert a new gs_stat', async () => {
        const gsStat = {
            "gs_us_id": [insertedGsUnitStructureId],
            "gs_stat_name": ['Statistic'],
            "gs_stat_acronyme" : ['Stat']
        };
        
        const response = await request(server)
            .post('/gs_stat')
            .send(gsStat);

        insertedGsStatId = response.body[0].gs_stat_id;

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('gs_us_id', insertedGsUnitStructureId);
        expect(response.body[0]).toHaveProperty('gs_stat_name', 'Statistic');
        expect(response.body[0]).toHaveProperty('gs_stat_acronyme', 'Stat');
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .post('/gs_stat')
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('POST /keyword', () => {
    it('should insert a new keyword', async () => {
        const keyword = {
            "gs_us_id": [insertedGsUnitStructureId],
            "keyword_name": ['Keyword']
        };
        
        const response = await request(server)
            .post('/keyword')
            .send(keyword);

        insertedKeywordsId = response.body[0].keyword_id;

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('gs_us_id', insertedGsUnitStructureId);
        expect(response.body[0]).toHaveProperty('keyword_name', 'Keyword');
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .post('/keyword')
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('POST /army', () => {
    it('should insert a new army', async () => {
        const army = {
            "game_system_id": [insertedGameSystemId],
            "army_name": ['Army'],
            "army_edition": ['1st edition'],
            "army_version": [1]
        };
        
        const response = await request(server)
            .post('/army')
            .send(army);

        insertedArmyId = response.body[0].army_id;

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('game_system_id', insertedGameSystemId);
        expect(response.body[0]).toHaveProperty('army_name', 'Army');
        expect(response.body[0]).toHaveProperty('army_edition', '1st edition');
        expect(response.body[0]).toHaveProperty('army_version', 1);

    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .post('/army')
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('POST /rule', () => {
    it('should insert a new rule', async () => {
        const rule = {
            "game_system_id": [insertedGameSystemId],
            "rule_name": ['Rule'],
            "rule_description": ['An example of a rule']
        };
        
        const response = await request(server)
            .post('/rule')
            .send(rule);

        insertedRuleId = response.body[0].rule_id;

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('game_system_id', insertedGameSystemId);
        expect(response.body[0]).toHaveProperty('rule_name', 'Rule');
        expect(response.body[0]).toHaveProperty('rule_description', 'An example of a rule');

    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .post('/rule')
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('POST /keyword_rule', () => {
    it('should insert a new keyword_rule', async () => {
        const keyword_rule = {
            "rule_id": [insertedRuleId],
            "keyword_id": [insertedKeywordsId]
        };
        
        const response = await request(server)
            .post('/keyword_rule')
            .send(keyword_rule);

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('rule_id', insertedRuleId);
        expect(response.body[0]).toHaveProperty('keyword_id', insertedKeywordsId);

    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .post('/keyword_rule')
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('POST /gs_game_mode', () => {
    it('should insert a new gs_game_mode', async () => {
        const gs_game_mode = {
            "game_system_id": [insertedGameSystemId],
            "gs_gm_name": ['Game Mode'],
            "gs_gm_point_upper": [2],
            "gs_gm_point_lower": [1]
        };
        
        const response = await request(server)
            .post('/gs_game_mode')
            .send(gs_game_mode);

        insertedGsGameModeId = response.body[0].gs_gm_id;

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('game_system_id', insertedGameSystemId);
        expect(response.body[0]).toHaveProperty('gs_gm_name', 'Game Mode');

    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .post('/gs_game_mode')
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('POST /a_unit', () => {
    it('should insert a new a_unit', async () => {
        const a_unit = {
            "army_id": [insertedArmyId],
            "gs_supertype_id": [insertedGsSupertypeID],
            "a_unit_name": ["Unit Name"],
            "a_unit_PC": [100],
            "a_unit_limit_per_army": [null]
        };
        const response = await request(server)
            .post('/a_unit')
            .send(a_unit);

        insertedAUnitId = response.body[0].a_unit_id;

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty("army_id", insertedArmyId);
        expect(response.body[0]).toHaveProperty("gs_supertype_id", insertedGsSupertypeID);
        expect(response.body[0]).toHaveProperty("a_unit_name", "Unit Name");
        expect(response.body[0]).toHaveProperty("a_unit_pc", 100);
        expect(response.body[0]).toHaveProperty("a_unit_limit_per_army", null);

    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .post('/a_unit')
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('POST /a_upgrade_type', () => {
    it('should insert a new a_upgrade_type', async () => {
        const a_upgrade_type = {
            "a_ut_name": ["Upgrades"],
            "a_ut_min": [null],
            "a_ut_max": [null]
        };
        const response = await request(server)
            .post('/a_upgrade_type')
            .send(a_upgrade_type);

        insertedAUpgradeTypeId = response.body[0].a_ut_id;

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty("a_ut_name", "Upgrades");

    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .post('/a_upgrade_type')
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('POST /a_upgrade', () => {
    it('should insert a new a_upgrade', async () => {
        const a_upgrade = {
            "a_ut_id": [insertedAUpgradeTypeId],
            "a_upgrade_PC": [10],
            "a_upgrade_name": ["Upgrade"]
        };
        const response = await request(server)
            .post('/a_upgrade')
            .send(a_upgrade);

        insertedAUpgradeId = response.body[0].a_upgrade_id;

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty("a_ut_id", insertedAUpgradeTypeId);
        expect(response.body[0]).toHaveProperty("a_upgrade_pc", 10);
        expect(response.body[0]).toHaveProperty("a_upgrade_name", "Upgrade");

    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .post('/a_upgrade')
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('POST /a_unit_a_upgrade', () => {
    it('should insert a new a_unit_a_upgrade', async () => {
        const a_unit_a_upgrade = {
            "a_unit_id": [insertedAUnitId],
            "a_upgrade_id": [insertedAUpgradeId]
        };
        const response = await request(server)
            .post('/a_unit_a_upgrade')
            .send(a_unit_a_upgrade);

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty("a_unit_id", insertedAUnitId);
        expect(response.body[0]).toHaveProperty("a_upgrade_id", insertedAUpgradeId);

    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .post('/a_unit_a_upgrade')
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('POST /a_statline', () => {
    it('should insert a new a_statline', async () => {
        const a_statline = {
            "a_statline_name": ["Statline"]
        };

        const response = await request(server)
            .post('/a_statline')
            .send(a_statline);

        insertedAStatlineId = response.body[0].a_statline_id;

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('a_statline_name', 'Statline');
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .post('/a_statline')
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('POST /a_unit_a_statline', () => {
    it('should insert a new a_unit_a_statline', async () => {
        const a_unit_a_statline = {
            "a_unit_id": [insertedAUnitId],
            "a_statline_id": [insertedAStatlineId],
            "a_statline_min": [1],
            "a_statline_max": [10],
            "a_statline_point_cost": [100]
        };
        const response = await request(server)
            .post('/a_unit_a_statline')
            .send(a_unit_a_statline);

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty("a_unit_id", insertedAUnitId);
        expect(response.body[0]).toHaveProperty("a_statline_id", insertedAStatlineId);
        expect(response.body[0]).toHaveProperty("a_statline_min", 1);
        expect(response.body[0]).toHaveProperty("a_statline_max", 10);
        expect(response.body[0]).toHaveProperty("a_statline_point_cost", 100);

    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .post('/a_unit_a_statline')
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('POST /a_unit_a_upgrade_type', () => {
    it('should insert a new a_unit_a_upgrade_type', async () => {
        const a_unit_a_upgrade_type = {
            "a_unit_id": [insertedAUnitId],
            "a_ut_id": [insertedAUpgradeTypeId]
        };
        const response = await request(server)
            .post('/a_unit_a_upgrade_type')
            .send(a_unit_a_upgrade_type);

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty("a_unit_id", insertedAUnitId);
        expect(response.body[0]).toHaveProperty("a_ut_id", insertedAUpgradeTypeId);

    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .post('/a_unit_a_upgrade_type')
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('POST /keyword_a_unit', () => {
    it('should insert a new keyword_a_unit', async () => {
        const keyword_a_unit = {
            "keyword_id": [insertedKeywordsId],
            "a_unit_id": [insertedAUnitId]
        };
        const response = await request(server)
            .post('/keyword_a_unit')
            .send(keyword_a_unit);

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty("keyword_id", insertedKeywordsId);
        expect(response.body[0]).toHaveProperty("a_unit_id", insertedAUnitId);

    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .post('/keyword_a_unit')
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('POST /rule_a_upgrade', () => {
    it('should insert a new rule_a_upgrade', async () => {
        const rule_a_upgrade = {
            "rule_id": [insertedRuleId],
            "a_upgrade_id": [insertedAUpgradeId]
        };
        const response = await request(server)
            .post('/rule_a_upgrade')
            .send(rule_a_upgrade);

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty("rule_id", insertedRuleId);
        expect(response.body[0]).toHaveProperty("a_upgrade_id", insertedAUpgradeId);

    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .post('/rule_a_upgrade')
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('POST /rule_a_unit', () => {
    it('should insert a new rule_a_unit', async () => {
        const rule_a_unit = {
            "rule_id": [insertedRuleId],
            "a_unit_id": [insertedAUnitId]
        };
        const response = await request(server)
            .post('/rule_a_unit')
            .send(rule_a_unit);

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty("rule_id", insertedRuleId);
        expect(response.body[0]).toHaveProperty("a_unit_id", insertedAUnitId);

    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .post('/rule_a_unit')
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('POST /a_statline_gs_stat', () => {
    it('should insert a new a_statline_gs_stat', async () => {
        const a_statline_gs_stat = {
            "a_statline_id": [insertedAStatlineId],
            "gs_stat_id": [insertedGsStatId],
            "stat_value": [4]
        };
        const response = await request(server)
            .post('/a_statline_gs_stat')
            .send(a_statline_gs_stat);

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty("a_statline_id", insertedAStatlineId);
        expect(response.body[0]).toHaveProperty("gs_stat_id", insertedGsStatId);
        expect(response.body[0]).toHaveProperty("stat_value", 4);

    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .post('/a_statline_gs_stat')
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('POST /keyword_a_upgrade', () => {
    it('should insert a new keyword_a_upgrade', async () => {
        const keyword_a_upgrade = {
            "keyword_id": [insertedKeywordsId],
            "a_upgrade_id": [insertedAUpgradeId]
        };
        const response = await request(server)
            .post('/keyword_a_upgrade')
            .send(keyword_a_upgrade);

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty("keyword_id", insertedKeywordsId);
        expect(response.body[0]).toHaveProperty("a_upgrade_id", insertedAUpgradeId);

    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .post('/keyword_a_upgrade')
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('POST /army_list', () => {
    it('should insert a new game system', async () => {
        const army_list = {
            "game_system_id": [insertedGameSystemId],
            "gs_gm_id": [insertedGsGameModeId],
            "army_list_name": ["Army List"]
        };

        const response = await request(server)
            .post('/army_list')
            .send(army_list);

        insertedArmyListId = response.body[0].army_list_id;

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('game_system_id', insertedGameSystemId);
        expect(response.body[0]).toHaveProperty('gs_gm_id', insertedGsGameModeId);
        expect(response.body[0]).toHaveProperty('army_list_name', "Army List");
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .post('/army_list')
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('POST /al_force', () => {
    it('should insert a new al_force', async () => {
        const al_force = {
            "army_list_id": [insertedArmyListId],
            "army_id": [insertedArmyId]
        };

        const response = await request(server)
            .post('/al_force')
            .send(al_force);

        insertedAlForceId = response.body[0].al_force_id;

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('army_list_id', insertedArmyListId);
        expect(response.body[0]).toHaveProperty('army_id', insertedArmyId);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .post('/al_force')
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('POST /al_unit', () => {
    it('should insert a new al_unit', async () => {
        const al_unit = {
            "al_force_id": [insertedAlForceId],
            "a_unit_id": [insertedAUnitId],
            "al_unit_name": ["Tim"],
            "al_unit_color": [null]
        };

        const response = await request(server)
            .post('/al_unit')
            .send(al_unit);

        insertedAlUnitId = response.body[0].al_unit_id;

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('al_force_id', insertedAlForceId);
        expect(response.body[0]).toHaveProperty('a_unit_id', insertedAUnitId);
        expect(response.body[0]).toHaveProperty('al_unit_name', "Tim");
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .post('/al_unit')
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('POST /al_upgrade', () => {
    it('should insert a new al_upgrade', async () => {
        const al_upgrade = {
            "al_unit_id": [insertedAlUnitId],
            "a_upgrade_id": [insertedAUpgradeId],
            "a_ut_id": [insertedAUpgradeTypeId]
        };

        const response = await request(server)
            .post('/al_upgrade')
            .send(al_upgrade);

        insertedAlUpgradeId = response.body[0].al_upgrade_id;

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('al_unit_id', insertedAlUnitId);
        expect(response.body[0]).toHaveProperty('a_upgrade_id', insertedAUpgradeId);
        expect(response.body[0]).toHaveProperty('a_ut_id', insertedAUpgradeTypeId);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .post('/al_upgrade')
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('POST /al_unit_a_unit_a_statline_quantity', () => {
    it('should insert a new al_unit_a_unit_a_statline_quantity', async () => {
        const al_unit_a_unit_a_statline_quantity = {
            "al_unit_id": [insertedAlUnitId],
            "a_unit_id": [insertedAUnitId],
            "a_statline_id": [insertedAStatlineId],
            "quantity": [5]
        };

        const response = await request(server)
            .post('/al_unit_a_unit_a_statline_quantity')
            .send(al_unit_a_unit_a_statline_quantity);

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('al_unit_id', insertedAlUnitId);
        expect(response.body[0]).toHaveProperty('a_unit_id', insertedAUnitId);
        expect(response.body[0]).toHaveProperty('a_statline_id', insertedAStatlineId);
        expect(response.body[0]).toHaveProperty('quantity', 5);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .post('/al_unit_a_unit_a_statline_quantity')
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});


// GET

describe('GET /army_list/:id', () => {
    it('should GET all army_list', async () => {

        const response = await request(server)
            .get(`/army_list`)
        
        expect(response.status).toBe(200);
    });

    it('should GET a army_list', async () => {

        const response = await request(server)
            .get(`/army_list/${insertedArmyListId}`)
        
        expect(response.status).toBe(200);
    });

    it('should handle errors gracefully - overflow', async () => {

        const response = await request(server)
            .get(`/army_list/99999`)
        
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    });
});


describe('GET /army/:id', () => {
    it('should GET all army', async () => {

        const response = await request(server)
            .get(`/army`)
        
        expect(response.status).toBe(200);
    });

    it('should GET a army', async () => {

        const response = await request(server)
            .get(`/army/${insertedArmyId}`)
        
        expect(response.status).toBe(200);
    });

    it('should handle errors gracefully', async () => {

        const response = await request(server)
            .get(`/army/99999`)
        
        // console.log('TEST: ', response)

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    });
});

describe('GET /unit/:id', () => {
    it('should GET all unit', async () => {

        const response = await request(server)
            .get(`/unit`)
        
        expect(response.status).toBe(200);
    });

    it('should GET a unit', async () => {

        const response = await request(server)
            .get(`/unit/${insertedAUnitId}`)
        
        expect(response.status).toBe(200);
    });
});

describe('GET /upgrade/:id', () => {
    it('should GET all upgrade', async () => {

        const response = await request(server)
            .get(`/upgrade`)
        
        expect(response.status).toBe(200);
    });

    it('should GET a upgrade', async () => {

        const response = await request(server)
            .get(`/upgrade/${insertedAUpgradeId}`)
        
        expect(response.status).toBe(200);
    });

    it('should handle errors gracefully', async () => {

        const response = await request(server)
            .get(`/upgrade/99999`)
        
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    });
});

describe('GET /game_system/:id', () => {
    it('should GET all game_system', async () => {

        const response = await request(server)
            .get(`/game_system`)
        
        expect(response.status).toBe(200);
    });

    it('should GET a game_system', async () => {

        const response = await request(server)
            .get(`/game_system/${insertedGameSystemId}`)
        
        expect(response.status).toBe(200);
    });

    it('should handle errors gracefully', async () => {

        const response = await request(server)
            .get(`/game_system/99999`)
        
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    });
});







// PUT

describe('PUT /game_system/:id', () => {
    it('should update an existing game system', async () => {
        const updatedGameSystem = {
            game_system_name: 'Updated Game System Name',
            game_system_edition: 'Updated Edition',
            game_system_version: 2
        };
    
        const response = await request(server)
            .put(`/game_system/${insertedGameSystemId}`)
            .send(updatedGameSystem);
        
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('game_system_name', 'Updated Game System Name');
        expect(response.body[0]).toHaveProperty('game_system_edition', 'Updated Edition');
        expect(response.body[0]).toHaveProperty('game_system_version', 2);
    });

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .put(`/game_system/${insertedGameSystemId}`)
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid game system ID gracefully -- Overflow', async () => {
        const response = await request(server)
            .put('/game_system/99999')
            .send({
                "game_system_name": "Test Game System",
                "game_system_edition": "2nd edition",
                "game_system_version": 2
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid game system ID gracefully -- 404', async () => {
        const response = await request(server)
            .put('/game_system/999')
            .send({
                "game_system_name": "Test Game System",
                "game_system_edition": "2nd edition",
                "game_system_version": 2
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('PUT /gs_supertype/:id', () => {
    it('should update an existing gs_supertype', async () => {
        const updatedGsSupertype = {
            "gs_supertype_name": "Updated name",
            "gs_supertype_lower": 3
        };
    
        const response = await request(server)
            .put(`/gs_supertype/${insertedGsSupertypeID}`)
            .send(updatedGsSupertype);
        
        expect(response.status).toBe(200);
    });

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .put(`/gs_supertype/${insertedGsSupertypeID}`)
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid game system ID gracefully', async () => {
        const response = await request(server)
            .put('/gs_supertype/99999')
            .send({
                "gs_supertype_name": "Updated name",
                "gs_supertype_lower": 3
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid game system ID gracefully -- 404', async () => {
        const response = await request(server)
            .put('/gs_supertype/999')
            .send({
                "gs_supertype_name": "Updated name",
                "gs_supertype_lower": 3
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('PUT /gs_unit_structure/:id', () => {
    it('should update an existing gs_supertype', async () => {
        const updatedGsUnitStructure = {
            "game_system_id": insertedGameSystemId,
        };
        
    
        const response = await request(server)
            .put(`/gs_unit_structure/${insertedGsUnitStructureId}`)
            .send(updatedGsUnitStructure);
        
        expect(response.status).toBe(200);
    });

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .put(`/gs_unit_structure/${insertedGsUnitStructureId}`)
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid game system ID gracefully', async () => {
        const response = await request(server)
            .put('/gs_unit_structure/99999')
            .send({
                "game_system_id": insertedGameSystemId,
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid game system ID gracefully -- 404', async () => {
        const response = await request(server)
            .put('/gs_unit_structure/999')
            .send({
                "game_system_id": insertedGameSystemId,
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('PUT /gs_stat/:id', () => {
    it('should update an existing gs_stat', async () => {
        const updatedGsStat = {
            "gs_us_id": insertedGsUnitStructureId,
            "gs_stat_name": 'Updated Statistic',
            "gs_stat_acronyme" : 'UST'
        };
        
    
        const response = await request(server)
            .put(`/gs_stat/${insertedGsStatId}`)
            .send(updatedGsStat);
        
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('gs_us_id', insertedGsUnitStructureId);
        expect(response.body[0]).toHaveProperty('gs_stat_name', 'Updated Statistic');
        expect(response.body[0]).toHaveProperty('gs_stat_acronyme', 'UST');
    });

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .put(`/gs_stat/${insertedGsStatId}`)
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid game system ID gracefully', async () => {
        const response = await request(server)
            .put('/gs_stat/99999')
            .send({
                "gs_us_id": insertedGsUnitStructureId,
                "gs_stat_name": 'Updated Statistic',
                "gs_stat_acronyme" : 'UST'
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid game system ID gracefully -- 404', async () => {
        const response = await request(server)
            .put('/gs_stat/999')
            .send({
                "gs_us_id": insertedGsUnitStructureId,
                "gs_stat_name": 'Updated Statistic',
                "gs_stat_acronyme" : 'UST'
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('PUT /keyword/:id', () => {
    it('should update an existing keyword', async () => {
        const updatedkeyword = {
            "gs_us_id": insertedGsUnitStructureId,
            "keyword_name": 'Updated Keyword'
        };
        
    
        const response = await request(server)
            .put(`/keyword/${insertedKeywordsId}`)
            .send(updatedkeyword);
        
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('gs_us_id', insertedGsUnitStructureId);
        expect(response.body[0]).toHaveProperty('keyword_name', 'Updated Keyword');
    });

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .put(`/keyword/${insertedKeywordsId}`)
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid game system ID gracefully', async () => {
        const response = await request(server)
            .put('/keyword/99999')
            .send({
	        "gs_us_id": insertedGsUnitStructureId,
            	"keyword_name": 'Updated Keyword'
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid game system ID gracefully -- 404', async () => {
        const response = await request(server)
            .put('/keyword/999')
            .send({
	        "gs_us_id": insertedGsUnitStructureId,
            	"keyword_name": 'Updated Keyword'
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('PUT /army/:id', () => {
    it('should update an existing army', async () => {
        const army = {
            "game_system_id": insertedGameSystemId,
            "army_name": 'Updated Army',
            "army_edition": '2nd edition',
            "army_version": 2
        }
        
    
        const response = await request(server)
            .put(`/army/${insertedArmyId}`)
            .send(army);
        
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('game_system_id', insertedGameSystemId);
        expect(response.body[0]).toHaveProperty('army_name', 'Updated Army');
        expect(response.body[0]).toHaveProperty('army_edition', '2nd edition');
        expect(response.body[0]).toHaveProperty('army_version', 2);
    });

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .put(`/army/${insertedArmyId}`)
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid game system ID gracefully', async () => {
        const response = await request(server)
            .put('/army/99999')
            .send({
                "game_system_id": insertedGameSystemId,
                "army_name": 'Updated Army',
                "army_edition": '2nd edition',
                "army_version": 2
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid game system ID gracefully -- 404', async () => {
        const response = await request(server)
            .put('/army/999')
            .send({
                "game_system_id": insertedGameSystemId,
                "army_name": 'Updated Army',
                "army_edition": '2nd edition',
                "army_version": 2
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('PUT /rule/:id', () => {
    it('should update an existing rule', async () => {
        const rule = {
            "game_system_id": insertedGameSystemId,
            "rule_name": 'New Rule',
            "rule_description": 'An example of a updated rule'
        }
        
    
        const response = await request(server)
            .put(`/rule/${insertedRuleId}`)
            .send(rule);
        
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('game_system_id', insertedGameSystemId);
        expect(response.body[0]).toHaveProperty('rule_name', 'New Rule');
        expect(response.body[0]).toHaveProperty('rule_description', 'An example of a updated rule');
    });

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .put(`/rule/${insertedRuleId}`)
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid rule ID gracefully', async () => {
        const response = await request(server)
            .put('/rule/99999')
            .send({
                "game_system_id": insertedGameSystemId,
                "rule_name": 'New Rule',
                "rule_description": 'An example of a updated rule'
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid rule ID gracefully --404', async () => {
        const response = await request(server)
            .put('/rule/999')
            .send({
                "game_system_id": insertedGameSystemId,
                "rule_name": 'New Rule',
                "rule_description": 'An example of a updated rule'
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('PUT /keyword_rule/:keywordId/:ruleId', () => {
    it('should update an existing keyword_rule', async () => {
        const keyword_rule = {
            "rule_id": insertedRuleId,
            "keyword_id": insertedKeywordsId
        };
        
    
        const response = await request(server)
            .put(`/keyword_rule/${insertedKeywordsId}/${insertedRuleId}`)
            .send(keyword_rule);
        
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('rule_id', insertedRuleId);
        expect(response.body[0]).toHaveProperty('keyword_id', insertedKeywordsId);

    });

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .put(`/keyword_rule/${insertedKeywordsId}/${insertedRuleId}`)
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
    it('should handle invalid keyword ID gracefully', async () => {
        const response = await request(server)
            .put(`/keyword_rule/99999/${insertedRuleId}`)
            .send({
                "rule_id": insertedRuleId,
                "keyword_id": insertedKeywordsId
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid rule ID gracefully', async () => {
        const response = await request(server)
            .put(`/keyword_rule/${insertedKeywordsId}/99999`)
            .send({
                "rule_id": insertedRuleId,
                "keyword_id": insertedKeywordsId
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid keyword ID and rule ID gracefully', async () => {
        const response = await request(server)
            .put(`/keyword_rule/99999/99999`)
            .send({
                "rule_id": insertedRuleId,
                "keyword_id": insertedKeywordsId
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid keyword ID gracefully --404', async () => {
        const response = await request(server)
            .put(`/keyword_rule/999/${insertedRuleId}`)
            .send({
                "rule_id": insertedRuleId,
                "keyword_id": insertedKeywordsId
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid rule ID gracefully --404', async () => {
        const response = await request(server)
            .put(`/keyword_rule/${insertedKeywordsId}/999`)
            .send({
                "rule_id": insertedRuleId,
                "keyword_id": insertedKeywordsId
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid keyword ID and rule ID gracefully --404', async () => {
        const response = await request(server)
            .put(`/keyword_rule/999/999`)
            .send({
                "rule_id": insertedRuleId,
                "keyword_id": insertedKeywordsId
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});


describe('PUT /gs_game_mode/:id', () => {
    it('should update an existing gs_game_mode', async () => {
        const gs_game_mode = {
            "game_system_id": insertedGameSystemId,
            "gs_gm_name": "New Mode",
            "gs_gm_point_upper": 2,
            "gs_gm_point_lower": 1
        }
        
    
        const response = await request(server)
            .put(`/gs_game_mode/${insertedGsGameModeId}`)
            .send(gs_game_mode);
        
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('game_system_id', insertedGameSystemId);
        expect(response.body[0]).toHaveProperty('gs_gm_name', 'New Mode');
    });

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .put(`/gs_game_mode/${insertedGsGameModeId}`)
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid rule ID gracefully', async () => {
        const response = await request(server)
            .put('/gs_game_mode/99999')
            .send({
                "game_system_id": insertedGameSystemId,
                "gs_gm_name": 'New Mode',
                "gs_gm_point_upper": 2,
                "gs_gm_point_lower": 1
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid rule ID gracefully --404', async () => {
        const response = await request(server)
            .put('/gs_game_mode/999')
            .send({
                "game_system_id": insertedGameSystemId,
                "gs_gm_name": 'New Mode',
                "gs_gm_point_upper": 2,
                "gs_gm_point_lower": 1
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('PUT /a_unit/:id', () => {
    it('should update an existing gs_game_mode', async () => {
        const a_unit = {
            "army_id": insertedArmyId,
            "gs_supertype_id": insertedGsSupertypeID,
            "a_unit_name": "Unit Name",
            "a_unit_PC": 105,
            "a_unit_limit_per_army": null
        };
        
    
        const response = await request(server)
            .put(`/a_unit/${insertedAUnitId}`)
            .send(a_unit);
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty("army_id", insertedArmyId);
        expect(response.body[0]).toHaveProperty("gs_supertype_id", insertedGsSupertypeID);
        expect(response.body[0]).toHaveProperty("a_unit_name", "Unit Name");
        expect(response.body[0]).toHaveProperty("a_unit_pc", 105);
        // can not check null, 
    });

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .put(`/a_unit/${insertedAUnitId}`)
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid a_unit_ID gracefully', async () => {
        const response = await request(server)
            .put('/a_unit/99999')
            .send({
                "army_id": insertedArmyId,
                "gs_supertype_id": insertedGsSupertypeID,
                "a_unit_name": "Unit Name",
                "a_unit_PC": 100,
                "a_unit_limit_per_army": null
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid a_unit_ID gracefully --404', async () => {
        const response = await request(server)
            .put('/a_unit/999')
            .send({
                "army_id": insertedArmyId,
                "gs_supertype_id": insertedGsSupertypeID,
                "a_unit_name": "Unit Name",
                "a_unit_PC": 100,
                "a_unit_limit_per_army": null
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('PUT /a_upgrade_type/:id', () => {
    it('should update an existing a_upgrade_type', async () => {
        const a_upgrade_type = {
            "a_ut_name": "Updated Type",
            "a_ut_min": null,
            "a_ut_max": 5
        };
        
    
        const response = await request(server)
            .put(`/a_upgrade_type/${insertedAUpgradeTypeId}`)
            .send(a_upgrade_type);
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty("a_ut_name", "Updated Type");
        // can not check null, 
    });

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .put(`/a_upgrade_type/${insertedAUpgradeTypeId}`)
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid a_ut_ID gracefully', async () => {
        const response = await request(server)
            .put('/a_upgrade_type/99999')
            .send({
                "a_ut_name": "Updated Type",
                "a_ut_min": null,
                "a_ut_max": 5
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid a_ut_ID gracefully --404', async () => {
        const response = await request(server)
            .put('/a_upgrade_type/999')
            .send({
                "a_ut_name": "Updated Type",
                "a_ut_min": null,
                "a_ut_max": 5
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('PUT /a_upgrade/:id', () => {
    it('should update an existing a_upgrade_type', async () => {
        const a_upgrade = {
            "a_ut_id": insertedAUpgradeTypeId,
            "a_upgrade_PC": 15,
            "a_upgrade_name": "Updated Upgrade"
        };
        
    
        const response = await request(server)
            .put(`/a_upgrade/${insertedAUpgradeId}`)
            .send(a_upgrade);

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty("a_ut_id", insertedAUpgradeTypeId);
        expect(response.body[0]).toHaveProperty("a_upgrade_pc", 15);
        expect(response.body[0]).toHaveProperty("a_upgrade_name", "Updated Upgrade");
    });

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .put(`/a_upgrade/${insertedAUpgradeId}`)
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid a_upgrade_ID gracefully', async () => {
        const response = await request(server)
            .put('/a_upgrade/99999')
            .send({
                "a_ut_id": insertedAUpgradeTypeId,
                "a_upgrade_PC": 15,
                "a_upgrade_name": "Updated Upgrade"
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid a_upgrade_ID gracefully --404', async () => {
        const response = await request(server)
            .put('/a_upgrade/999')
            .send({
                "a_ut_id": insertedAUpgradeTypeId,
                "a_upgrade_PC": 15,
                "a_upgrade_name": "Updated Upgrade"
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('PUT /a_unit_a_upgrade/:a_unit_id/:a_upgrade_id', () => {
    it('should update an existing a_unit_a_upgrade', async () => {
        const a_unit_a_upgrade = {
            "a_unit_id": insertedAUnitId,
            "a_upgrade_id": insertedAUpgradeId
        };
        
    
        const response = await request(server)
            .put(`/a_unit_a_upgrade/${insertedAUnitId}/${insertedAUpgradeId}`)
            .send(a_unit_a_upgrade);
        
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('a_unit_id', insertedAUnitId);
        expect(response.body[0]).toHaveProperty('a_upgrade_id', insertedAUpgradeId);

    });

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .put(`/a_unit_a_upgrade/${insertedAUnitId}/${insertedAUpgradeId}`)
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
// RETURN TOO
    it('should handle invalid a_unit_id gracefully', async () => {
        const response = await request(server)
            .put(`/a_unit_a_upgrade/99999/${insertedAUpgradeId}`)
            .send({
                "a_unit_id": insertedAUnitId,
                "a_upgrade_id": insertedAUpgradeId
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid upgrade ID gracefully', async () => {
        const response = await request(server)
            .put(`/a_unit_a_upgrade/${insertedAUnitId}/99999`)
            .send({
                "a_unit_id": insertedAUnitId,
                "a_upgrade_id": insertedAUpgradeId
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid for both IDs gracefully', async () => {
        const response = await request(server)
            .put(`/a_unit_a_upgrade/99999/99999`)
            .send({
                "a_unit_id": insertedAUnitId,
                "a_upgrade_id": insertedAUpgradeId
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid a_unit_id gracefully --404', async () => {
        const response = await request(server)
            .put(`/a_unit_a_upgrade/999/${insertedAUpgradeId}`)
            .send({
                "a_unit_id": insertedAUnitId,
                "a_upgrade_id": insertedAUpgradeId
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid upgrade ID gracefully 404', async () => {
        const response = await request(server)
            .put(`/a_unit_a_upgrade/${insertedAUnitId}/999`)
            .send({
                "a_unit_id": insertedAUnitId,
                "a_upgrade_id": insertedAUpgradeId
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid for both IDs gracefully 404', async () => {
        const response = await request(server)
            .put(`/a_unit_a_upgrade/999/999`)
            .send({
                "a_unit_id": insertedAUnitId,
                "a_upgrade_id": insertedAUpgradeId
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('PUT /a_statline/:id', () => {
    it('should update an existing a_statline', async () => {
        const a_statline = {
            a_statline_name: 'Updated Statline'
        };
    
        const response = await request(server)
            .put(`/a_statline/${insertedAStatlineId}`)
            .send(a_statline);
        
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('a_statline_name', 'Updated Statline');
    });

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .put(`/a_statline/${insertedAStatlineId}`)
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid a_statline_ID gracefully', async () => {
        const response = await request(server)
            .put('/a_statline/99999')
            .send({
                a_statline_name: 'Updated Statline'
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid a_statline_ID gracefully 404', async () => {
        const response = await request(server)
            .put('/a_statline/999')
            .send({
                a_statline_name: 'Updated Statline'
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('PUT /a_unit_a_statline/:a_unit_id/:a_statline_id', () => {
    it('should update an existing a_unit_a_statline', async () => {
        const a_unit_a_statline = {
            "a_unit_id": insertedAUnitId,
            "a_statline_id": insertedAStatlineId,
            "a_statline_min": 5,
            "a_statline_max": 10,
            "a_statline_point_cost": 80
        };
        
    
        const response = await request(server)
            .put(`/a_unit_a_statline/${insertedAUnitId}/${insertedAStatlineId}`)
            .send(a_unit_a_statline);
        
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('a_unit_id', insertedAUnitId);
        expect(response.body[0]).toHaveProperty('a_statline_id', insertedAStatlineId);
        expect(response.body[0]).toHaveProperty('a_statline_min', 5);
        expect(response.body[0]).toHaveProperty('a_statline_max', 10);
        expect(response.body[0]).toHaveProperty('a_statline_point_cost', 80);

    });

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .put(`/a_unit_a_statline/${insertedAUnitId}/${insertedAStatlineId}`)
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
    it('should handle invalid a_unit_id gracefully', async () => {
        const response = await request(server)
            .put(`/a_unit_a_statline/99999/${insertedAStatlineId}`)
            .send({
                "a_unit_id": insertedAUnitId,
                "a_statline_id": insertedAStatlineId,
                "a_statline_min": 5,
                "a_statline_max": 10,
                "a_statline_point_cost": 80
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid statline ID gracefully', async () => {
        const response = await request(server)
            .put(`/a_unit_a_statline/${insertedAUnitId}/99999`)
            .send({
                "a_unit_id": insertedAUnitId,
                "a_statline_id": insertedAStatlineId,
                "a_statline_min": 5,
                "a_statline_max": 10,
                "a_statline_point_cost": 80
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid for both IDs gracefully', async () => {
        const response = await request(server)
            .put(`/a_unit_a_statline/99999/99999`)
            .send({
                "a_unit_id": insertedAUnitId,
                "a_statline_id": insertedAStatlineId,
                "a_statline_min": 5,
                "a_statline_max": 10,
                "a_statline_point_cost": 80
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid a_unit_id gracefully 404', async () => {
        const response = await request(server)
            .put(`/a_unit_a_statline/999/${insertedAStatlineId}`)
            .send({
                "a_unit_id": insertedAUnitId,
                "a_statline_id": insertedAStatlineId,
                "a_statline_min": 5,
                "a_statline_max": 10,
                "a_statline_point_cost": 80
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid statline ID gracefully 404', async () => {
        const response = await request(server)
            .put(`/a_unit_a_statline/${insertedAUnitId}/999`)
            .send({
                "a_unit_id": insertedAUnitId,
                "a_statline_id": insertedAStatlineId,
                "a_statline_min": 5,
                "a_statline_max": 10,
                "a_statline_point_cost": 80
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid for both IDs gracefully -- 404', async () => {
        const response = await request(server)
            .put(`/a_unit_a_statline/999/999`)
            .send({
                "a_unit_id": insertedAUnitId,
                "a_statline_id": insertedAStatlineId,
                "a_statline_min": 5,
                "a_statline_max": 10,
                "a_statline_point_cost": 80
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('PUT /a_unit_a_upgrade_type/:a_unit_id/:a_ut_id', () => {
    it('should update an existing a_unit_a_statline', async () => {
        const a_unit_a_upgrade_type = {
            "a_unit_id": insertedAUnitId,
            "a_ut_id": insertedAUpgradeTypeId 
        };
        
    
        const response = await request(server)
            .put(`/a_unit_a_upgrade_type/${insertedAUnitId}/${insertedAUpgradeTypeId}`)
            .send(a_unit_a_upgrade_type);
        
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('a_unit_id', insertedAUnitId);
        expect(response.body[0]).toHaveProperty('a_ut_id', insertedAUpgradeTypeId);

    });

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .put(`/a_unit_a_upgrade_type/${insertedAUnitId}/${insertedAUpgradeTypeId}`)
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
    it('should handle invalid a_unit_id gracefully', async () => {
        const response = await request(server)
            .put(`/a_unit_a_upgrade_type/99999/${insertedAUpgradeTypeId}`)
            .send({
                "a_unit_id": insertedAUnitId,
                "a_ut_id": insertedAUpgradeTypeId 
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid ut ID gracefully', async () => {
        const response = await request(server)
            .put(`/a_unit_a_upgrade_type/${insertedAUnitId}/99999`)
            .send({
                "a_unit_id": insertedAUnitId,
                "a_ut_id": insertedAUpgradeTypeId 
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid for both IDs gracefully', async () => {
        const response = await request(server)
            .put(`/a_unit_a_upgrade_type/99999/99999`)
            .send({
                "a_unit_id": insertedAUnitId,
                "a_ut_id": insertedAUpgradeTypeId 
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid a_unit_id gracefully  404', async () => {
        const response = await request(server)
            .put(`/a_unit_a_upgrade_type/999/${insertedAUpgradeTypeId}`)
            .send({
                "a_unit_id": insertedAUnitId,
                "a_ut_id": insertedAUpgradeTypeId 
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid ut ID gracefully 404', async () => {
        const response = await request(server)
            .put(`/a_unit_a_upgrade_type/${insertedAUnitId}/999`)
            .send({
                "a_unit_id": insertedAUnitId,
                "a_ut_id": insertedAUpgradeTypeId 
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid for both IDs gracefully 404', async () => {
        const response = await request(server)
            .put(`/a_unit_a_upgrade_type/999/999`)
            .send({
                "a_unit_id": insertedAUnitId,
                "a_ut_id": insertedAUpgradeTypeId 
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('PUT /keyword_a_unit/:keyword_id/:a_unit_id', () => {
    it('should update an existing keyword_a_unit', async () => {
        const keyword_a_unit = {
            "keyword_id": insertedKeywordsId,
            "a_unit_id": insertedAUnitId
        };
        
    
        const response = await request(server)
            .put(`/keyword_a_unit/${insertedKeywordsId}/${insertedAUnitId}`)
            .send(keyword_a_unit);
        
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('keyword_id', insertedKeywordsId);
        expect(response.body[0]).toHaveProperty('a_unit_id', insertedAUnitId);

    });

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .put(`/keyword_a_unit/${insertedKeywordsId}/${insertedAUnitId}`)
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
    it('should handle invalid keyword id gracefully', async () => {
        const response = await request(server)
            .put(`/keyword_a_unit/99999/${insertedAUnitId}`)
            .send({
                "keyword_id": insertedKeywordsId,
                "a_unit_id": insertedAUnitId
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid unit ID gracefully', async () => {
        const response = await request(server)
            .put(`/keyword_a_unit/${insertedKeywordsId}/99999`)
            .send({
                "keyword_id": insertedKeywordsId,
                "a_unit_id": insertedAUnitId
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid for both IDs gracefully', async () => {
        const response = await request(server)
            .put(`/keyword_a_unit/99999/99999`)
            .send({
                "keyword_id": insertedKeywordsId,
                "a_unit_id": insertedAUnitId
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid keyword id gracefully 404', async () => {
        const response = await request(server)
            .put(`/keyword_a_unit/999/${insertedAUnitId}`)
            .send({
                "keyword_id": insertedKeywordsId,
                "a_unit_id": insertedAUnitId
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid unit ID gracefully 404', async () => {
        const response = await request(server)
            .put(`/keyword_a_unit/${insertedKeywordsId}/999`)
            .send({
                "keyword_id": insertedKeywordsId,
                "a_unit_id": insertedAUnitId
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid for both IDs gracefully 404', async () => {
        const response = await request(server)
            .put(`/keyword_a_unit/999/999`)
            .send({
                "keyword_id": insertedKeywordsId,
                "a_unit_id": insertedAUnitId
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('PUT /rule_a_upgrade/:rule_id/:a_upgrade_id', () => {
    it('should update an existing rule_a_upgrade', async () => {
        const rule_a_upgrade = {
            "rule_id": insertedRuleId,
            "a_upgrade_id": insertedAUpgradeId
        };
        
    
        const response = await request(server)
            .put(`/rule_a_upgrade/${insertedRuleId}/${insertedAUpgradeId}`)
            .send(rule_a_upgrade);
        
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('rule_id', insertedRuleId);
        expect(response.body[0]).toHaveProperty('a_upgrade_id', insertedAUpgradeId);

    });

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .put(`/rule_a_upgrade/${insertedRuleId}/${insertedAUpgradeId}`)
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
    it('should handle invalid rule id gracefully', async () => {
        const response = await request(server)
            .put(`/rule_a_upgrade/99999/${insertedAUpgradeId}`)
            .send({
                "rule_id": insertedRuleId,
                "a_upgrade_id": insertedAUpgradeId
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid a upgrade ID gracefully', async () => {
        const response = await request(server)
            .put(`/rule_a_upgrade/${insertedRuleId}/99999`)
            .send({
                "rule_id": insertedRuleId,
                "a_upgrade_id": insertedAUpgradeId
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid for both IDs gracefully', async () => {
        const response = await request(server)
            .put(`/rule_a_upgrade/99999/99999`)
            .send({
                "rule_id": insertedRuleId,
                "a_upgrade_id": insertedAUpgradeId
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid rule id gracefully 404', async () => {
        const response = await request(server)
            .put(`/rule_a_upgrade/999/${insertedAUpgradeId}`)
            .send({
                "rule_id": insertedRuleId,
                "a_upgrade_id": insertedAUpgradeId
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid a upgrade ID gracefully 404', async () => {
        const response = await request(server)
            .put(`/rule_a_upgrade/${insertedRuleId}/999`)
            .send({
                "rule_id": insertedRuleId,
                "a_upgrade_id": insertedAUpgradeId
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid for both IDs gracefully 404', async () => {
        const response = await request(server)
            .put(`/rule_a_upgrade/999/999`)
            .send({
                "rule_id": insertedRuleId,
                "a_upgrade_id": insertedAUpgradeId
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('PUT /rule_a_unit/:rule_id/:a_unit_id', () => {
    it('should update an existing rule_a_unit', async () => {
        const rule_a_unit = {
            "rule_id": insertedRuleId,
            "a_unit_id": insertedAUnitId
        };
        
    
        const response = await request(server)
            .put(`/rule_a_unit/${insertedRuleId}/${insertedAUnitId}`)
            .send(rule_a_unit);
        
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('rule_id', insertedRuleId);
        expect(response.body[0]).toHaveProperty('a_unit_id', insertedAUnitId);

    });

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .put(`/rule_a_unit/${insertedRuleId}/${insertedAUnitId}`)
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
    it('should handle invalid rule id gracefully', async () => {
        const response = await request(server)
            .put(`/rule_a_unit/99999/${insertedAUnitId}`)
            .send({
                "rule_id": insertedRuleId,
                "a_unit_id": insertedAUnitId
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid a unit ID gracefully', async () => {
        const response = await request(server)
            .put(`/rule_a_unit/${insertedRuleId}/99999`)
            .send({
                "rule_id": insertedRuleId,
                "a_unit_id": insertedAUnitId
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid for both IDs gracefully', async () => {
        const response = await request(server)
            .put(`/rule_a_unit/99999/99999`)
            .send({
                "rule_id": insertedRuleId,
                "a_unit_id": insertedAUnitId
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid rule id gracefully 404', async () => {
        const response = await request(server)
            .put(`/rule_a_unit/999/${insertedAUnitId}`)
            .send({
                "rule_id": insertedRuleId,
                "a_unit_id": insertedAUnitId
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid a unit ID gracefully 404', async () => {
        const response = await request(server)
            .put(`/rule_a_unit/${insertedRuleId}/999`)
            .send({
                "rule_id": insertedRuleId,
                "a_unit_id": insertedAUnitId
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid for both IDs gracefully 404', async () => {
        const response = await request(server)
            .put(`/rule_a_unit/999/999`)
            .send({
                "rule_id": insertedRuleId,
                "a_unit_id": insertedAUnitId
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('PUT /a_statline_gs_stat/:a_statline_id/:gs_stat_id', () => {
    it('should update an existing a_statline_gs_stat', async () => {
        const a_statline_gs_stat = {
            "a_statline_id": insertedAStatlineId,
            "gs_stat_id": insertedGsStatId,
            "stat_value": 5
        };
    
        const response = await request(server)
            .put(`/a_statline_gs_stat/${insertedAStatlineId}/${insertedGsStatId}`)
            .send(a_statline_gs_stat);
        
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty("a_statline_id", insertedAStatlineId);
        expect(response.body[0]).toHaveProperty("gs_stat_id", insertedGsStatId);
        expect(response.body[0]).toHaveProperty("stat_value", 5);

    });

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .put(`/a_statline_gs_stat/${insertedAStatlineId}/${insertedGsStatId}`)
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
    it('should handle invalid a statline id gracefully', async () => {
        const response = await request(server)
            .put(`/a_statline_gs_stat/99999/${insertedGsStatId}`)
            .send({
                "a_statline_id": insertedAStatlineId,
                "gs_stat_id": insertedGsStatId,
                "stat_value": 5
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid a unit ID gracefully', async () => {
        const response = await request(server)
            .put(`/a_statline_gs_stat/${insertedAStatlineId}/99999`)
            .send({
                "a_statline_id": insertedAStatlineId,
                "gs_stat_id": insertedGsStatId,
                "stat_value": 5
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid for both IDs gracefully', async () => {
        const response = await request(server)
            .put(`/a_statline_gs_stat/99999/99999`)
            .send({
                "a_statline_id": insertedAStatlineId,
                "gs_stat_id": insertedGsStatId,
                "stat_value": 5
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid a statline id gracefully 404', async () => {
        const response = await request(server)
            .put(`/a_statline_gs_stat/999/${insertedGsStatId}`)
            .send({
                "a_statline_id": insertedAStatlineId,
                "gs_stat_id": insertedGsStatId,
                "stat_value": 5
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid a unit ID gracefully 404', async () => {
        const response = await request(server)
            .put(`/a_statline_gs_stat/${insertedAStatlineId}/999`)
            .send({
                "a_statline_id": insertedAStatlineId,
                "gs_stat_id": insertedGsStatId,
                "stat_value": 5
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid for both IDs gracefully 404', async () => {
        const response = await request(server)
            .put(`/a_statline_gs_stat/999/999`)
            .send({
                "a_statline_id": insertedAStatlineId,
                "gs_stat_id": insertedGsStatId,
                "stat_value": 5
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('PUT /keyword_a_upgrade/:keyword_id/:a_upgrade_id', () => {
    it('should update an existing keyword_a_upgrade', async () => {
        const keyword_a_upgrade = {
            "keyword_id": insertedKeywordsId,
            "a_upgrade_id": insertedAUpgradeId
        };
        
    
        const response = await request(server)
            .put(`/keyword_a_upgrade/${insertedKeywordsId}/${insertedAUpgradeId}`)
            .send(keyword_a_upgrade);
        
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('keyword_id', insertedKeywordsId);
        expect(response.body[0]).toHaveProperty('a_upgrade_id', insertedAUpgradeId);

    });

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .put(`/keyword_a_upgrade/${insertedKeywordsId}/${insertedAUpgradeId}`)
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
    it('should handle invalid keyword id gracefully', async () => {
        const response = await request(server)
            .put(`/keyword_a_upgrade/99999/${insertedAUpgradeId}`)
            .send({
                "keyword_id": insertedKeywordsId,
                "a_upgrade_id": insertedAUpgradeId
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid upgrade ID gracefully', async () => {
        const response = await request(server)
            .put(`/keyword_a_upgrade/${insertedKeywordsId}/99999`)
            .send({
                "keyword_id": insertedKeywordsId,
                "a_upgrade_id": insertedAUpgradeId
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid for both IDs gracefully', async () => {
        const response = await request(server)
            .put(`/keyword_a_upgrade/99999/99999`)
            .send({
                "keyword_id": insertedKeywordsId,
                "a_upgrade_id": insertedAUpgradeId
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid keyword id gracefully 404', async () => {
        const response = await request(server)
            .put(`/keyword_a_upgrade/999/${insertedAUpgradeId}`)
            .send({
                "keyword_id": insertedKeywordsId,
                "a_upgrade_id": insertedAUpgradeId
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid upgrade ID gracefully 404', async () => {
        const response = await request(server)
            .put(`/keyword_a_upgrade/${insertedKeywordsId}/999`)
            .send({
                "keyword_id": insertedKeywordsId,
                "a_upgrade_id": insertedAUpgradeId
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid for both IDs gracefully 404', async () => {
        const response = await request(server)
            .put(`/keyword_a_upgrade/999/999`)
            .send({
                "keyword_id": insertedKeywordsId,
                "a_upgrade_id": insertedAUpgradeId
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('PUT /army_list/:id', () => {
    it('should update an existing army_list', async () => {
        const army_list = {
            "game_system_id": insertedGameSystemId,
            "gs_gm_id": insertedGsGameModeId,
            "army_list_name": "Updated List"
        };
    
        const response = await request(server)
            .put(`/army_list/${insertedArmyListId}`)
            .send(army_list);
        
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('game_system_id', insertedGameSystemId);
        expect(response.body[0]).toHaveProperty('gs_gm_id', insertedGsGameModeId);
        expect(response.body[0]).toHaveProperty('army_list_name', "Updated List");
    });

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .put(`/army_list/${insertedArmyListId}`)
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid army_list ID gracefully', async () => {
        const response = await request(server)
            .put('/army_list/99999')
            .send({
                "game_system_id": insertedGameSystemId,
                "gs_gm_id": insertedGsGameModeId,
                "army_list_name": "Updated List"
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid army_list ID gracefully 404', async () => {
        const response = await request(server)
            .put('/army_list/999')
            .send({
                "game_system_id": insertedGameSystemId,
                "gs_gm_id": insertedGsGameModeId,
                "army_list_name": "Updated List"
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('PUT /al_force/:id', () => {
    it('should update an existing al_force', async () => {
        const al_force = {
            "army_list_id": insertedArmyListId,
            "army_id": insertedArmyId
        };
    
        const response = await request(server)
            .put(`/al_force/${insertedAlForceId}`)
            .send(al_force);
        
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('army_list_id', insertedArmyListId);
        expect(response.body[0]).toHaveProperty('army_id', insertedArmyId);
    });

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .put(`/al_force/${insertedAlForceId}`)
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid al_force ID gracefully', async () => {
        const response = await request(server)
            .put('/al_force/99999')
            .send({
                "army_list_id": insertedArmyListId,
                "army_id": insertedArmyId
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid al_force ID gracefully 404', async () => {
        const response = await request(server)
            .put('/al_force/999')
            .send({
                "army_list_id": insertedArmyListId,
                "army_id": insertedArmyId
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('PUT /al_unit/:id', () => {
    it('should update an existing al_unit', async () => {
        const al_unit = {
            "al_force_id": insertedAlForceId,
            "a_unit_id": insertedAUnitId,
            "al_unit_name": "Tim 2",
            "al_unit_color": "ffffff"
        };
    
        const response = await request(server)
            .put(`/al_unit/${insertedAlUnitId}`)
            .send(al_unit);
    
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('al_force_id', insertedAlForceId);
        expect(response.body[0]).toHaveProperty('a_unit_id', insertedAUnitId);
        expect(response.body[0]).toHaveProperty('al_unit_name', "Tim 2");
        expect(response.body[0]).toHaveProperty('al_unit_color', "ffffff");
    });

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .put(`/al_unit/${insertedAlUnitId}`)
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid al_unit ID gracefully', async () => {
        const response = await request(server)
            .put('/al_unit/99999')
            .send({
                "al_force_id": insertedAlForceId,
                "a_unit_id": insertedAUnitId,
                "al_unit_name": "Tim 2",
                "al_unit_color": "ffffff"
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid al_unit ID gracefully 404', async () => {
        const response = await request(server)
            .put('/al_unit/999')
            .send({
                "al_force_id": insertedAlForceId,
                "a_unit_id": insertedAUnitId,
                "al_unit_name": "Tim 2",
                "al_unit_color": "ffffff"
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('PUT /al_upgrade/:id', () => {
    it('should update an existing al_upgrade', async () => {
        const al_upgrade = {
            "al_unit_id": insertedAlUnitId,
            "a_upgrade_id": insertedAUpgradeId,
            "a_ut_id": insertedAUpgradeTypeId
        };
    
        const response = await request(server)
            .put(`/al_upgrade/${insertedAlUpgradeId}`)
            .send(al_upgrade);
    
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('al_unit_id', insertedAlUnitId);
        expect(response.body[0]).toHaveProperty('a_upgrade_id', insertedAUpgradeId);
        expect(response.body[0]).toHaveProperty('a_ut_id', insertedAUpgradeTypeId);
    });

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .put(`/al_upgrade/${insertedAlUpgradeId}`)
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid al_upgrade ID gracefully', async () => {
        const response = await request(server)
            .put('/al_upgrade/99999')
            .send({
                "al_unit_id": insertedAlUnitId,
                "a_upgrade_id": insertedAUpgradeId,
                "a_ut_id": insertedAUpgradeTypeId
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid al_upgrade ID gracefully 404', async () => {
        const response = await request(server)
            .put('/al_upgrade/999')
            .send({
                "al_unit_id": insertedAlUnitId,
                "a_upgrade_id": insertedAUpgradeId,
                "a_ut_id": insertedAUpgradeTypeId
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('PUT /al_unit_a_unit_a_statline_quantity/:al_unit_id/:a_unit_id/:a_statline_id', () => {
    it('should update an existing al_unit_a_unit_a_statline_quantity', async () => {
        const al_unit_a_unit_a_statline_quantity = {
            "al_unit_id": insertedAlUnitId,
            "a_unit_id": insertedAUnitId,
            "a_statline_id": insertedAStatlineId,
            "quantity": 6
        };
        
    
        const response = await request(server)
            .put(`/al_unit_a_unit_a_statline_quantity/${insertedAlUnitId}/${insertedAUnitId}/${insertedAStatlineId}`)
            .send(al_unit_a_unit_a_statline_quantity);
        
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('al_unit_id', insertedAlUnitId);
        expect(response.body[0]).toHaveProperty('a_unit_id', insertedAUnitId);
        expect(response.body[0]).toHaveProperty('a_statline_id', insertedAStatlineId);
        expect(response.body[0]).toHaveProperty('quantity', 6);

    });

    it('should handle errors gracefully', async () => {
        const response = await request(server)
        .put(`/al_unit_a_unit_a_statline_quantity/${insertedAlUnitId}/${insertedAUnitId}/${insertedAStatlineId}`)
            .send({
                // Missing required fields
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid al unit id gracefully', async () => {
        const response = await request(server)
        .put(`/al_unit_a_unit_a_statline_quantity/99999/${insertedAUnitId}/${insertedAStatlineId}`)
            .send({
            "al_unit_id": insertedAlUnitId,
            "a_unit_id": insertedAUnitId,
            "a_statline_id": insertedAStatlineId,
            "quantity": 6
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid unit id gracefully', async () => {
        const response = await request(server)
        .put(`/al_unit_a_unit_a_statline_quantity/${insertedAlUnitId}/99999/${insertedAStatlineId}`)
            .send({
            "al_unit_id": insertedAlUnitId,
            "a_unit_id": insertedAUnitId,
            "a_statline_id": insertedAStatlineId,
            "quantity": 6
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid unit id gracefully', async () => {
        const response = await request(server)
        .put(`/al_unit_a_unit_a_statline_quantity/${insertedAlUnitId}/${insertedAStatlineId}/99999`)
            .send({
            "al_unit_id": insertedAlUnitId,
            "a_unit_id": insertedAUnitId,
            "a_statline_id": insertedAStatlineId,
            "quantity": 6
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid for all IDs gracefully', async () => {
        const response = await request(server)
            .put(`/al_unit_a_unit_a_statline_quantity/99999/99999/99999`)
            .send({
                "al_unit_id": insertedAlUnitId,
                "a_unit_id": insertedAUnitId,
                "a_statline_id": insertedAStatlineId,
                "quantity": 6
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);



    it('should handle invalid al unit id gracefully 404', async () => {
        const response = await request(server)
        .put(`/al_unit_a_unit_a_statline_quantity/999/${insertedAUnitId}/${insertedAStatlineId}`)
            .send({
            "al_unit_id": insertedAlUnitId,
            "a_unit_id": insertedAUnitId,
            "a_statline_id": insertedAStatlineId,
            "quantity": 6
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid unit id gracefully 404', async () => {
        const response = await request(server)
        .put(`/al_unit_a_unit_a_statline_quantity/${insertedAlUnitId}/999/${insertedAStatlineId}`)
            .send({
            "al_unit_id": insertedAlUnitId,
            "a_unit_id": insertedAUnitId,
            "a_statline_id": insertedAStatlineId,
            "quantity": 6
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid unit id gracefully 404', async () => {
        const response = await request(server)
        .put(`/al_unit_a_unit_a_statline_quantity/${insertedAlUnitId}/${insertedAStatlineId}/999`)
            .send({
            "al_unit_id": insertedAlUnitId,
            "a_unit_id": insertedAUnitId,
            "a_statline_id": insertedAStatlineId,
            "quantity": 6
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);

    it('should handle invalid for all IDs gracefully 404', async () => {
        const response = await request(server)
            .put(`/al_unit_a_unit_a_statline_quantity/999/999/999`)
            .send({
                "al_unit_id": insertedAlUnitId,
                "a_unit_id": insertedAUnitId,
                "a_statline_id": insertedAStatlineId,
                "quantity": 6
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});














//DELETE

describe('DELETE /al_unit_a_unit_a_statline_quantity/:id/:id/:id', () => {
    it('should delete a al_upgrade', async () => {
        const response = await request(server)
            .delete(`/al_unit_a_unit_a_statline_quantity/${insertedAlUnitId}/${insertedAUnitId}/${insertedAStatlineId}`);

        expect(response.status).toBe(200);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .delete('/al_unit_a_unit_a_statline_quantity/99999/99999/999999');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('DELETE /al_upgrade/:id', () => {
    it('should delete a al_upgrade', async () => {
        const response = await request(server)
            .delete(`/al_upgrade/${insertedAlUpgradeId}`);

        expect(response.status).toBe(200);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .delete('/al_upgrade/999999');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('DELETE /al_unit/:id', () => {
    it('should delete a al_unit', async () => {
        const response = await request(server)
            .delete(`/al_unit/${insertedAlUnitId}`);

        expect(response.status).toBe(200);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .delete('/al_unit/999999');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('DELETE /al_force/:id', () => {
    it('should delete a al_force', async () => {
        const response = await request(server)
            .delete(`/al_force/${insertedAlForceId}`);

        expect(response.status).toBe(200);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .delete('/al_force/999999');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('DELETE /army_list/:id', () => {
    it('should delete a army_list', async () => {
        const response = await request(server)
            .delete(`/army_list/${insertedArmyListId}`);

        expect(response.status).toBe(200);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .delete('/army_list/999999');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('DELETE /keyword_a_upgrade/:keyword_id/:a_upgrade_id', () => {
    it('should delete a keyword_a_upgrade', async () => {
        const response = await request(server)
            .delete(`/keyword_a_upgrade/${insertedKeywordsId}/${insertedAUpgradeId}`);

        expect(response.status).toBe(200);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .delete('/keyword_a_upgrade/99999/999999');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('DELETE /a_statline_gs_stat/:a_statline_id/:gs_stat_id', () => {
    it('should delete a a_statline_gs_stat', async () => {
        const response = await request(server)
            .delete(`/a_statline_gs_stat/${insertedAStatlineId}/${insertedGsStatId}`);

        expect(response.status).toBe(200);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .delete('/a_statline_gs_stat/99999/999999');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('DELETE /rule_a_unit/:rule_id/:a_unit_id', () => {
    it('should delete a rule_a_unit', async () => {
        const response = await request(server)
            .delete(`/rule_a_unit/${insertedRuleId}/${insertedAUnitId}`);

        expect(response.status).toBe(200);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .delete('/rule_a_unit/99999/999999');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('DELETE /rule_a_upgrade/:rule_id/:a_upgrade_id', () => {
    it('should delete a rule_a_upgrade', async () => {
        const response = await request(server)
            .delete(`/rule_a_upgrade/${insertedRuleId}/${insertedAUpgradeId}`);

        expect(response.status).toBe(200);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .delete('/rule_a_upgrade/99999/999999');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('DELETE /keyword_a_unit/:keyword_id/:a_unit_id', () => {
    it('should delete a keyword_a_unit', async () => {
        const response = await request(server)
            .delete(`/keyword_a_unit/${insertedKeywordsId}/${insertedAUnitId}`);

        expect(response.status).toBe(200);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .delete('/keyword_a_unit/99999/999999');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('DELETE /a_unit_a_upgrade_type/:a_unit_id/:a_ut_id', () => {
    it('should delete a a_unit_a_upgrade_type', async () => {
        const response = await request(server)
            .delete(`/a_unit_a_upgrade_type/${insertedAUnitId}/${insertedAUpgradeTypeId}`);

        expect(response.status).toBe(200);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .delete('/a_unit_a_upgrade_type/99999/999999');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('DELETE /a_unit_a_statline/:a_unit_id/:a_statline_id', () => {
    it('should delete a a_unit_a_statline', async () => {
        const response = await request(server)
            .delete(`/a_unit_a_statline/${insertedAUnitId}/${insertedAStatlineId}`);

        expect(response.status).toBe(200);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .delete('/a_unit_a_statline/99999/999999');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('DELETE /a_statline/:id', () => {
    it('should delete a a_statline', async () => {
        const response = await request(server)
            .delete(`/a_statline/${insertedAStatlineId}`);

        expect(response.status).toBe(200);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .delete('/a_statline/999999');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('DELETE /a_unit_a_upgrade/:a_unit_id/:a_upgrade_id', () => {
    it('should delete a a_unit_a_upgrade/', async () => {
        const response = await request(server)
            .delete(`/a_unit_a_upgrade/${insertedAUnitId}/${insertedAUpgradeId}`);

        expect(response.status).toBe(200);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .delete('/a_unit_a_upgrade/999999/99999');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('DELETE /a_upgrade/:id', () => {
    it('should delete a a_upgrade', async () => {
        const response = await request(server)
            .delete(`/a_upgrade/${insertedAUpgradeId}`);

        expect(response.status).toBe(200);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .delete('/a_upgrade/999999');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('DELETE /a_upgrade_type/:id', () => {
    it('should delete a a_upgrade_type', async () => {
        const response = await request(server)
            .delete(`/a_upgrade_type/${insertedAUpgradeTypeId}`);

        expect(response.status).toBe(200);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .delete('/a_upgrade_type/999999');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('DELETE /a_unit/:id', () => {
    it('should delete a a_unit', async () => {
        const response = await request(server)
            .delete(`/a_unit/${insertedAUnitId}`);

        expect(response.status).toBe(200);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .delete('/a_unit/999999');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('DELETE /gs_game_mode/:id', () => {
    it('should delete a gs_game_mode', async () => {
        const response = await request(server)
            .delete(`/gs_game_mode/${insertedGsGameModeId}`);

        expect(response.status).toBe(200);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .delete('/gs_game_mode/999999');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('DELETE /keyword_rule/:keywordId/:ruleId', () => {
    it('should delete a keyword_rule', async () => {
        const response = await request(server)
            .delete(`/keyword_rule/${insertedKeywordsId}/${insertedRuleId}`);

        expect(response.status).toBe(200);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .delete('/keyword_rule/999999/99999');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('DELETE /rule/:id', () => {
    it('should delete a rule', async () => {
        const response = await request(server)
            .delete(`/rule/${insertedRuleId}`);

        expect(response.status).toBe(200);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .delete('/rule/999999');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('DELETE /army/:id', () => {
    it('should delete a army', async () => {
        const response = await request(server)
            .delete(`/army/${insertedArmyId}`);

        expect(response.status).toBe(200);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .delete('/army/999999');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});

describe('DELETE /keyword/:id', () => {
    it('should delete a keyword', async () => {
        const response = await request(server)
            .delete(`/keyword/${insertedKeywordsId}`);

        expect(response.status).toBe(200);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .delete('/keyword/999999');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});


describe('DELETE /gs_stat/:id', () => {
    it('should delete a gs_stat', async () => {
        const response = await request(server)
            .delete(`/gs_stat/${insertedGsStatId}`);

        expect(response.status).toBe(200);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .delete('/gs_stat/999999');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});


describe('DELETE /gs_unit_structure/:id', () => {
    it('should delete a gs_unit_structure', async () => {
        const response = await request(server)
            .delete(`/gs_unit_structure/${insertedGsUnitStructureId}`);

        expect(response.status).toBe(200);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .delete('/gs_unit_structure/999999');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});


describe('DELETE /gs_supertype/:id', () => {
    it('should delete a gs_supertype', async () => {
        const response = await request(server)
            .delete(`/gs_supertype/${insertedGsSupertypeID}`);

        expect(response.status).toBe(200);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .delete('/gs_supertype/999999');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});



describe('DELETE /game_system/:id', () => {
    it('should delete a game system', async () => {
        const response = await request(server)
            .delete(`/game_system/${insertedGameSystemId}`);

        expect(response.status).toBe(200);
    }, 10000);

    it('should handle errors gracefully', async () => {
        const response = await request(server)
            .delete('/game_system/999999');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
    }, 20000);
});


