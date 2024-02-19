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
            console.log(elements)
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


const dbQuery = `

SELECT
*
FROM a_upgrade
JOIN a_upgrade_type ON a_upgrade.a_ut_id = a_upgrade_type.a_ut_id 

LEFT JOIN keyword_a_upgrade ON a_upgrade.a_upgrade_id = keyword_a_upgrade.a_upgrade_id
LEFT JOIN keyword ON keyword_a_upgrade.keyword_id = keyword.keyword_id

LEFT JOIN rule_a_upgrade ON a_upgrade.a_upgrade_id = rule_a_upgrade.a_upgrade_id
LEFT JOIN rule ON rule_a_upgrade.rule_id = rule.rule_id

WHERE
a_upgrade.a_upgrade_id = 1
;



`;
// dbQuery becomes wharever PSQL code needs to be executed

pool.query(dbQuery).then((response) => {
    console.log(response.rows);
    console.log(createUpgradeObj(response.rows, {}));
}).catch((err) => {
    console.log(err);
});

module.exports = pool;