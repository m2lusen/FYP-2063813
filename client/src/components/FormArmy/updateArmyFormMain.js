import React, { useState, useEffect } from 'react';

// function organizeData(data) {
//     if (!Array.isArray(data)) {
//         console.error('Input data is not an array');
//         return [];
//     }
  
//     const nestedArrays = [];
//     const uniqueArmyId = [...new Set(data.map(item => item.army_id))];
  
//     uniqueArmyId.forEach(armyId => {
//         const nestedArray = [];
//         const armyData = data.filter(item => item.army_id === armyId);
//         nestedArray.push(armyId); 
//         nestedArray.push(armyData[0].army_name); 
//         nestedArray.push(armyData[0].army_edition); 
//         nestedArray.push(armyData[0].army_version); 

//         const aUnits = [];
//         const aUpgradeTypes = [];

//         armyData.forEach(item => {            
//             if (!aUnits.some(aUnit => aUnit[0] === item.a_unit_id)) {
//                 const aUnitRules = [];
//                 const aUnitKeywords = [];
//                 const aUnitStatlines = [];

//                 armyData
//                     .filter(aUnit => aUnit.a_unit_id === item.a_unit_id)
//                     .forEach(aUnit => {
//                         const ruleId = aUnit.a_unit_rule_id;
//                         if (!aUnitRules.some(rule => rule[0] === ruleId)) {
//                             aUnitRules.push([ruleId]);
//                         }

//                         const keywordId = aUnit.a_unit_keyword_id;
//                         if (!aUnitKeywords.some(keyword => keyword[0] === keywordId)) {
//                             aUnitKeywords.push([keywordId]);
//                         }

//                         const statlineId = aUnit.a_statline_id;
//                         if (!aUnitStatlines.some(statline => statline[0] === statlineId)) {
//                             const aUnitGsStats = [];
//                             armyData
//                                 .filter(aUnitStat => aUnitStat.a_statline_id === statlineId)
//                                 .forEach(aUnitStat => {
//                                     const gsStatId = aUnitStat.gs_stat_id;
//                                     if (!aUnitGsStats.some(stat => stat[0] === gsStatId)) {
//                                         aUnitGsStats.push([gsStatId, aUnitStat.stat_value]);
//                                     }
//                                 });

//                             aUnitStatlines.push([
//                                 statlineId, 
//                                 [aUnit.a_statline_name],
//                                 aUnit.a_statline_min, 
//                                 aUnit.a_statline_max, 
//                                 aUnit.a_statline_point_cost,
//                                 aUnitGsStats
//                             ]);
//                         }
//                     });

//                 aUnits.push([
//                     item.a_unit_id, 
//                     item.gs_supertype_id, 
//                     item.a_unit_name, 
//                     item.a_unit_pc, 
//                     item.a_unit_limit_per_army, 
//                     aUnitRules,
//                     aUnitKeywords,
//                     aUnitStatlines
//                 ]);
//             }
//             if (item.a_ut_id !== null){
//                 if (!aUpgradeTypes.some(aUpgradeType => aUpgradeType[0] === item.a_ut_id)) {
                    
//                     const aUpgrades = [];

//                     armyData
//                         .filter(aUpgradeType => aUpgradeType.a_ut_id === item.a_ut_id)
//                         .forEach(aUpgradeType => {
//                             const aUpgradeId = aUpgradeType.a_upgrade_id;
//                             if (!aUpgrades.some(upgrade => upgrade[0] === aUpgradeId)) {
//                                 aUpgrades.push([
//                                     aUpgradeId,
//                                     item.a_ut_id, 
//                                     item.a_upgrade_pc, 
//                                     item.a_upgrade_name 
//                                 ]);
//                             }

//                     });

//                     aUpgradeTypes.push([
//                         item.a_ut_id,
//                         item.a_ut_name, 
//                         item.a_ut_min, 
//                         item.a_ut_max, 
//                         item.a_ut_limit_per_army,
//                         aUpgrades
//                     ]);
//                 }                
//             }
//         });

//         nestedArray.push(aUnits);
//         nestedArray.push(aUpgradeTypes);
    
//         nestedArrays.push(nestedArray);
//     });
//     return nestedArrays;
// }

function organizeData(data) {
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
                                        if (!aUpgradesRules.some(rule => rule[0] === upgradeRuleId)) {
                                            aUpgradesRules.push([upgradeRuleId]);
                                        }
                                        
                                        const upgradeKeywordId = aUpgrade.a_upgrade_keyword_id;
                                        if (!aUpgradesKeywords.some(keyword => keyword[0] === upgradeKeywordId)) {
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
            if (!intersections.some(intersection => intersection[0] === item.intersection)) {
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



function ExistingArmies({ gameSystem, handleClick }) {
    const [nestedData, setNestedData] = useState(null);



    const getArmyList = async () => {
        try {

            const body = { // rawSQL used to determine code, should be done remove
                "sql": `
                SELECT 
                army.army_id, army_name, army_edition, army_version,
                a_unit.a_unit_id, gs_supertype_id, a_unit_name, a_unit_pc, a_unit_limit_per_army,
                rule_a_unit.rule_id AS a_unit_rule_id,
                keyword_a_unit.keyword_id AS a_unit_keyword_id,
                a_statline.a_statline_id, a_statline_name,
                a_statline_min, a_statline_max, a_statline_point_cost,
                gs_stat_id, stat_value,

                CONCAT(a_unit_a_upgrade.a_unit_id, ' - ', a_unit_a_upgrade.a_upgrade_id) AS intersection,

                a_upgrade.a_upgrade_id, a_upgrade.a_ut_id, a_upgrade_pc, a_upgrade_name,
                a_ut_name, a_ut_min, a_ut_max, a_ut_limit_per_army,
                rule_a_upgrade.rule_id AS a_upgrade_rule_id,
                keyword_a_upgrade.keyword_id AS a_upgrade_keyword_id
                
                FROM army
                LEFT JOIN a_unit ON army.army_id = a_unit.army_id
                LEFT JOIN rule_a_unit ON a_unit.a_unit_id = rule_a_unit.a_unit_id
                LEFT JOIN keyword_a_unit ON a_unit.a_unit_id = keyword_a_unit.a_unit_id
                LEFT JOIN a_unit_a_statline ON a_unit.a_unit_id = a_unit_a_statline.a_unit_id
                LEFT JOIN a_statline ON a_unit_a_statline.a_statline_id = a_statline.a_statline_id
                LEFT JOIN a_statline_gs_stat ON a_statline.a_statline_id = a_statline_gs_stat.a_statline_id

                LEFT JOIN a_unit_a_upgrade ON a_unit.a_unit_id = a_unit_a_upgrade.a_unit_id

                LEFT JOIN a_upgrade ON a_unit_a_upgrade.a_upgrade_id = a_upgrade.a_upgrade_id
                LEFT JOIN a_upgrade_type ON a_upgrade.a_ut_id = a_upgrade_type.a_ut_id
                LEFT JOIN rule_a_upgrade ON a_upgrade.a_upgrade_id = rule_a_upgrade.a_upgrade_id
                LEFT JOIN keyword_a_upgrade ON a_upgrade.a_upgrade_id = keyword_a_upgrade.a_upgrade_id

                WHERE
                game_system_id = ${gameSystem[0]}
                ;
                `
            };
            const response = await fetch("http://localhost:4000/rawSQL", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const responseData = await response.json();
            console.log(organizeData(responseData));

            setNestedData(organizeData(responseData));
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    }


    useEffect(() => {
        getArmyList();
    }, []);

    return (
        <div>
            <div>
                <h2>Choose an Existing Army</h2>
                {nestedData && nestedData.map((nestedArray, index) => (
                    <button key={index} onClick={() => handleClick(nestedArray)}>
                        {nestedArray[1]} - {nestedArray[2]} - {nestedArray[3]}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ExistingArmies;
