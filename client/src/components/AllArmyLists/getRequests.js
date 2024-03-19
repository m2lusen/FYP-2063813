import React, { Fragment, useState, useEffect} from 'react';

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
                gsSupertypes.push([item.gs_supertype_id, item.gs_supertype_name, item.gs_supertype_lower]);
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
        nestedArray.push(intersections);
    
        nestedArrays.push(nestedArray);
    });
    return nestedArrays;
}

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


function calculatePoints(rawData) {
    const uniqueUnits = {};

    rawData.forEach((item) => {
        const { al_unit_id, al_upgrade_id, a_upgrade_id, a_unit_id, a_statline_id, quantity, a_statline_min, a_statline_point_cost, a_upgrade_pc } = item;

        if (!uniqueUnits[al_unit_id]) {
            uniqueUnits[al_unit_id] = [al_unit_id, a_unit_id, item.a_unit_pc, [], []];
        }

        const upgradeKey = `${al_upgrade_id}_${a_upgrade_id}`;
        if(al_upgrade_id !== null){
            if (!uniqueUnits[al_unit_id][3][upgradeKey]) {
                uniqueUnits[al_unit_id][3][upgradeKey] = a_upgrade_pc;
            }
        }

        const statlineKey = `${al_unit_id}_${a_unit_id}_${a_statline_id}`;
        if (!uniqueUnits[al_unit_id][4][statlineKey]) {
            uniqueUnits[al_unit_id][4][statlineKey] = (quantity - a_statline_min) * a_statline_point_cost;
        }
    });

    return uniqueUnits;
}

function calculateUnitPointCost(points, al_unit_id){
    const arr = points[al_unit_id];

    let sum = arr[2];

    for (const key in arr[3]) {
        sum += arr[3][key];
    }
    for (const key in arr[4]) {
        sum += arr[4][key];
    }

    return sum;
}

function calculateTotalPointCost(points){
    let sum = 0;

    for (const al_unit_id in points) {
        sum = sum + calculateUnitPointCost(points, al_unit_id);
    }

    return sum;
}

function createArrayFromDBWithoutCheck(rawData, dataArray) {
    let proccessedData = [];
    for (let i = 0; i < rawData.length; i++) {
        let entry = [];
        for (let j = 0; j < dataArray.length; j++) {
            let value = rawData[i][dataArray[j]];

            entry.push(value);
        }
        if (!checkIfStatUsed(proccessedData, entry[0])) {
            proccessedData.push(entry);
        }
    }
    return proccessedData ;
}

function createObjFromDBWithoutCheck(rawData, dataArray) {
    let Obj = {};
    let processedData = createArrayFromDBWithoutCheck(rawData, dataArray);

    for (let i = 0; i < processedData.length; i++) {
        let ObjName = processedData[i][processedData[i].length-1];

        let elements = [];
        for (let j = 0; j < processedData[i].length; j++) {
            elements.push(processedData[i][j]);
        }

        if (!Obj[ObjName]) {
            Obj[ObjName] = [];
        }

        Obj[ObjName].push(elements);
    }

    return Obj;
}


function createAlUnit(rawData) {
    let arr = createArrayFromDBWithoutCheck(rawData, ['al_unit_id', 'al_unit_name', 'al_unit_color', 'a_unit_name', 'a_unit_pc', 'a_unit_limit_per_army']);

    const uniqueAlUnitIds = [...new Set(rawData.map(item => item.al_unit_id))];
    const subsets = uniqueAlUnitIds.map(al_unit_id => rawData.filter(item => item.al_unit_id === al_unit_id));
    subsets.forEach((item, index) => {
        arr[index].push(createObjFromDBWithoutCheck(item, ['a_upgrade_id', 'a_ut_id', 'a_upgrade_pc', 'a_upgrade_name']))
        arr[index].push(createObjFromDBWithoutCheck(item, ['a_statline_id', 'quantity', 'a_statline_min', 'a_statline_max', 'a_statline_point_cost', 'a_statline_name']))
    })
    return arr;
}

function createSupertype(rawData) {
    let arr = createArrayFromDBWithoutCheck(rawData, ['gs_supertype_id'])// SUPERTYPE

    const uniqueSupertypeIds = [...new Set(rawData.map(item => item.gs_supertype_id))];
    const subsets = uniqueSupertypeIds.map(gs_supertype_id => rawData.filter(item => item.gs_supertype_id === gs_supertype_id));
    subsets.forEach((item, index) => {
        arr[index].push(createAlUnit(item));
    })

    return arr;
}

function createForce(rawData) {
    let arr = createArrayFromDBWithoutCheck(rawData, ['al_force_id', 'army_id', 'army_name', 'army_edition', 'army_version'])// FORCE

    const uniqueForceIds = [...new Set(rawData.map(item => item.al_force_id))];
    const subsets = uniqueForceIds.map(al_force_id => rawData.filter(item => item.al_force_id === al_force_id));
    subsets.forEach((item, index) => {
        arr[index].push(createSupertype(item));
    })
    
    return arr;
}

function createArmyList(rawData) {
    let arr = createArrayFromDBWithoutCheck(rawData, ['army_list_id', 'game_system_id', 'gs_gm_id', 'army_list_name'])
    const uniqueArmyIds = [...new Set(rawData.map(item => item.army_list_id))];
    const subsets = uniqueArmyIds.map(army_list_id => rawData.filter(item => item.army_list_id === army_list_id));
    subsets.forEach((item, index) => {
        arr[index].push(calculateTotalPointCost(calculatePoints(item)));
        arr[index].push(createForce(item));
    })
    
    return arr;
}

// REWRITE ORGANISE DATA FOR

export async function GetArmyList() { // may have to update army_list get request
    try {        
        const response = await fetch(`http://localhost:4000/army_list`, {
            method: "GET"
        });

        const responseData = await response.json();

        return createArmyList(responseData);
    } catch (err) {
        console.error("Error fetching data:", err);
        throw err; 
    }
}


export default (GetGameSystems, GetArmy, GetArmyList);