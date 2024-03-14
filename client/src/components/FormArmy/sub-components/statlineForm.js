import React, { useState, useEffect, Fragment, useCallback } from "react";

const StatlineForm = ({ gameSystem, aUnitId, template, remove, index, totalForms, onDeleteConfirmation, onDeleteConfirmationNullId }) => {
    // const [aUnitId, setAUnitId] = useState(null);
    const [aStatlineId, setAStatlineId] = useState(null);
    const [aStatlineName, setAStatlineName] = useState('');

    const [aStatlineMin, setAStatlineMin] = useState(0);
    const [aStatlineMax, setAStatlineMax] = useState(0);
    const [aStatlinePc, setAStatlinePc] = useState(0);
    
    const [statlineValues, setStatlineValues] = useState([]);

    const onDeleteStatlineClick = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:4000/a_statline/${aStatlineId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                console.log("Deleted successfully");
                setAStatlineId(null);
                setAStatlineName('');
                setAStatlineMin(0);
                setAStatlineMax(0);
                setAStatlinePc(0);
                const initialStatlineValues = gameSystem[5].map(([id, _, acronym]) => [id, 0]);
                setStatlineValues(initialStatlineValues);

                onDeleteConfirmation(); 
            } else {
                console.error("Failed to delete");
            }
        } catch (err) {
            console.error(err.message);
        }
    }, [aStatlineId, onDeleteConfirmation, gameSystem]);

    useEffect(() => { 
        if (remove === true){
            if (index === totalForms - 1) {
                console.log("REMOVED"); 
                if (aStatlineId !== null){
                    onDeleteStatlineClick();
                } else {
                    onDeleteConfirmationNullId();
                }
            }
        }
    }, [remove, index, totalForms, aStatlineId, onDeleteStatlineClick, onDeleteConfirmationNullId]);

    useEffect(() => {
        if (gameSystem) {
            const initialStatlineValues = gameSystem[5].map(([id, _, acronym]) => [id, 0]); // Initialize statline values as nested array
            setStatlineValues(initialStatlineValues);
        }
    }, [gameSystem]);

    const handleStatlineChange = (statId, value) => {
        setStatlineValues(prevState => {
            const updatedValues = prevState.map(([id, val]) => id === statId ? [id, parseInt(value) || 0] : [id, val]);
            return updatedValues;
        });
    };

    const createStatlineGSStat = async (aStatlineId) => { // error with.... after creating realised dont actually need i made it so that can accept multiple rows
        try {
            const promises = statlineValues.map(([gsStatId, statValue]) => {
                const body = {
                    "a_statline_id": [aStatlineId],
                    "gs_stat_id": [gsStatId],
                    "stat_value": [statValue]
                };
                return fetch("http://localhost:4000/a_statline_gs_stat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
            });
    
            const responses = await Promise.all(promises);

            responses.forEach(response => {
                if (!response.ok) {
                    throw new Error("Failed to create");
                }
            });
            return responses;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const updateStatlineGSStat = async () => {
        try {
            const promises = statlineValues.map(([gsStatId, statValue]) => {
                const body = {
                    "a_statline_id": aStatlineId,
                    "gs_stat_id": gsStatId,
                    "stat_value": statValue
                };
                return fetch(`http://localhost:4000/a_statline_gs_stat/${aStatlineId}/${gsStatId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
            });
    
            const responses = await Promise.all(promises);

            responses.forEach(response => {
                if (!response.ok) {
                    throw new Error("Failed to update");
                }
            });
            return responses;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const onSubmitStatlineForm = async (e) => {
        e.preventDefault();
        try {
            let bodyStatline;
            let bodyAUnitAStatline;
            let response;
            let responseAUnitAStatline;
            if (aStatlineId === null) {
                bodyStatline = {
                    "a_statline_name": [aStatlineName]
                };

                response = await fetch("http://localhost:4000/a_statline", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bodyStatline)
                });
                if (response.ok) {
                    const responseStatlineData = await response.json();
                    console.log("body: ", responseStatlineData);
                    setAStatlineId(responseStatlineData[0].a_statline_id);
                    
                    bodyAUnitAStatline = {
                        "A_unit_id": [aUnitId],
                        "A_statline_id": [responseStatlineData[0].a_statline_id],
                        "A_statline_min": [aStatlineMin],
                        "A_statline_max": [aStatlineMax],
                        "a_statline_point_cost": [aStatlinePc]
                    }

                    responseAUnitAStatline = await fetch("http://localhost:4000/a_unit_a_statline", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(bodyAUnitAStatline)
                    });

                    if (responseAUnitAStatline.ok) {
                        const responseAUnitAStatlineData = responseAUnitAStatline.json();
                        console.log("body: ", responseAUnitAStatlineData);

                        try {
                            const responses = await createStatlineGSStat(responseStatlineData[0].a_statline_id);
                            console.log("All a_statline_gs_stat entries created successfully:", responses);
                        } catch (error) {
                            console.error(error.message);
                        }
                        
                    }
                } else {
                    console.error("Failed to create a_unit");
                }
            } else {
                bodyStatline = {
                    "a_statline_name": aStatlineName
                };

                response = await fetch(`http://localhost:4000/a_statline/${aStatlineId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bodyStatline)
                });
                if (response.ok) {
                    bodyAUnitAStatline = { // issue with
                        "A_unit_id": aUnitId,
                        "A_statline_id": aStatlineId,
                        "A_statline_min": aStatlineMin,
                        "A_statline_max": aStatlineMax,
                        "a_statline_point_cost": aStatlinePc
                    }
                    console.log(bodyAUnitAStatline)
                    responseAUnitAStatline = await fetch(`http://localhost:4000/a_unit_a_statline/${aUnitId}/${aStatlineId}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(bodyAUnitAStatline)
                    });

                    if (responseAUnitAStatline.ok){
                        try {
                            const responses = await updateStatlineGSStat();
                            console.log("All a_statline_gs_stat entries updated successfully:", responses);
                        } catch (error) {
                            console.error(error.message);
                        }
                    }
                } else {
                    console.error("Failed to update game system");
                }
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div>
            <h1>{aStatlineId ? "Edit statline" : "Add New statline"}</h1>
            <form onSubmit={onSubmitStatlineForm}>
                <label>Statline Name:</label>
                <input type="text" value={aStatlineName} onChange={(e) => setAStatlineName(e.target.value)} required />
                <label>Minimum Allowed:</label>
                <input type="number" value={aStatlineMin} onChange={(e) => setAStatlineMin(e.target.value)} required />
                <label>Maximum Allowed:</label>
                <input type="number" value={aStatlineMax} onChange={(e) => setAStatlineMax(e.target.value)} />
                <label>Point Cost:</label>
                <input type="number" value={aStatlinePc} onChange={(e) => setAStatlinePc(e.target.value)} />
                
                {gameSystem[5].map(([id, name, acronym]) => (
                    <Fragment key={acronym}>
                        <label>{acronym}:</label>
                        <input
                            type="number"
                            value={statlineValues.find(stat => stat[0] === id)?.[1] || 0}
                            onChange={(e) => handleStatlineChange(id, e.target.value)}
                        />
                    </Fragment>
                ))}
                <button type="submit">{aStatlineId  ? "Update" : "Create"}</button>
                {aStatlineId  && <button type="button" onClick={onDeleteStatlineClick}>Delete</button>}
            </form>
        </div>
    );
};

export default StatlineForm;
