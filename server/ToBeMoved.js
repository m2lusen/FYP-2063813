const { raw } = require("express");
const pool = require("./database");

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
 * Processes raw data from a database query and creates an array of valid entries based on a given data array.
 * @param {Array<Object>} rawData - The raw data obtained from the database query.
 * @param {Array<string>} dataArray - An array containing the keys of the data fields to be extracted from the raw data.
 * @returns {Array<Array<any>>} Returns an array containing processed data entries based on the specified data array.
 */
function createArrayFromDB(rawData, dataArray) {
    let proccessedData = [];
    for (let i = 0; i < rawData.length; i++) {
        let entry = [];
        let isValid = true;
        for (let j = 0; j < dataArray.length; j++) {
            let value = rawData[i][dataArray[j]];
            if (value === null) {
                isValid = false;
                break;
            }
            entry.push(value);
        }
        if (isValid && !checkIfStatUsed(proccessedData, entry[0])) {
            proccessedData.push(entry);
        }
    }
    return proccessedData ;
}

/**
 * Creates an object from raw data obtained from a database query based on specified data array.
 * @param {Array<Array>} rawData - The raw data obtained from the database query.
 * @param {Array<string>} dataArray - An array specifying the columns to be included in the object.
 * @returns {Object} Returns an object organized based on the specified data array.
 */
function createObjFromDB(rawData, dataArray) {
    let Obj = {};
    let processedData = createArrayFromDB(rawData, dataArray);

    for (let i = 0; i < processedData.length; i++) {
        let ObjName = processedData[i][processedData[i].length-1];

        let elements = [];
        for (let j = 0; j < processedData[i].length-1; j++) {
            elements.push(processedData[i][j]);
        }

        if (!Obj[ObjName]) {
            Obj[ObjName] = [];
        }

        Obj[ObjName].push(elements);
    }

    return Obj;
}


function createUnitObj(rawData, Obj) {
    let unitName = rawData[0].a_unit_name;
    let pointCost = rawData[0].a_unit_pc;
    let supertype = rawData[0].gs_supertype_name;

    let keywords = createArrayFromDB(rawData, ['keyword_name']);
    let rules = createArrayFromDB(rawData, ['rule_name', 'rule_description']);

    let statblock = createObjFromDB(rawData, ['gs_stat_acronyme', 'stat_value', 'a_statline_name']); 
    let upgrades = createObjFromDB(rawData, ['a_upgrade_name', 'a_upgrade_pc', 'a_ut_name']); // Temporary line, in future post to db query for a_upgrade, and then use createUpgradeObj to process this

    Obj[unitName] = [unitName, pointCost, supertype, statblock, keywords, upgrades, rules];

    return Obj;
}

function createUpgradeObj(rawData, Obj) {
    let upgradeName = rawData[0].a_upgrade_name;
    let upgradePC = rawData[0].a_upgrade_pc;
    let minimum = rawData[0].a_ut_min;
    let maximum = rawData[0].a_ut_max;
    let limitPerArmy = rawData[0].a_ut_limit_per_army;

    let keywords = createArrayFromDB(rawData, ['keyword_name']);

    let rules = createArrayFromDB(rawData, ['rule_name', 'rule_description']);

    Obj[upgradeName] = [upgradeName, upgradePC, minimum, maximum, limitPerArmy, keywords, rules];

    return Obj;
}

// Records all points per unit, returns an Obj
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

function calculateTotalPointCost(points){ // modify so that it can work for all in supertype, all in force, all in army 
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

function organizeAL(data) {
    
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
    
        const forces = [];

        listData.forEach(item => {
            if (!forces.some(force => force[0] === item.al_force_id)) {
                forces.push([
                    item.al_force_id,
                    item.army_id,
                    item.army_name,
                    item.army_edition,
                    item.army_version
                ]);
            }
        //     if (!gsSupertypes.some(supertype => supertype[0] === item.gs_supertype_id)) {
        //         gsSupertypes.push([item.gs_supertype_id, item.gs_supertype_name, item.gs_supertype_lower]);
        //     }
        //     if (!rules.some(rule => rule[0] === item.rule_id)) {
        //         // Create a nested array for keywords within each rule array
        //         const keywords = [];
        //         systemData
        //             .filter(rule => rule.rule_id === item.rule_id)
        //             .forEach(keyword => {
        //                 // Check if the keyword is unique before pushing it
        //                 if (!keywords.some(k => k[0] === keyword.keyword_id)) {
        //                     keywords.push([keyword.keyword_id, keyword.keyword_name]);
        //                 }
        //             });
        //         rules.push([
        //             item.rule_id,
        //             item.rule_name,
        //             item.rule_description,
        //             keywords
        //         ]);
        //     }
        //     if (!gsGameModes.some(gameMode => gameMode[0] === item.gs_gm_id)) {
        //         gsGameModes.push([item.gs_gm_id, item.gs_gm_name, item.gs_gm_point_upper, item.gs_gm_point_lower]);
        //     }
        });

        nestedArray.push(forces);
    
        nestedArrays.push(nestedArray);
    });
    return nestedArrays;
}


const dbQuery = `

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

LEFT JOIN al_unit_a_unit_a_statline_quantity ON al_unit.al_unit_id = al_unit_a_unit_a_statline_quantity.al_unit_id
LEFT JOIN a_unit_a_statline ON al_unit_a_unit_a_statline_quantity.a_statline_id = a_unit_a_statline.a_statline_id AND al_unit_a_unit_a_statline_quantity.a_unit_id = a_unit_a_statline.a_unit_id
LEFT JOIN a_statline ON al_unit_a_unit_a_statline_quantity.a_statline_id = a_statline.a_statline_id
;
`;
// dbQuery becomes wharever PSQL code needs to be executed


pool.query(dbQuery).then((response) => {
    // console.log(response.rows);
    // console.log(calculatePoints(response.rows))
    // console.log(calculateUnitPointCost(calculatePoints(response.rows), 1))
    // console.log(calculateTotalPointCost(calculatePoints(response.rows)))
    // console.log(createArmyList(response.rows));
    console.log(organizeAL(response.rows));
}).catch((err) => {
    console.log(err);
});



module.exports = pool;

// RETURN TOO - Issue with the query for army list where  mohawk warriors at cost 13 and cost 10  when mohawk warrior picked up
