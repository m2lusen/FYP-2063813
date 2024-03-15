import React, { useState, useEffect, Fragment, useCallback } from "react";
import AUnitForm from "./aUnitForm";
import AUpgradeTypeForm from "./aUpgradeTypeForm";

const ArmyForm = ({ gameSystem, template }) => {

    const [gameSystemId, setGameSystemId] = useState(null);
    const [armyId, setArmyId] = useState(null);
    const [armyName, setArmyName] = useState('');
    const [armyEdition, setArmyEdition] = useState('');
    const [armyVersion, setArmyVersion] = useState('');

    const [aUnits, setAUnits] = useState([]);
    const [aUpgradeTypes, setAUpgradeTypes] = useState([]);

    const [numAUnitForms, setNumAUnitForms] = useState(1);
    const [numAUpgradeTypeForms, setNumAUpgradeTypeForms] = useState(1);

    const [removedAUnit, setRemovedAUnit] = useState(false);
    const [removedAUpgradeType, setRemovedAUpgradeType] = useState(false);

    useEffect(() => {
        if (gameSystem) {
            setGameSystemId(gameSystem[0]);
        }
    }, [gameSystem]);

    const onSubmitArmyForm = async (e) => {
        e.preventDefault();
        try {
            let body;
            let response;
            if (armyId === null) {
                body = {
                    "game_system_id": [gameSystemId],
                    "army_name": [armyName],
                    "army_edition": [armyEdition],
                    "army_version": [armyVersion]
                };
                response = await fetch("http://localhost:4000/army", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                if (response.ok) {
                    const responseData = await response.json();
                    console.log("body: ", responseData);
                    setArmyId(responseData[0].army_id);
                } else {
                    console.error("Failed to create game system");
                }
            } else {
                body = {
                    "game_system_id": gameSystemId,
                    "army_name": armyName,
                    "army_edition": armyEdition,
                    "army_version": armyVersion
                };
                response = await fetch(`http://localhost:4000/army/${armyId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                if (!response.ok) {
                    console.error("Failed to update game system");
                }
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const onDeleteClick = async () => {
        try {
            const response = await fetch(`http://localhost:4000/army/${armyId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                console.log("Deleted successfully");
                setArmyId(null);
                setArmyName('');
                setArmyEdition('');
                setArmyVersion('');
            } else {
                console.error("Failed to delete");
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const addAUnitForm = () => {
        setNumAUnitForms(prev => prev + 1); 
    };
    const removeAUnitForm = () => {
        // if (aUnits.length !== 0) {
        //     setNumAUnitForms(aUnits.slice(0, aUnits.length - 1));
        // }
        setRemovedAUnit(true);
    };
    const handleAUnitRemoveConfirmation = useCallback(() => {
        setRemovedAUnit(false);
        setNumAUnitForms(prev => prev - 1); 
    }, []);
    const handleAUnitDeletionConfirmation = useCallback(() => {
        setRemovedAUnit(false);
        setNumAUnitForms(prev => prev - 1); 
    }, []);

    const addAUpgradeTypeForm = () => {
        setNumAUpgradeTypeForms(prev => prev + 1); 
    };
    const removeAUpgradeTypeForm = () => {
        // if (aUpgradeTypes.length !== 0) {
        //     setNumAUpgradeTypeForms(aUpgradeTypes.slice(0, aUpgradeTypes.length - 1));
        // }
        setRemovedAUpgradeType(true);
    };
    const handleAUpgradeTypeRemoveConfirmation = useCallback(() => {
        setRemovedAUpgradeType(false);
        setNumAUpgradeTypeForms(prev => prev - 1); 
    }, []);
    const handleAUpgradeTypeDeletionConfirmation = useCallback(() => {
        setRemovedAUpgradeType(false);
        setNumAUpgradeTypeForms(prev => prev - 1); 
    }, []);

    return (
        <div>
            <h1>{armyId ? "Edit army" : "Add New Army"}</h1>
            <form onSubmit={onSubmitArmyForm}>
                <label>Name:</label>
                <input type="text" value={armyName} onChange={(e) => setArmyName(e.target.value)} required />
                <label>Edition:</label>
                <input type="text" value={armyEdition} onChange={(e) => setArmyEdition(e.target.value)} required />
                <label>Version:</label>
                <input type="number" value={armyVersion} onChange={(e) => setArmyVersion(e.target.value)} required />
                <button type="submit">{armyId ? "Update" : "Create"}</button>
                {armyId && <button type="button" onClick={onDeleteClick}>Delete</button>}
            </form>

            {armyId && (
                <Fragment>
                    <div>
                        <h2>Manage Units</h2>
                        {[...Array(numAUnitForms)].map((_, index) => (
                            <AUnitForm 
                                key={index} 
                                gameSystem={gameSystem}
                                armyId={armyId}
                                template={aUnits[index]} 
                                remove={removedAUnit}
                                index={index} 
                                totalForms={numAUnitForms} 
                                onDeleteConfirmation={handleAUnitDeletionConfirmation}
                                onDeleteConfirmationNullId={handleAUnitRemoveConfirmation}
                            /> 
                        ))}
                        <button onClick={addAUnitForm}>Add New unit</button>
                        {numAUnitForms > 0 && <button onClick={removeAUnitForm}>Remove Newest unit</button>}
                    </div>

                    <div>
                        <h2>Manage Upgrade Types</h2>
                        {[...Array(numAUpgradeTypeForms)].map((_, index) => (
                            <AUpgradeTypeForm 
                                key={index} 
                                gameSystem={gameSystem}
                                template={aUpgradeTypes[index]} 
                                remove={removedAUpgradeType}
                                index={index} 
                                totalForms={numAUpgradeTypeForms} 
                                onDeleteConfirmation={handleAUpgradeTypeDeletionConfirmation}
                                onDeleteConfirmationNullId={handleAUpgradeTypeRemoveConfirmation}
                            /> 
                        ))}
                        <button onClick={addAUpgradeTypeForm}>Add New upgrade type</button>
                        {numAUpgradeTypeForms > 0 && <button onClick={removeAUpgradeTypeForm}>Remove Newest upgrade type</button>}
                    </div>
                </Fragment>
            )}
        </div>
    );
};

export default ArmyForm;
