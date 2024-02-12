const { raw } = require("express");

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

// rework function so that a variable amount of elements can be included (not just 2)
function createObjFromDB(rawData, dataArray) {
    let Obj = {};
    let processedData = createArrayFromDB(rawData, dataArray);

    for (let i = 0; i < processedData.length; i++) {
        let ObjName = processedData[i][2];
        let el1 = processedData[i][0];
        let el2 = processedData[i][1];

        if (!Obj[ObjName]) {
            Obj[ObjName] = [];
        }

        Obj[ObjName].push([el1, el2]);
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
    let upgrades = createObjFromDB(rawData, ['a_upgrade_name', 'a_upgrade_pc', 'a_ut_name']);

    Obj[unitName] = [unitName, pointCost, supertype, statblock, keywords, upgrades, rules];

    return Obj;
}