import React, { useState, useEffect } from 'react';

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

            const response = await fetch(`http://localhost:4000/army/${gameSystem[0]}`, {
                method: "GET"
            });

            const responseData = await response.json();
            // console.log(organizeData(responseData));

            setNestedData(organizeData(responseData));
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    }


    useEffect(() => {
        getArmyList();
    }, [getArmyList]);

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
