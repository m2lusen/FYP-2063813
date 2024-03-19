import React, { useState, useEffect, useCallback } from "react";

const GsGameModeForm = ({ gameSystemId, template, remove, index, totalForms, onDeleteConfirmation, onDeleteConfirmationNullId }) => {

    const [gsGmId, setGsGmId] = useState(null);
    const [gsGmName, setGsGmName] = useState('');
    const [gsGmPointUpper, setGsGmPointUpper] = useState(null);
    const [gsGmPointLower, setGsGmPointLower] = useState(null);

    const onDeleteGsGameModeClick = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:4000/gs_game_mode/${gsGmId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                console.log("Deleted successfully");
                setGsGmId(null);
                setGsGmName('');
                setGsGmPointLower(null);
                setGsGmPointUpper(null);

                onDeleteConfirmation();
            } else {
                console.error("Failed to delete");
            }
        } catch (err) {
            console.error(err.message);
        }
    }, [gsGmId, onDeleteConfirmation]);

    useEffect(() => { // since a useEffect is being used will run everytime that page loaded, also add a bool, to confirm whether should be added or not
        if (remove === true){
            if (index === totalForms - 1) {
                console.log("REMOVED"); // Log only when the last GsGameModeForm is removed
                if (gsGmId !== null){
                    onDeleteGsGameModeClick();
                } else {
                    onDeleteConfirmationNullId();
                }
            }
        }
    }, [remove, index, totalForms, gsGmId, onDeleteGsGameModeClick, onDeleteConfirmationNullId]);

    useEffect(() => {
        if (template) {
            setGsGmId(template[0]);
            setGsGmName(template[1]);
            setGsGmPointLower(template[2]);
            setGsGmPointUpper(template[3]);
        }
    }, [template]);


    const onSubmitGsGameModeForm = async (e) => {
        e.preventDefault(); // stops refreshing
        try {
            let body;
            let response;

            if (gsGmId === null) {
                body = {
                    "game_system_id": [gameSystemId],
                    "gs_gm_name": [gsGmName],
                    "gs_gm_point_upper": [gsGmPointUpper],
                    "gs_gm_point_lower": [gsGmPointLower]
                };
                response = await fetch("http://localhost:4000/gs_game_mode", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                if (response.ok) {
                    const responseData = await response.json();
                    console.log('Created : ', responseData)
                    setGsGmId(responseData[0].gs_gm_id);
                } else {
                    console.error("Failed to create");
                }
            } else {
                body = {
                    "game_system_id": gameSystemId,
                    "gs_gm_name": gsGmName,
                    "gs_gm_point_upper": gsGmPointUpper,
                    "gs_gm_point_lower": gsGmPointLower
                };

                response = await fetch(`http://localhost:4000/gs_game_mode/${gsGmId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                if (response.ok) {
                    const responseData = await response.json();
                    console.log('Updated gs_supertype: ', responseData)
                } else {
                    console.error("Failed to update gs_supertype");
                }
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div>
            <h4>Add New game mode</h4>
            <form onSubmit={onSubmitGsGameModeForm}>
                <label>Name:</label>
                <input type="text" value={gsGmName} onChange={(e) => setGsGmName(e.target.value)} required />
                <label>Point Maximum:</label>
                <input type="number" value={gsGmPointUpper} onChange={(e) => setGsGmPointUpper(e.target.value)} required />
                <label>Point Minimum:</label>
                <input type="number" value={gsGmPointLower} onChange={(e) => setGsGmPointLower(e.target.value)} required />
                <button type="submit">{gsGmId ? "Update" : "Create"}</button>
                {gsGmId && <button type="button" onClick={onDeleteGsGameModeClick}>Delete</button>}
            </form>
        </div>
    );
};

export default GsGameModeForm;
