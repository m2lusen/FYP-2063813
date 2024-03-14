import React, { useState, useEffect, Fragment, useCallback } from "react";
import StatlineForm from "./statlineForm";

const AUnitForm = ({ gameSystem, armyId, template, remove, index, totalForms, onDeleteConfirmation, onDeleteConfirmationNullId }) => {

    const [aUnitId, setAUnitId] = useState(null);
    const [gsSupertypeId, setGsSupertypeId] = useState(null);
    const [aUnitName, setAUnitName] = useState('');
    const [aUnitPC, setAUnitPC] = useState(0);
    const [aUnitMin, setAUnitMin] = useState(null);
    const [gsSupertypes, setGsSupertypes] = useState([]);

    const [statlines, setStatlines] = useState([]);

    const [numStatlineForms, setNumStatlineForms] = useState(1);

    const [removedStatline, setRemovedStatline] = useState(false);


    const onDeleteAUnitClick = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:4000/a_unit/${aUnitId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                console.log("Deleted successfully");
                setAUnitId(null);
                setGsSupertypeId(null);
                setAUnitName('');
                setAUnitPC(0);
                setAUnitMin(null);
                onDeleteConfirmation(); 
            } else {
                console.error("Failed to delete");
            }
        } catch (err) {
            console.error(err.message);
        }
    }, [aUnitId, onDeleteConfirmation]);

    useEffect(() => { 
        if (remove === true){
            if (index === totalForms - 1) {
                console.log("REMOVED"); 
                if (aUnitId !== null){
                    onDeleteAUnitClick();
                } else {
                    onDeleteConfirmationNullId();
                }
            }
        }
    }, [remove, index, totalForms, aUnitId, onDeleteAUnitClick, onDeleteConfirmationNullId]);

    useEffect(() => {
        if (gameSystem) {
            setGsSupertypes(gameSystem[6]); 
        }
    }, [gameSystem]);

    const onSubmitArmyForm = async (e) => {
        e.preventDefault();
        try {
            let body;
            let response;
            if (aUnitId === null) {
                body = {
                    "army_id": [armyId],
                    "gs_supertype_id": [gsSupertypeId],
                    "a_unit_name": [aUnitName],
                    "a_unit_pc": [aUnitPC],
                    "a_unit_limit_per_army": [aUnitMin] 
                };

                console.log(body)

                response = await fetch("http://localhost:4000/a_unit", {//possible false positive
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                if (response.ok) {
                    const responseData = await response.json();
                    console.log("body: ", responseData);
                    setAUnitId(responseData[0].a_unit_id);
                } else {
                    console.error("Failed to create a_unit");
                }
            } else { // issue with update
                body = {
                    "army_id": armyId,
                    "gs_supertype_id": gsSupertypeId,
                    "a_unit_name": aUnitName,
                    "a_unit_pc": aUnitPC,
                    "a_unit_limit_per_army": aUnitMin
                };

                console.log(body)

                response = await fetch(`http://localhost:4000/a_unit/${aUnitId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                if (!response.ok) {
                    console.error("Failed to update game system");
                    console.log(response)
                }
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const addStatlineForm = () => {
        setNumStatlineForms(prev => prev + 1); 
    };
    const removeStatlineForm = () => {
        // if (Statlines.length !== 0) {
        //     setNumStatlineForms(Statlines.slice(0, Statlines.length - 1));
        // }
        setRemovedStatline(true);
    };

    const handleStatlineRemoveConfirmation = useCallback(() => {
        setRemovedStatline(false);
        setNumStatlineForms(prev => prev - 1); 
    }, []);
    const handleStatlineDeletionConfirmation = useCallback(() => {
        setRemovedStatline(false);
        setNumStatlineForms(prev => prev - 1); 
    }, []);

    return (
        <div>
            <h1>{aUnitId ? "Edit unit" : "Add New unit"}</h1>
            <form onSubmit={onSubmitArmyForm}>
                <label>Name:</label>
                <input type="text" value={aUnitName} onChange={(e) => setAUnitName(e.target.value)} required />
                <label>Points cost:</label>
                <input type="number" value={aUnitPC} onChange={(e) => setAUnitPC(e.target.value)} required />
                <label>Minimum allowed:</label>
                <input type="number" value={aUnitMin} onChange={(e) => setAUnitMin(e.target.value)} />
                <label>GS Supertype:</label>
                <select value={gsSupertypeId} onChange={(e) => setGsSupertypeId(e.target.value)} required>
                    <option value="">Select GS Supertype</option>
                    {gsSupertypes.map(([id, name, _]) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                </select>
                <button type="submit">{aUnitId ? "Update" : "Create"}</button>
                {aUnitId && <button type="button" onClick={onDeleteAUnitClick}>Delete</button>}
            </form>

            {aUnitId && (
                <Fragment>
                    <div>
                        <h2>Manage Statlines</h2>
                        {[...Array(numStatlineForms)].map((_, index) => (
                            <StatlineForm 
                                key={index} 
                                gameSystem={gameSystem}
                                aUnitId={aUnitId} 
                                template={statlines[index]}
                                remove={removedStatline} 
                                index={index} 
                                totalForms={numStatlineForms} 
                                onDeleteConfirmation={handleStatlineDeletionConfirmation}
                                onDeleteConfirmationNullId={handleStatlineRemoveConfirmation}
                            /> 
                        ))}
                        <button onClick={addStatlineForm}>Add New statline</button>
                        {numStatlineForms > 0 && <button onClick={removeStatlineForm}>Remove Newest statline</button>}
                    </div>
                </Fragment>
            )}
        </div>
    );
};

export default AUnitForm;
