import React, { useState } from "react";

const GsStatForm = ({ gsUsId }) => {
    const [gsStatId, setGsStatId] = useState(null);
    const [gsStatName, setGsStatName] = useState('');
    const [gsStatAcronyme, setGsStatAcronyme] = useState('');

    const onSubmitGsStatForm = async (e) => {
        e.preventDefault(); // stops refreshing
        try {
            let body;
            let response;
            // If gsSupertypeId is null, create a new gs supertype
            if (gsStatId === null) {
                body = {
                    "gs_us_id": [gsUsId],
                    "gs_stat_name": [gsStatName],
                    "gs_stat_acronyme": [gsStatAcronyme]
                };
                response = await fetch("http://localhost:4000/gs_stat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                if (response.ok) {
                    const responseData = await response.json();
                    console.log('Created gs_stat: ', responseData)
                    setGsStatId(responseData[0].gs_stat_id);
                } else {
                    console.error("Failed to create gs_stat");
                }
            } else {
                body = {
                    "gs_us_id": gsUsId,
                    "gs_stat_name": gsStatName,
                    "gs_stat_acronyme": gsStatAcronyme
                };
                // If gsSupertypeId is provided, update the existing gs supertype
                response = await fetch(`http://localhost:4000/gs_stat/${gsStatId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                if (response.ok) {
                    const responseData = await response.json();
                    console.log('Updated gs_stat: ', responseData)
                } else {
                    console.error("Failed to update gs_stat");
                }
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const onDeleteGsStatClick = async () => {
        try {
            const response = await fetch(`http://localhost:4000/gs_stat/${gsStatId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                console.log("Deleted successfully");
                // Clear gs supertype form fields after deletion
                setGsStatId(null);
                setGsStatName('');
                setGsStatAcronyme('');
            } else {
                console.error("Failed to delete");
            }
        } catch (err) {
            console.error(err.message);
        }
    };
        

    return (
        <div>
            <h4>Add New gsStat</h4>
            <form onSubmit={onSubmitGsStatForm}>
                <label>Name:</label>
                <input type="text" value={gsStatName} onChange={(e) => setGsStatName(e.target.value)} required />
                <label>Acronym:</label>
                <input type="text" value={gsStatAcronyme} onChange={(e) => setGsStatAcronyme(e.target.value)} required />
                <button type="submit">{gsStatId ? "Update" : "Create"}</button>
                {gsStatId && <button type="button" onClick={onDeleteGsStatClick}>Delete</button>}
            </form>
        </div>
    );
};

export default GsStatForm;
