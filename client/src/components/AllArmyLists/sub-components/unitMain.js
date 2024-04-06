import React, { useState, useEffect, useRef, Fragment } from "react";
import { GetArmyList, GetArmy } from "../getRequests";
import { CompactPicker } from 'react-color';
import UnitStatline from "./unitStatlineQuantity";
import UpgradeSupertype from "./upgradeSupertype";

const UnitMain = ({ gameSystem, armyList, armies, forceId, unit, handleClick, handleCreate }) => { // the value of armies changes when in unitMain (or possibly a child not sure why)

    const [alUnitId, setAlUnitId] = useState(null);
    const [aUnitId, setAUnitId] = useState(null);
    const [alUnitName, setAlUnitName] = useState('');
    const [alUnitColor, setAlUnitColor] = useState(null);

    const [updated, setUpdated] = useState(false);

    const [colorPickerVisible, setColorPickerVisible] = useState(false);

    const [statlines, setStatlines] = useState([]);
    const [unitStatlines, setUnitStatlines] = useState([]);

    const [supertypes, setSupertypes] = useState([]);

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
        setAlUnitColor(unit[4]);
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
            <table>
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

    

    return (
        <div>
            {/* <form onSubmit={e => { e.preventDefault(); updateUnit(); }}>
                <button type="button" onClick={onDeleteClick}>Delete</button> */}
                {unit !== undefined ? (
                    <form onSubmit={e => { e.preventDefault(); updateUnit(); }}>
                        <button type="button" onClick={onDeleteClick}>Delete</button>
                            <div ref={colorPickerRef}>
                            <div 
                                onClick={() => setColorPickerVisible(!colorPickerVisible)} 
                                style={{ backgroundColor: alUnitColor || '#ffffff', width: '30px', height: '30px', cursor: 'pointer', border: '1px solid #000' }} 
                            />
                            {colorPickerVisible &&
                                <CompactPicker color={alUnitColor || '#ffffff'} onChange={handleColorChange} />
                            }
                        </div>
                        <input value={alUnitName} onChange={handleNameChange} />
                        <h4>{unit[9]} - pts</h4> {/** not updating */}
                        <h4>{unit[5]}</h4>
                    </form>
                ) : (
                    <p>loading...</p>
                )}
            {/* </form> */}

            <div>
                {statlines.length !== 0 ? (<UnitStatlineTable data={statlines}/>) : (<div>Loading...</div>)}
                {armies && unit !== undefined ? (
                    <Fragment>
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
                        /> 
                        ))}
                    </Fragment>
                ) : (
                    <p>loading</p>
                ) }
            </div>

            <div>
                {/* add to list all rules for unit (not from upgrades) */}
            </div>

            <div>
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

            <div>
                {/* all rules from upgrades */}
            </div>
        </div>
    );
};

export default UnitMain;
