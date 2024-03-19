import React, { useState, useEffect } from 'react';

function organizeData(data) { // there is a issue with the following function, or possibly with the query
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
            if (!gsGameModes.some(gameMode => gameMode[0] === item.gs_gm_id)) {
                console.log(item.gs_gm_id)
                gsGameModes.push([item.gs_gm_id, item.gs_gm_name, item.gs_gm_point_upper, item.gs_gm_point_lower]);
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
        });

        nestedArray.push(gsStats);
        nestedArray.push(gsSupertypes);
        nestedArray.push(rules);
        nestedArray.push(gsGameModes);
    
        nestedArrays.push(nestedArray);
    });
    return nestedArrays;
}



function ExistingGameSystems({ handleClick }) {
    const [nestedData, setNestedData] = useState(null);

    const getArmyList = async () => {
        try {
            // const body = { // rawSQL used to determine code, should be done remove
            //     "sql": "SELECT game_system.game_system_id, game_system_name, game_system_edition, game_system_version, gs_unit_structure.gs_us_id, gs_stat_id, gs_stat_name, gs_stat_acronyme, gs_supertype_id, gs_supertype_name, gs_supertype_lower, keyword.keyword_id, keyword_name, rule.rule_id, rule_name, rule_description FROM game_system LEFT JOIN gs_unit_structure ON game_system.game_system_id = gs_unit_structure.game_system_id LEFT JOIN gs_stat ON gs_unit_structure.gs_us_id = gs_stat.gs_us_id LEFT JOIN gs_supertype ON game_system.game_system_id = gs_supertype.game_system_id LEFT JOIN rule ON game_system.game_system_id = rule.game_system_id LEFT JOIN keyword_rule ON rule.rule_id = keyword_rule.rule_id LEFT JOIN keyword ON keyword_rule.keyword_id = keyword.keyword_id ;"
            //     // "sql": "SELECT game_system.game_system_id, game_system_name, game_system_edition, game_system_version, gs_unit_structure.gs_us_id, gs_stat_id, gs_supertype_id, keyword.keyword_id, rule.rule_id FROM game_system JOIN gs_unit_structure ON game_system.game_system_id = gs_unit_structure.game_system_id JOIN gs_stat ON gs_unit_structure.gs_us_id = gs_stat.gs_us_id JOIN gs_supertype ON game_system.game_system_id = gs_supertype.game_system_id JOIN rule ON game_system.game_system_id = rule.game_system_id JOIN keyword_rule ON rule.rule_id = keyword_rule.rule_id JOIN keyword ON keyword_rule.keyword_id = keyword.keyword_id ;"
            // };
            // const response = await fetch("http://localhost:4000/rawSQL", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(body)
            // });

            const response = await fetch("http://localhost:4000/game_system", {
                method: "GET"
            });

            const jsonData = await response.json();
            setNestedData(organizeData(jsonData));
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
                <h2>Update Existing Game System</h2>
                {nestedData && nestedData.map((nestedArray, index) => (
                    <button key={index} onClick={() => handleClick(nestedArray)}>
                        {nestedArray[1]} - {nestedArray[2]} - {nestedArray[3]}
                    </button>
                ))}
            </div>
        </div>

    );
}

export default ExistingGameSystems;