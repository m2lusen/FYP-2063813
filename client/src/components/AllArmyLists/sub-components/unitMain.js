import React, { useState, useEffect, useRef, Fragment } from "react";
import { GetArmyList, GetArmy } from "../getRequests";
import { CompactPicker } from 'react-color';
import UnitStatline from "./unitStatlineQuantity";
import UpgradeSupertype from "./upgradeSupertype";

const UnitMain = ({ gameSystem, armyList, armies, forceId, unit, handleClick, handleCreate }) => { // the value of armies changes when in unitMain (or possibly a child not sure why)

    const [alUnitId, setAlUnitId] = useState(null);
    const [aUnitId, setAUnitId] = useState(null);
    const [alUnitName, setAlUnitName] = useState('');
    const [alUnitColor, setAlUnitColor] = useState('#FFFFFF');

    const [updated, setUpdated] = useState(false);

    const [colorPickerVisible, setColorPickerVisible] = useState(false);

    const [statlines, setStatlines] = useState([]);
    const [unitStatlines, setUnitStatlines] = useState([]);

    const [supertypes, setSupertypes] = useState([]);

    const [rules, setRules] = useState([]);
    const [upgradeRules, setUpgradeRules] = useState([]); // issue with

    const [activeRulesIndex, setActiveRulesIndex] = useState(null);
    const [activeUpgradeRulesIndex, setActiveUpgradeRulesIndex] = useState(null);

    const [error, setError] = useState('');

    const handleStatlineError = (errorMessage) => {
        setError(errorMessage);
    };

    useEffect(() => {
        console.log(unit)
    }, [armyList, armies, forceId]);

    useEffect(() => {
        const armyLocation = armyList[5].find(item => item[0] == forceId);
        if (armies !== null){
            const army = armies.find(item => item[0] == armyLocation[1]);
            const armyUnit = army[4].find(item => item[0] == unit[12]);
            setRules(gameSystem[7].filter(item1 => {
                return armyUnit[5].some(item2 => item1[0] === item2[0]);
            }));
            
            if (supertypes.length !== 0){
                const upgrades = [];
                for (let i = 0; i < supertypes.length; i++) {
                    const supertype = supertypes[i][5];
                    if (Array.isArray(supertype)) {
                        for (let j = 0; j < supertype.length; j++) {
                            upgrades.push(supertype[j]);
                        }
                    }
                } 
                const upgradeIds = upgrades.flatMap(innerArray => innerArray[3]);
                setUpgradeRules(gameSystem[7].filter(item1 => {
                    return upgradeIds.some(item2 => item1[0] === item2[0]);
                }));
            }
        }
    }, [armyList, armies, forceId]);

    const filterUpgrades = (idsArr, upgradesArr) => {
        const ids = idsArr.flatMap(id => id);

        const filteredUpgrades = upgradesArr.map(upgrade => {
            if (upgrade[5]) {
                upgrade[5] = upgrade[5].filter(item => ids.includes(item[0]));
            }
            return upgrade;
        });
    
        return filteredUpgrades.filter(row => row[5].length > 0);
    };


    useEffect(() => { // issue with army ??

        const armyLocation = armyList[5].find(item => item[0] == forceId);
        if (armies !== null){
            const army = armies.find(item => item[0] == armyLocation[1]);
            const intersections = army[6].map(([str]) => str.split(' - ').map(Number));
            const filteredIntersections = intersections.filter(item => item[0] == unit[12]);
            const upgradeIds = (filteredIntersections.map(([_, ...rest]) => rest));

            setSupertypes(filterUpgrades(upgradeIds, army[5]));
        }
    }, [armyList, armies, forceId]);

    useEffect(() => {        
        setAlUnitId(unit[2]);
        setAUnitId(unit[12]);
        setAlUnitName(unit[3]);

        if (unit !== undefined && unit[4] === null) {
            setAlUnitColor('#FFFFFF');
        } else if (unit !== undefined && unit[4] !== null) {
            setAlUnitColor(unit[4]);
        }
    
        // setAlUnitColor(unit[4]);
    }, [unit]);

    const createStatBlock = (statlineNames, unitNames, statlineRows) => { // if time rewrite
        const acronymMap = new Map(statlineNames.map(([primaryKey, _, acronym]) => [primaryKey, acronym]));
        const result = [];
        statlineRows.forEach((subArray, index) => {
            const uniqueAcronyms = new Set();
            const acronyms = [' '];
            const values = [];

            subArray.forEach(([primaryKey, value]) => {
                const acronym = acronymMap.get(primaryKey);
                if (acronym !== undefined && !uniqueAcronyms.has(acronym)) {
                    uniqueAcronyms.add(acronym);
                    acronyms.push(acronym);
                    values.push(value);
                } else {
                    values.push(value);
                }
            });

            if (acronyms.length == 0) {
                result.push(unitNames[index], values);
            } else {
                result.push(unitNames[index], acronyms, values);
            }
        });
        const headerRow = result[1];
        const nonHeaderRows = result.filter((row, index) => index % 3 !== 1);

        nonHeaderRows.unshift(headerRow);

        const returningRows = [headerRow];
        for (let i = 1; i < nonHeaderRows.length; i += 2) {
            returningRows.push([...nonHeaderRows[i], ...nonHeaderRows[i + 1]]);
        }

        return returningRows;
    };

    useEffect(() => {        
        const armyLocation = armyList[5].find(item => item[0] == forceId);
        if (armies !== null){
            const army = armies.find(item => item[0] == armyLocation[1]);
            const armyUnit = army[4].find(item => item[0] == unit[12]);
            const unitNames = armyUnit[7].map(innerArray => innerArray[1]);
            setUnitStatlines(armyUnit[7]);
            const statlineRows = armyUnit[7].map(innerArray => innerArray[5]);
            setStatlines(createStatBlock(gameSystem[5], unitNames, statlineRows));
        }
    }, [unit, gameSystem, armyList, armies, forceId]);

    const updateUnit = async () => {
        try {
            let body = {
                "al_force_id": forceId,
                "a_unit_id": aUnitId,
                "al_unit_name": alUnitName,
                "al_unit_color": alUnitColor
            };
            const response = await fetch(`http://localhost:4000/al_unit/${alUnitId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                console.error("Failed to update unit");
            } else {
                console.log("Unit updated successfully");
                setUpdated(true);
            }
            
        } catch (err) {
            console.error(err.message);
        }
    };

    const onDeleteClick = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this unit?");
        if (!confirmDelete) return;
        try {
            const response = await fetch(`http://localhost:4000/al_unit/${aUnitId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                console.log("Deleted successfully");
                setUpdated(true);
                handleClick();
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
                    const filteredNewArmyLists = newLists.find(subArray => subArray[0] == armyList[0]);
                    const newTemplate = {
                        "Army_List": filteredNewArmyLists,
                        "Linked_Game_System": gameSystem,
                        "Linked_Armies": armies
                    }
                    handleCreate(newTemplate);
                    setUpdated(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
    }, [updated, armyList, gameSystem, armies, handleCreate]);

    const handleColorChange = (selectedColor) => {
        setAlUnitColor(selectedColor.hex);
    };

    const colorPickerRef = useRef(null);

    const handleOutsideClick = (e) => {
        if (colorPickerRef.current && !colorPickerRef.current.contains(e.target)) {
            setColorPickerVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const handleNameChange = (e) => {
        setAlUnitName(e.target.value);
    };

    const UnitStatlineTable = ({ data }) => {
        return (
            <table className="unit-main-statline-table">
                <thead>
                <tr>
                    {data[0].map((header, index) => (
                    <th key={index}>{header}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell !== null ? cell : '-'}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    const handleRulesToggle = (index) => {
        setActiveRulesIndex(activeRulesIndex === index ? null : index);
    };
    
    const handleUpgradeRulesToggle = (index) => {
        setActiveUpgradeRulesIndex(activeUpgradeRulesIndex === index ? null : index);
    };

    return (
        <div>
            <div className="unit-main-basic-info">
            {unit !== undefined ? (
                <form onSubmit={e => { e.preventDefault(); updateUnit(); }}>
                    <div className="left-column">
                        <div ref={colorPickerRef}>
                            <div 
                                onClick={() => setColorPickerVisible(!colorPickerVisible)} 
                                style={{ backgroundColor: alUnitColor, width: '30px', height: '30px', cursor: 'pointer', border: '1px solid #000' }} 
                            />
                            {colorPickerVisible &&
                                <CompactPicker color={alUnitColor} onChange={handleColorChange} />
                            }
                        </div>
                        <input value={alUnitName} onChange={handleNameChange} />
                        <h4>{unit[9]} - pts</h4>
                    </div>
                    <div className="right-column">
                        <h4>{unit[5]}</h4>
                    </div>
                    <button className="unit-main-delete-button" type="button" onClick={onDeleteClick}>X</button>
                </form>
            ) : (
                <p>loading...</p>
            )}
        </div>

            <div className="unit-main-statlines">
                {error && <div>{error}</div>}
                <div className="unit-main-statlines-content">
                    {statlines.length !== 0 ? (<UnitStatlineTable data={statlines}/>) : (<div>Loading...</div>)}
                    {armies && unit !== undefined ? (
                        <Fragment>
                            <div className="unit-main-statline-container">
                                {[...Array(unitStatlines.length)].map((_, index) => (
                                <UnitStatline
                                    gameSystem={gameSystem}
                                    armyList={armyList}
                                    armies={armies}
                                    forceId={forceId}
                                    statlineRow={unitStatlines[index]}
                                    unit={unit}
                                    alUnitId={alUnitId}
                                    aUnitId={aUnitId}
                                    handleCreate={handleCreate}
                                    handleStatlineError={handleStatlineError}
                                /> 
                                ))}
                            </div>
                        </Fragment>
                    ) : (
                        <p>loading</p>
                    ) }
                </div>
            </div>

            <div className="unit-main-rules">
                <Fragment>
                    <h3>Rules</h3>
                    {rules.map((rule, i) => (
                        <div className="unit-main-rules-content" key={i}>
                            <button className="info-button" onClick={() => handleRulesToggle(i)}>i</button>
                            <p  className="unit-main-rules-text">
                                {rule[1]} - {activeRulesIndex === i ? rule[2] : ''}
                            </p>
                        </div>
                    ))}
                </Fragment>
            </div>


            <div className="unit-main-upgrades">
                {armies !== undefined ? (
                    <Fragment>
                        {[...Array(supertypes.length)].map((_, index) => (
                        // <p>{supertypes[index]}</p>
                        <UpgradeSupertype
                            gameSystem={gameSystem}
                            armyList={armyList}
                            armies={armies}
                            forceId={forceId}
                            supertype={supertypes[index]}
                            alUnitId={alUnitId}
                            handleCreate={handleCreate}
                        /> 
                    ))}
                    </Fragment>
                ) : (
                    <p>loading</p>
                ) }
            </div>

            <div className="unit-main-rules">
                <Fragment>
                    <h3>Upgrade Rules</h3>
                    {upgradeRules.map((rule, i) => (
                        <div className="unit-main-rules-content" key={i}>
                            <button className="info-button" onClick={() => handleUpgradeRulesToggle(i)}>i</button>
                            <p  className="unit-main-rules-text">
                            {rule[1]} - {activeUpgradeRulesIndex === i ? rule[2] : ''}
                            </p>
                        </div>
                    ))}
                </Fragment>
            </div>

        </div>
    );
};

export default UnitMain;
