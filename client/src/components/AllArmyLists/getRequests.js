

/**
 * Checks if a specified statistic acronym is used in a given statblock.
 * @param {Array<Array<any>>} statblock - The statblock to check.
 * @param {string} acronyme - The acronym of the statistic to search for.
 * @returns {boolean} Returns true if the specified statistic acronym is found in the statblock, otherwise false.
 */
function checkIfStatUsed(statblock, acronyme) {
    for (let i = 0; i < statblock.length; i++) {
        if (statblock[i][0] === acronyme) {
            return true; 
        }
    }
    return false;
}

/**
 * Organizes game system data into nested arrays based on unique identifiers.
 * @param {Array<any>} data - The game system data to organize.
 * @returns {Array<Array<any>>} Nested arrays representing organized game system data.
 */
function organizeGameSystem(data) { // there is a issue with the following function, or possibly with the query
    if (!Array.isArray(data)) {
        console.error('Input data is not an array');
        return [];
    }
  
    const nestedArrays = [];
    const uniqueGameSystemIds = [...new Set(data.map(item => item.game_system_id))];
  
    uniqueGameSystemIds.forEach(systemId => {
        const nestedArray = [];
        const systemData = data.filter(item => item.game_system_id === systemId);
        nestedArray.push(systemId); 
        nestedArray.push(systemData[0].game_system_name); 
        nestedArray.push(systemData[0].game_system_edition); 
        nestedArray.push(systemData[0].game_system_version); 
        nestedArray.push(systemData[0].gs_us_id);
    
        const gsStats = [];
        const gsSupertypes = [];
        const rules = [];
        const gsGameModes = [];

        systemData.forEach(item => {
            if (!gsStats.some(stat => stat[0] === item.gs_stat_id)) {
                gsStats.push([item.gs_stat_id, item.gs_stat_name, item.gs_stat_acronyme]);
            }
            if (!gsSupertypes.some(supertype => supertype[0] === item.gs_supertype_id)) {
                gsSupertypes.push([item.gs_supertype_id, item.gs_supertype_name, item.gs_supertype_lower, item.gs_supertype_upper]);
            }
            if (!rules.some(rule => rule[0] === item.rule_id)) {
                // Create a nested array for keywords within each rule array
                const keywords = [];
                systemData
                    .filter(rule => rule.rule_id === item.rule_id)
                    .forEach(keyword => {
                        // Check if the keyword is unique before pushing it
                        if (!keywords.some(k => k[0] === keyword.keyword_id)) {
                            keywords.push([keyword.keyword_id, keyword.keyword_name]);
                        }
                    });
                rules.push([
                    item.rule_id,
                    item.rule_name,
                    item.rule_description,
                    keywords
                ]);
            }
            if (!gsGameModes.some(gameMode => gameMode[0] === item.gs_gm_id)) {
                gsGameModes.push([item.gs_gm_id, item.gs_gm_name, item.gs_gm_point_upper, item.gs_gm_point_lower]);
            }
        });

        nestedArray.push(gsStats);
        nestedArray.push(gsSupertypes);
        nestedArray.push(rules);
        nestedArray.push(gsGameModes);
    
        nestedArrays.push(nestedArray);
    });
    return nestedArrays;
}

/**
 * Fetches game system data from the server.
 * @returns {Promise<Array<Array<any>>>} A promise that resolves to organized game system data.
 */
export async function GetGameSystems() {
    try {        
        const response = await fetch(`http://localhost:4000/game_system`, {
            method: "GET"
        });

        const responseData = await response.json();

        return organizeGameSystem(responseData);
    } catch (err) {
        console.error("Error fetching data:", err);
        throw err; 
    }
}

/**
 * Organizes army data into nested arrays based on unique identifiers.
 * @param {Array<any>} data - The army data to organize.
 * @returns {Array<Array<any>>} Nested arrays representing organized army data.
 */
function organizeArmy(data) {
    if (!Array.isArray(data)) {
        console.error('Input data is not an array');
        return [];
    }
  
    const nestedArrays = [];
    const uniqueArmyId = [...new Set(data.map(item => item.army_id))];
  
    uniqueArmyId.forEach(armyId => {
        const nestedArray = [];
        const armyData = data.filter(item => item.army_id === armyId);
        nestedArray.push(armyId); 
        nestedArray.push(armyData[0].army_name); 
        nestedArray.push(armyData[0].army_edition); 
        nestedArray.push(armyData[0].army_version); 

        const aUnits = [];
        const aUpgradeTypes = [];
        const intersections = [];

        armyData.forEach(item => {            
            if (!aUnits.some(aUnit => aUnit[0] === item.a_unit_id)) {
                const aUnitRules = [];
                const aUnitKeywords = [];
                const aUnitStatlines = [];

                armyData
                    .filter(aUnit => aUnit.a_unit_id === item.a_unit_id)
                    .forEach(aUnit => {
                        const ruleId = aUnit.a_unit_rule_id;
                        if (!aUnitRules.some(rule => rule[0] === ruleId)) {
                            aUnitRules.push([ruleId]);
                        }

                        const keywordId = aUnit.a_unit_keyword_id;
                        if (!aUnitKeywords.some(keyword => keyword[0] === keywordId)) {
                            aUnitKeywords.push([keywordId]);
                        }

                        const statlineId = aUnit.a_statline_id;
                        if (!aUnitStatlines.some(statline => statline[0] === statlineId)) {
                            const aUnitGsStats = [];
                            armyData
                                .filter(aUnitStat => aUnitStat.a_statline_id === statlineId)
                                .forEach(aUnitStat => {
                                    const gsStatId = aUnitStat.gs_stat_id;
                                    if (!aUnitGsStats.some(stat => stat[0] === gsStatId)) {
                                        aUnitGsStats.push([gsStatId, aUnitStat.stat_value]);
                                    }
                                });

                            aUnitStatlines.push([
                                statlineId, 
                                [aUnit.a_statline_name],
                                aUnit.a_statline_min, 
                                aUnit.a_statline_max, 
                                aUnit.a_statline_point_cost,
                                aUnitGsStats
                            ]);
                        }
                    });

                aUnits.push([
                    item.a_unit_id, 
                    item.gs_supertype_id, 
                    item.a_unit_name, 
                    item.a_unit_pc, 
                    item.a_unit_limit_per_army, 
                    aUnitRules,
                    aUnitKeywords,
                    aUnitStatlines
                ]);
            }
            if (item.a_ut_id !== null){
                const existingUpgradeType = aUpgradeTypes.find(type => type[0] === item.a_ut_id);
                if (!existingUpgradeType) {
                    const aUpgrades = [];

                    armyData
                        .filter(aUpgradeType => aUpgradeType.a_ut_id === item.a_ut_id)
                        .forEach(aUpgradeType => {
                            const existingUpgrade = aUpgrades.find(upgrade => upgrade[0] === aUpgradeType.a_upgrade_id);
                            if (!existingUpgrade) {
                                const aUpgradesRules = [];
                                const aUpgradesKeywords = [];
                                armyData
                                    .filter(aUpgrade => aUpgrade.a_upgrade_id === aUpgradeType.a_upgrade_id)
                                    .forEach(aUpgrade => {

                                        const upgradeRuleId = aUpgrade.a_upgrade_rule_id;
                                        if (upgradeRuleId !== null && !aUpgradesRules.some(rule => rule[0] === upgradeRuleId)) {
                                            aUpgradesRules.push([upgradeRuleId]);
                                        }

                                        const upgradeKeywordId = aUpgrade.a_upgrade_keyword_id;
                                        if (upgradeKeywordId !== null && !aUpgradesKeywords.some(keyword => keyword[0] === upgradeKeywordId)) {
                                            aUpgradesKeywords.push([upgradeKeywordId]);
                                        }
                                    });

                                aUpgrades.push([
                                    aUpgradeType.a_upgrade_id,
                                    aUpgradeType.a_upgrade_pc, 
                                    aUpgradeType.a_upgrade_name,
                                    aUpgradesRules,
                                    aUpgradesKeywords
                                ]);
                            }
                        });

                    aUpgradeTypes.push([
                        item.a_ut_id,
                        item.a_ut_name, 
                        item.a_ut_min, 
                        item.a_ut_max, 
                        item.a_ut_limit_per_army,
                        aUpgrades
                    ]);
                }
            }
            if (item.intersection !== ' - ' && !intersections.some(intersection => intersection[0] === item.intersection)) {
                intersections.push([item.intersection]);
            }

        });

        nestedArray.push(aUnits);
        nestedArray.push(aUpgradeTypes);
        // console.log('TEST', aUpgradeTypes)
        nestedArray.push(intersections);
    
        nestedArrays.push(nestedArray);
    });
    return nestedArrays;
}

/**
 * Fetches army data from the server.
 * @returns {Promise<Array<Array<any>>>} A promise that resolves to organized army data.
 */
export async function GetArmy() {
    try {        
        const response = await fetch(`http://localhost:4000/army`, {
            method: "GET"
        });

        const responseData = await response.json();
        return organizeArmy(responseData);
    } catch (err) {
        console.error("Error fetching data:", err);
        throw err; 
    }
}

/**
 * Organizes army list data into nested arrays based on unique identifiers.
 * @param {Array<any>} data - The army list data to organize.
 * @returns {Array<Array<any>>} Nested arrays representing organized army list data.
 */
function organizeAL(data) { // issue  with incerting nulls // missing supertype
    
    if (!Array.isArray(data)) {
        console.error('Input data is not an array');
        return [];
    }
  
    const nestedArrays = [];
    const uniqueArmyListIds = [...new Set(data.map(item => item.army_list_id))];
  
    uniqueArmyListIds.forEach(listId => {
        const nestedArray = [];
        const listData = data.filter(item => item.army_list_id === listId);
        nestedArray.push(listId); 
        nestedArray.push(listData[0].game_system_id); 
        nestedArray.push(listData[0].gs_gm_id); 
        nestedArray.push(listData[0]. army_list_name); 
    
        let totalPointCost = 0;
        const forces = [];

        listData.forEach(item => {
            if (!forces.some(force => force[0] === item.al_force_id)) {
                let totalForceCost = 0;
                const alUnits = [];
                listData
                    .filter(force => force.al_force_id === item.al_force_id)
                    .forEach(alUnit => {
                        if (!alUnits.some(unit => unit[0] === alUnit.al_unit_id)) {
                            let totalUnitCost = 0;
                            const aStatlines = [];
                            listData
                                .filter(unit => unit.al_unit_id === alUnit.al_unit_id)
                                .forEach(aStatline => {
                                    if (!aStatlines.some(statline => statline[0] === aStatline.a_statline_id)) {
                                        const statlineCost = (aStatline.quantity - aStatline.a_statline_min) * aStatline.a_statline_point_cost;
                                        totalUnitCost = totalUnitCost + statlineCost;
                                        aStatlines.push([
                                            aStatline.a_statline_id,
                                            aStatline.quantity,
                                            aStatline.a_statline_min,
                                            aStatline.a_statline_max,
                                            aStatline.a_statline_point_cost,
                                            aStatline.a_statline_name,
                                            statlineCost
                                        ])
                                    }
                                });
                            const alUpgrades = [];
                            listData
                                .filter(unit => unit.al_unit_id === alUnit.al_unit_id)
                                .forEach(alUpgrade => {
                                    if (!alUpgrades.some(upgrade => upgrade[0] === alUpgrade.al_upgrade_id)){
                                        totalUnitCost = totalUnitCost + alUpgrade.a_upgrade_pc
                                        alUpgrades.push([
                                            alUpgrade.al_upgrade_id,
                                            alUpgrade.a_upgrade_id,
                                            alUpgrade.a_ut_id,
                                            alUpgrade.a_upgrade_name,
                                            alUpgrade.a_upgrade_pc
                                        ]);
                                    }
                                })
                            totalUnitCost = totalUnitCost + alUnit.a_unit_pc;
                            totalForceCost = totalForceCost + totalUnitCost;
                            alUnits.push([
                                alUnit.al_unit_id,
                                alUnit.al_unit_name,
                                alUnit.al_unit_color,
                                alUnit.a_unit_name,
                                alUnit.a_unit_pc,
                                alUnit.a_unit_limit_per_army,
                                alUnit.gs_supertype_id,
                                totalUnitCost,
                                aStatlines,
                                alUpgrades,
                                alUnit.a_unit_id,
                            ]); // check aUnitId hasnt caused any errors
                        }
                    });
                totalPointCost = totalPointCost + totalForceCost;
                forces.push([
                    item.al_force_id,
                    item.army_id,
                    item.army_name,
                    item.army_edition,
                    item.army_version,
                    totalForceCost,
                    alUnits
                ]);
            }
        })
        nestedArray.push(totalPointCost);
        nestedArray.push(forces);
    
        nestedArrays.push(nestedArray);
    });
    return nestedArrays;
};


/**
 * Fetches army list data from the server.
 * @returns {Promise<Array<Array<any>>>} A promise that resolves to organized army list data.
 */
export async function GetArmyList() { // may have to update army_list get request
    try {        
        const response = await fetch(`http://localhost:4000/army_list`, {
            method: "GET"
        });

        const responseData = await response.json();

        // console.log(organizeAL(responseData));

        return organizeAL(responseData);
    } catch (err) {
        console.error("Error fetching data:", err);
        throw err; 
    }
}


export default (GetGameSystems, GetArmy, GetArmyList);