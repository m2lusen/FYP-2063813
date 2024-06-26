import React, { useState, useEffect, useCallback } from "react";
import { GetArmy, GetArmyList } from "../getRequests";

const YourUnitsForceForm = ({ gameSystem, armyList, armies, handleClick, handleCreate }) => { // error when addiding force due to reading [6]

    const [mode, setMode] = useState('forces');

    const [forceId, setForceId] = useState(null);
    const [armyId, setArmyId] = useState(null);

    const [forces, setForces] = useState(null);
    
    const [allArmy, setAllArmy] = useState([]);

    const [updated, setUpdated] = useState(false);

    const [units, setUnits] = useState([]);

    useEffect(() => {           
        setForces(armyList[5]);
        if (!forceId){ 
            if (armyList[5][0][0] !== null){
                
                setForceId(armyList[5][0][0]);
            }
        }
    }, [forces, armyList, gameSystem, armies, forceId]);

    const groupBySupertype = (data) => {
        const groupedByValue = {};
        data.forEach(row => {
            const supertype = row[6];
            if (!groupedByValue[supertype]) {
                groupedByValue[supertype] = [];
            }
            const supertypeInfo = gameSystem[6];
            const supertypeData = supertypeInfo.find(info => info[0] == supertype);
            const supertypeID = supertypeData ? supertypeData[0] : null; 
            const supertypeName = supertypeData ? supertypeData[1] : null; 
            groupedByValue[supertype].push([supertypeID, supertypeName, ...row]);
        });
        return Object.values(groupedByValue);
    };

    useEffect(() => {  
        if (forceId){
            const force = forces.find(row => row[0] == forceId);
            if (force !== undefined){
                setUnits(groupBySupertype(force[6]));
            }

        }
    }, [forceId, armyList, gameSystem, armies]);

    const checkUnitClick = (unit, forceId) => {

        handleClick(unit, forceId)
    }

    const UnitsComponent = () => {
        // Group units by supertype
        const groupedUnits = {};
        units.forEach(unitGroup => {
            unitGroup.forEach(unit => {
                if (unit[1] !== null){
                    const supertype = unit[1]; // Supertype is in position [1]
                    if (!groupedUnits[supertype]) {
                        groupedUnits[supertype] = [];
                    }
                    groupedUnits[supertype].push(unit);
                }
            });
        });
    
        // Create JSX for each supertype
        const supertypeSections = Object.entries(groupedUnits).map(([supertype, units]) => (
            <section key={supertype}>
                <h3 className="all-units-supertype-heading">{supertype}</h3>
                <div>
                    {units.map(unit => (
                        <button className="your-units-unit-button" key={unit[3]}  onClick={() => checkUnitClick(unit, forceId)}>
                            {/* <div className="your-units-unit-color-square" style={{
                                    backgroundColor: unit[4],
                                    width: 'calc(3/28 * 90vw)',
                                    height: 'calc(3/28 * 90vw)',
                                }}>
                            </div>
                            {unit[3]} - {unit[5]} - {unit[6]} pts */}
                                                        <div className="your-units-unit-color-container">
                                <div
                                    className="your-units-unit-color-square"
                                    style={{
                                        backgroundColor: unit[4],
                                        width: 'calc(3/28 * 90vw)',
                                        height: 'calc(3/28 * 90vw)',
                                    }}
                                ></div>
                                <div className="your-units-unit-text">
                                    {unit[3]} - {unit[5]} - {unit[6]} pts
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </section>
        ));
    
        return (
            <div>
                {supertypeSections}
            </div>
        );
    };

    useEffect(() => {
        if (mode == 'update force') {
            const fetchData = async () => {
                try {
                    const newArmies = await GetArmy();
                    setAllArmy(newArmies);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
    }, [mode]);

    const onSubmitForceForm = async (e) => {
        e.preventDefault();
        try {
            let body;
            let response;
            
            body = {
                "army_list_id": [armyList[0]],
                "army_id": [armyId]
            };
            response = await fetch("http://localhost:4000/al_force", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log("body: ", responseData);
                setForceId(responseData[0].al_force_id);

                setUpdated(true);
            } else {
                console.error("Failed to create");
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const onDeleteForceClick = async () => {
        try {

            const confirmDelete = window.confirm("Are you sure you want to delete this force?");
            if (!confirmDelete) return;

            const response = await fetch(`http://localhost:4000/al_force/${forceId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                console.log("Deleted successfully");
                setForceId(null);
                setArmyId(null);
               
                setUpdated(true);
            } else {
                console.error("Failed to delete");
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        if (updated) {
            const fetchData = async () => {
                try {
                    const newLists = await GetArmyList();
                    const newArmies = await GetArmy();

                    const filteredNewArmyLists = newLists.find(subArray => subArray[0] == armyList[0]);

                    const newForces = [...new Set(filteredNewArmyLists[5].map(filteredNewArmyList => filteredNewArmyList[1]))];

                    const filteredNewArmies = newArmies.filter(item => newForces.includes(item[0]));

                    const newTemplate = {
                        "Army_List": filteredNewArmyLists,
                        "Linked_Game_System": gameSystem,
                        "Linked_Armies": filteredNewArmies
                    }

                    handleCreate(newTemplate);
                    
                    setUpdated(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
    }, [updated]);

    const renderContent = () => {
        switch (mode) {
            case 'forces':
                return (
                    <div>
                       <UnitsComponent  />;
                    </div>
                );
            case 'update force':
                return (
                    <div>
                        {allArmy ? (
                            <div>
                                <form onSubmit={onSubmitForceForm}>
                                    <h3>Add new Force</h3>
                                    <select value={armyId} onChange={(e) => setArmyId(e.target.value)} required>
                                        <option value="">Select Force</option>
                                        {allArmy.map(([id, name]) => (
                                            <option key={id} value={id}>{name}</option>
                                        ))}
                                    </select>
                                    <button type="submit">Create New Force</button>
                                </form>
                            </div>
                        ) : (
                            <div>Loading...</div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    const decideSubmit = (e) => {
        if (e.target.value == 'new') {
            setMode("update force");
        } else {
            setMode("forces");
            setForceId(e.target.value);
        }
    }

    const getForceNumber = (index) => {
        const count = forces.slice(0, index).filter(([_, __, name]) => name == forces[index][2]).length;
        return count > 0 ? `(${count + 1})` : '';
    };

    return (
        <div className="scrollable-content">
            {forces ? (
                <div className="your-force-select-container">
                    <select className="your-force-select" onChangeCapture={decideSubmit} required>
                        {forces.map(([id, _, name], index) => (
                            <option key={id} value={id}>
                                {name} {getForceNumber(index)}
                            </option>
                        ))}
                        <option value="new">Add new Force</option>
                    </select>
                    {forceId && forceId !== 'new' && (
                        <button className="your-force-select-delete" onClick={onDeleteForceClick}>X</button>
                    )}
                </div>
            ) : (
                <div>Loading...</div>
            )}


            {renderContent()}
        </div>
    );
};

export default YourUnitsForceForm;