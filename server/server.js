const {Pool} = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "meggymoo",
    host: "localhost",
    port: 5432,
    database: "fyp_db_1"
})



const dbQuery = `

SELECT
*
FROM a_unit
JOIN a_unit_a_statline ON a_unit.a_unit_id = a_unit_a_statline.a_unit_id
JOIN a_statline ON a_unit_a_statline.a_statline_id = a_statline.a_statline_id
JOIN a_statline_gs_stat ON a_statline.a_statline_id = a_statline_gs_stat.a_statline_id
JOIN gs_stat ON a_statline_gs_stat.gs_stat_id = gs_stat.gs_stat_id

JOIN gs_supertype ON a_unit.gs_supertype_id = gs_supertype.gs_supertype_id

JOIN a_unit_a_upgrade ON a_unit.a_unit_id = a_unit_a_upgrade.a_unit_id
JOIN a_upgrade ON a_unit_a_upgrade.a_upgrade_id = a_upgrade.a_upgrade_id
JOIN a_upgrade_type ON a_upgrade.a_ut_id = a_upgrade_type.a_ut_id 

LEFT JOIN keyword_a_unit ON a_unit.a_unit_id = keyword_a_unit.a_unit_id
LEFT JOIN keyword ON keyword_a_unit.keyword_id = keyword.keyword_id

LEFT JOIN rule_a_unit ON a_unit.a_unit_id = rule_a_unit.a_unit_id
LEFT JOIN rule ON rule_a_unit.rule_id = rule.rule_id

WHERE
a_unit.a_unit_name = 'Wendigo'
;

;
`;

function createArrayFromDB(rawData, dataArray) {
    let statblock = [];
    for (let i = 0; i < rawData.length; i++) {
        let entry = [];
        let isValid = true; // Flag to track if all values are valid
        for (let j = 0; j < dataArray.length; j++) {
            let value = rawData[i][dataArray[j]];
            if (value === null) {
                isValid = false; // Mark entry as invalid if any value is null
                break; // Exit loop if null value found
            }
            entry.push(value);
        }
        if (isValid && !checkIfStatUsed(statblock, entry[0])) {
            statblock.push(entry);
        }
    }
    return statblock;
}


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

function checkIfStatUsed(statblock, acronyme) {
    for (let i = 0; i < statblock.length; i++) {
        if (statblock[i][0] === acronyme) {
            return true; 
        }
    }
    return false;
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



pool.query(dbQuery).then((response) => {
    // console.log(response);
    console.log(response.rows);
    console.log(createUnitObj(response.rows, {}));
}).catch((err) => {
    console.log(err);
})
// fyp_db_1

module.exports = pool;



