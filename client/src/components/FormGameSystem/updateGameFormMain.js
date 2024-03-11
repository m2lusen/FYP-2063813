import React, { useState, useEffect } from 'react';

function organizeData(data) {
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
    
        const uniqueGsStatIds = [...new Set(systemData.map(item => item.gs_stat_id))];
        nestedArray.push(uniqueGsStatIds);
    
        const uniqueGsSupertypeIds = [...new Set(systemData.map(item => item.gs_supertype_id))];
        nestedArray.push(uniqueGsSupertypeIds); 
    
        const uniqueRuleIds = [...new Set(systemData.map(item => item.rule_id))];
        const ruleKeywordPairs = uniqueRuleIds.map(ruleId => {
            const keywordIds = [...new Set(systemData.filter(item => item.rule_id === ruleId).map(item => item.keyword_id))];
            return [ruleId, keywordIds];
        });
        nestedArray.push(ruleKeywordPairs); 
    
        nestedArrays.push(nestedArray);
    });
  
    return nestedArrays;
}


// function ExistingGameSystems() {
//     const [nestedData, setNestedData] = useState(null);

//     const getArmyList = async () => {
//         try {
//             const body = {
//                 "sql": "SELECT game_system.game_system_id, game_system_name, game_system_edition, game_system_version, gs_unit_structure.gs_us_id, gs_stat_id, gs_supertype_id, keyword.keyword_id, rule.rule_id FROM game_system JOIN gs_unit_structure ON game_system.game_system_id = gs_unit_structure.game_system_id JOIN gs_stat ON gs_unit_structure.gs_us_id = gs_stat.gs_us_id JOIN gs_supertype ON game_system.game_system_id = gs_supertype.game_system_id JOIN rule ON game_system.game_system_id = rule.game_system_id JOIN keyword_rule ON rule.rule_id = keyword_rule.rule_id JOIN keyword ON keyword_rule.keyword_id = keyword.keyword_id ;"
//             };
//             const response = await fetch("http://localhost:4000/rawSQL", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(body)
//             });

//             const jsonData = await response.json();

//             setNestedData(organizeData(jsonData));
//         } catch (err) {
//             console.error("Error fetching data:", err);
//         }
//     }

//     useEffect(() => {
//         getArmyList();
//     }, []);

//     const handleClick = (nestedArray) => {
//         console.log(nestedArray);
//     }

//     return (
//         <div>
//             <h2>Update Existing Game System</h2>
//             {nestedData && nestedData.map((nestedArray, index) => (
//                 <button key={index} onClick={() => handleClick(nestedArray)}>
//                     {nestedArray[1]} - {nestedArray[2]} - {nestedArray[3]}
//                 </button>
//             ))}
//         </div>
//     );
// }

// export default ExistingGameSystems;

// import React, { useState, useEffect } from 'react';
// import GameSystemForm from './sub-components/gameSystemForm';

function ExistingGameSystems({ handleClick }) {
    const [nestedData, setNestedData] = useState(null);

    const getArmyList = async () => {
        try {
            const body = {
                "sql": "SELECT game_system.game_system_id, game_system_name, game_system_edition, game_system_version, gs_unit_structure.gs_us_id, gs_stat_id, gs_supertype_id, keyword.keyword_id, rule.rule_id FROM game_system JOIN gs_unit_structure ON game_system.game_system_id = gs_unit_structure.game_system_id JOIN gs_stat ON gs_unit_structure.gs_us_id = gs_stat.gs_us_id JOIN gs_supertype ON game_system.game_system_id = gs_supertype.game_system_id JOIN rule ON game_system.game_system_id = rule.game_system_id JOIN keyword_rule ON rule.rule_id = keyword_rule.rule_id JOIN keyword ON keyword_rule.keyword_id = keyword.keyword_id ;"
            };
            const response = await fetch("http://localhost:4000/rawSQL", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
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
            <h2>Update Existing Game System</h2>
            {nestedData && nestedData.map((nestedArray, index) => (
                <button key={index} onClick={() => handleClick(nestedArray)}>
                    {nestedArray[1]} - {nestedArray[2]} - {nestedArray[3]}
                </button>
            ))}
        </div>
    );
}

export default ExistingGameSystems;
