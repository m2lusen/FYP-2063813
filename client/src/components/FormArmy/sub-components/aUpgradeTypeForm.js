import React, { useState, useEffect, Fragment, useCallback } from "react";
import AUpgradeForm from "./aUpgradeForm";

const AUpgradeTypeForm = ({ gameSystem, armyId, template, remove, index, totalForms, onDeleteConfirmation, onDeleteConfirmationNullId }) => {

    const [aUTId, setAUTId] = useState(null);
    const [aUTName, setAUTName] = useState('');
    const [aUTMin, setAUTMin] = useState(null);
    const [aUTMax, setAUTMax] = useState(null);

    const [upgrades, setUpgrades] = useState([]);

    const [numUpgradeForms, setNumUpgradeForms] = useState(1);

    const [removedUpgrade, setRemovedUpgrade] = useState(false);

    useEffect(() => {
        if (template) {
            const [id, name, min, max, limit, upgradesArr] = template;
            setAUTId(id);
            setAUTName(name);
            setAUTMin(min);
            setAUTMax(max);
            setUpgrades(upgradesArr);
            setNumUpgradeForms(upgradesArr.length);
        }
    }, [template]);

    const onDeleteAUpgradeTypeClick = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:4000/a_upgrade_type/${aUTId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                console.log("Deleted successfully");
                setAUTId(null);
                setAUTName('');
                setAUTMin(null);
                setAUTMax(null);

                onDeleteConfirmation(); 
            } else {
                console.error("Failed to delete");
            }
        } catch (err) {
            console.error(err.message);
        }
    }, [aUTId, onDeleteConfirmation]);

    useEffect(() => { 
        if (remove === true){
            if (index === totalForms - 1) {
                console.log("REMOVED"); 
                if (aUTId !== null){
                    onDeleteAUpgradeTypeClick();
                } else {
                    onDeleteConfirmationNullId();
                }
            }
        }
    }, [remove, index, totalForms, aUTId, onDeleteAUpgradeTypeClick, onDeleteConfirmationNullId]);

    const onSubmitAUpgradeTypeForm = async (e) => {
        e.preventDefault();
        try {
            let body;
            let response;
            if (aUTId === null) {
                body = {
                    "a_ut_name": [aUTName],
                    "a_ut_min": [aUTMin],
                    "a_ut_max": [aUTMax]
                };

                response = await fetch("http://localhost:4000/a_upgrade_type", {//possible false positive
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                if (response.ok) {
                    const responseData = await response.json();
                    console.log("body: ", responseData);
                    setAUTId(responseData[0].a_ut_id);
                } else {
                    console.error("Failed to create");
                }
            } else { // issue with update
                body = {
                    "a_ut_name": aUTName,
                    "a_ut_min": aUTMin,
                    "a_ut_max": aUTMax
                };

                response = await fetch(`http://localhost:4000/a_upgrade_type/${aUTId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                if (!response.ok) {
                    console.error("Failed to update");
                    console.log(response)
                }
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const addUpgradeForm = () => {
        setNumUpgradeForms(prev => prev + 1); 
    };
    const removeUpgradeForm = () => {
        if (upgrades.length !== 0) {
            setUpgrades(upgrades.slice(0, upgrades.length - 1));
        }
        setRemovedUpgrade(true);
    };
    const handleUpgradeRemoveConfirmation = useCallback(() => {
        setRemovedUpgrade(false);
        setNumUpgradeForms(prev => prev - 1); 
    }, []);
    const handleUpgradeDeletionConfirmation = useCallback(() => {
        setRemovedUpgrade(false);
        setNumUpgradeForms(prev => prev - 1); 
    }, []);

    return (
        <div>
            <h1>{aUTId ? "Edit Upgrade Type" : "Add New Upgrade Type"}</h1>
            <form onSubmit={onSubmitAUpgradeTypeForm}>
                <label>Name:</label>
                <input type="text" value={aUTName} onChange={(e) => setAUTName(e.target.value)} required />
                <label>Maximum allowed:</label>
                <input type="number" value={aUTMax} onChange={(e) => setAUTMax(e.target.value)} />
                <label>Minimum allowed:</label>
                <input type="number" value={aUTMin} onChange={(e) => setAUTMin(e.target.value)} />

                <button type="submit">{aUTId ? "Update" : "Create"}</button>
                {aUTId && <button type="button" onClick={onDeleteAUpgradeTypeClick}>Delete</button>}
            </form>

            {aUTId && (
                <Fragment>
                    <div>
                        <h2>Manage Upgrades</h2>
                        {[...Array(numUpgradeForms)].map((_, index) => (
                            <AUpgradeForm 
                                key={index}
                                gameSystem={gameSystem}
                                armyId={armyId}
                                aUTId={aUTId}
                                template={upgrades[index]}
                                remove={removedUpgrade} 
                                index={index} 
                                totalForms={numUpgradeForms} 
                                onDeleteConfirmation={handleUpgradeDeletionConfirmation}
                                onDeleteConfirmationNullId={handleUpgradeRemoveConfirmation}
                            /> 
                        ))}
                        <button onClick={addUpgradeForm}>Add New Upgrade</button>
                        {numUpgradeForms > 0 && <button onClick={removeUpgradeForm}>Remove Newest upgrade</button>}
                    </div>
                </Fragment>
            )}
        </div>
    );
};

export default AUpgradeTypeForm;
