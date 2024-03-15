import React, { useState, useEffect, Fragment, useCallback } from "react";

const AUnitAUpgradeForm = ({ gameSystem, aUpgradeId, aUnits }) => { // issue with updating
    const [aUnitId, setAUnitId] = useState(null);
    const [oldAUnitId, setOldAUnitId] = useState(null);

    const onDeleteAUpgradeAUnitClick = async () => {
        try {
            const response = await fetch(`http://localhost:4000/a_unit_a_upgrade/${oldAUnitId}/${aUpgradeId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                console.log("Deleted successfully");
                setAUnitId(null);
                setOldAUnitId(null);
            } else {
                console.error("Failed to delete");
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const onSubmitAUpgradeAUnitForm = async (e) => {
        e.preventDefault();
        try {
            let body;
            let response;
            if (oldAUnitId === null) {
                body = {
                    "a_unit_id": [Number(aUnitId)],
                    "a_upgrade_id": [aUpgradeId]
                };

                response = await fetch("http://localhost:4000/a_unit_a_upgrade", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                if (response.ok) {
                    const responseData = await response.json();
                    console.log("body: ", responseData);
                    setOldAUnitId(responseData[0].a_unit_id);
                } else {
                    console.error("Failed to create");
                }
            } else { 
                body = { 
                    "a_unit_id": Number(aUnitId),
                    "a_upgrade_id": aUpgradeId
                };

                response = await fetch(`http://localhost:4000/a_unit_a_upgrade/${oldAUnitId}/${aUpgradeId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                if (response.ok) {
                    const responseData = await response.json();
                    setOldAUnitId(responseData[0].a_unit_id);
                } else {
                    console.error("Failed to update");
                    console.log(response)
                }
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div>
            <h1>{oldAUnitId ? "Edit AUnit Link" : "Link new AUnit"}</h1>
            <form onSubmit={onSubmitAUpgradeAUnitForm}>
                <label>AUnit:</label>
                <select value={aUnitId} onChange={(e) => setAUnitId(e.target.value)} required>
                    <option value="">Select AUnit</option>
                    {aUnits.map(([id, name]) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                </select>
                <button type="submit">{oldAUnitId  ? "Update" : "Create"}</button>
                {oldAUnitId && <button type="button" onClick={onDeleteAUpgradeAUnitClick}>Delete</button>}
            </form>
        </div>
    );
};

export default AUnitAUpgradeForm;
