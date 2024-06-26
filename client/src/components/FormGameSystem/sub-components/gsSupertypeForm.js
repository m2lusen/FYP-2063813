import React, { useState, useEffect, useCallback } from "react";

const GsSupertypeForm = ({ gameSystemId, template, remove, index, totalForms, onDeleteConfirmation, onDeleteConfirmationNullId }) => {
    const [gsSupertypeId, setGsSupertypeId] = useState(null);
    const [gsSupertypeName, setGsSupertypeName] = useState('');
    const [gsSupertypeLower, setGsSupertypeLower] = useState(0); // should be null however otherwise error is encountered.

    const onDeleteGsSupertypeClick = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:4000/gs_supertype/${gsSupertypeId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                console.log("Deleted successfully");
                setGsSupertypeId(null);
                setGsSupertypeName('');
                setGsSupertypeLower(0);
                onDeleteConfirmation(); // Trigger the callback function after successful deletion
            } else {
                console.error("Failed to delete");
            }
        } catch (err) {
            console.error(err.message);
        }
    }, [gsSupertypeId, onDeleteConfirmation]);

    useEffect(() => { // since a useEffect is being used will run everytime that page loaded, also add a bool, to confirm whether should be added or not
        if (remove === true){
            if (index === totalForms - 1) {
                console.log("REMOVED"); // Log only when the last GsSupertypeForm is removed
                if (gsSupertypeId !== null){
                    onDeleteGsSupertypeClick();
                } else {
                    onDeleteConfirmationNullId();
                }
            }
        }
    }, [remove, index, totalForms, gsSupertypeId, onDeleteGsSupertypeClick, onDeleteConfirmationNullId]);

    useEffect(() => {
        if (template) {
            setGsSupertypeId(template[0]);
            setGsSupertypeName(template[1]);
            setGsSupertypeLower(template[2]);
        }
    }, [template]);


    const onSubmitGsSupertypeForm = async (e) => {
        e.preventDefault(); // stops refreshing
        try {
            let body;
            let response;
            // If gsSupertypeId is null, create a new gs supertype
            if (gsSupertypeId === null) {
                body = {
                    "game_system_id": [gameSystemId],
                    "gs_supertype_name": [gsSupertypeName],
                    "gs_supertype_lower": [gsSupertypeLower]
                };
                response = await fetch("http://localhost:4000/gs_supertype", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                if (response.ok) {
                    const responseData = await response.json();
                    console.log('Created gs_supertype: ', responseData)
                    setGsSupertypeId(responseData[0].gs_supertype_id);
                } else {
                    console.error("Failed to create gs_supertype");
                }
            } else {
                body = {
                    "game_system_id": gameSystemId,
                    "gs_supertype_name": gsSupertypeName,
                    "gs_supertype_lower": gsSupertypeLower
                };
                // If gsSupertypeId is provided, update the existing gs supertype
                response = await fetch(`http://localhost:4000/gs_supertype/${gsSupertypeId}`, {
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
            <h4>Add New GsSupertype</h4>
            <form onSubmit={onSubmitGsSupertypeForm}>
                <label>Name:</label>
                <input type="text" value={gsSupertypeName} onChange={(e) => setGsSupertypeName(e.target.value)} required />
                <label>Lower:</label>
                <input type="number" value={gsSupertypeLower} onChange={(e) => setGsSupertypeLower(e.target.value)} required />
                <button type="submit">{gsSupertypeId ? "Update" : "Create"}</button>
                {gsSupertypeId && <button type="button" onClick={onDeleteGsSupertypeClick}>Delete</button>}
            </form>
        </div>
    );
};

export default GsSupertypeForm;
