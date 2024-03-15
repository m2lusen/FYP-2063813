import React, { useState, useEffect } from "react";
import AUnitAUpgradeForm from "./aUnitAUpgradeForm";

function organizeData(data) {
    if (!Array.isArray(data)) {
        console.error('Input data is not an array');
        return [];
    }
  
    const nestedArrays = [];
    const uniqueUnitIds = [...new Set(data.map(item => item.a_unit_id))];
  
    uniqueUnitIds.forEach(unitId => {
        const nestedArray = [];
        const specificData = data.filter(item => item.a_unit_id === unitId);
        nestedArray.push(unitId); 
        nestedArray.push(specificData[0].a_unit_name); 

        nestedArrays.push(nestedArray);
    });
    return nestedArrays;
}

const AUnitAUpgradeMain = ({ gameSystem, armyId, aUpgradeId }) => { // Does not update aUnits on reload
    
    const [aUnits, setAUnits] = useState([]);

    const [numAUnitAUpgradeForms, setNumAUnitAUpgradeForms] = useState(1);

    // useEffect(() => { 
    //     const getAUnitList = async () => {
    //         try {
    //             const body = {
    //                 "sql": `SELECT a_unit_id, a_unit_name FROM army JOIN a_unit ON army.army_id = a_unit.army_id WHERE army.army_id = ${armyId};`
    //             };
    //             console.log(body)
    //             const response = await fetch("http://localhost:4000/rawSQL", {
    //                 method: "POST",
    //                 headers: { "Content-Type": "application/json" },
    //                 body: JSON.stringify(body)
    //             });

    //             const responseData = await response.json();
    //             setAUnits(organizeData(responseData));
                
    //             console.log(organizeData(responseData));
    //         } catch (err) {
    //             console.error("Error fetching data:", err);
    //         }
    //     };

    //     getAUnitList(); 
    // }, [armyId, aUpgradeId]); 

    useEffect(() => { 
        const getAUnitList = async () => {
            try {
                const body = {
                    "sql": `SELECT a_unit_id, a_unit_name FROM army JOIN a_unit ON army.army_id = a_unit.army_id WHERE army.army_id = ${armyId};`
                };
                const response = await fetch("http://localhost:4000/rawSQL", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });

                const responseData = await response.json();
                setAUnits(organizeData(responseData));
                
                console.log(organizeData(responseData));
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        getAUnitList(); 
    }, [armyId, aUpgradeId]);

    const addAUnitAUpgradeForm = () => {
        setNumAUnitAUpgradeForms(prev => prev + 1); 
    };
    const removeAUnitAUpgradeForm = () => {
        setNumAUnitAUpgradeForms(prev => prev - 1);
    };

    return (
        <div>
            <div>
                {[...Array(numAUnitAUpgradeForms)].map((_, index) => (
                    <AUnitAUpgradeForm 
                        key={index} 
                        gameSystem={gameSystem}
                        aUpgradeId={aUpgradeId}
                        aUnits={aUnits}
                    /> 
                ))}
                <button onClick={addAUnitAUpgradeForm}>Link new Unit</button>
                {numAUnitAUpgradeForms > 0 && <button onClick={removeAUnitAUpgradeForm}>Remove Newest Unit</button>}
            </div>
        </div>
    );
};

export default AUnitAUpgradeMain;
