import React, { useState, useEffect, Fragment, useCallback } from "react";

function unpackIntersection(IntersectionString) {
    const [unit, upgrade] = IntersectionString.split(' - ').map(num => parseInt(num.trim()));
    return [unit, upgrade];
}

const IntersectionForm = ({ aUnits, aUpgrades, Intersection, remove, index, totalForms, onDeleteConfirmation, onDeleteConfirmationNullId }) => {
    // const [aUnitId, setAUnitId] = useState(null);
    const [aUnitId, setAUnitId] = useState(null);
    const [oldAUnitId, setOldAUnitId] = useState(null);

    const [aUpgradeId, setAUpgradeId] = useState(null);
    const [oldAUpgradeId, setOldAUpgradeId] = useState(null);

    useEffect(() => {
        if (Intersection) {
            let intersect = unpackIntersection(Intersection[0]);
            setAUnitId(intersect[0]);
            setOldAUnitId(intersect[0]);
            setAUpgradeId(intersect[1]);
            setOldAUpgradeId(intersect[1]);
        }
    }, [Intersection]);

    const onDeleteIntersectionClick = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:4000/a_unit_a_upgrade/${oldAUnitId}/${oldAUpgradeId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                console.log("Deleted successfully");
                setAUnitId(null);
                setOldAUnitId(null);

                setAUpgradeId(null);
                setOldAUpgradeId(null);

                onDeleteConfirmation(); 
            } else {
                console.error("Failed to delete");
            }
        } catch (err) {
            console.error(err.message);
        }
    }, [oldAUnitId, oldAUpgradeId, onDeleteConfirmation]);

    useEffect(() => { 
        if (remove === true){
            if (index === totalForms - 1) {
                console.log("REMOVED"); 
                if (oldAUnitId !== null && oldAUpgradeId !== null){
                    onDeleteIntersectionClick();
                } else {
                    onDeleteConfirmationNullId();
                }
            }
        }
    }, [remove, index, totalForms, oldAUnitId, oldAUpgradeId, onDeleteIntersectionClick, onDeleteConfirmationNullId]);

    const onSubmitIntersectionForm = async (e) => {
        e.preventDefault();
        try {
            let body;
            let response;
            if (oldAUnitId === null || oldAUpgradeId === null ) {
                body = {
                    "a_unit_id": [Number(aUnitId)],
                    "a_upgrade_id": [Number(aUpgradeId)]
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
                    setOldAUpgradeId(responseData[0].a_upgrade_id);
                } else {
                    console.error("Failed to create");
                }
            } else { 
                body = {
                    "a_unit_id": Number(aUnitId),
                    "a_upgrade_id": Number(aUpgradeId)
                };
                console.log('update')
                response = await fetch(`http://localhost:4000/a_unit_a_upgrade/${oldAUnitId}/${oldAUpgradeId}`, {// issue updation
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                if (response.ok) {
                    const responseData = await response.json();
                    setOldAUnitId(responseData[0].a_unit_id);
                    setOldAUpgradeId(responseData[0].a_upgrade_id)
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
            <h1>{oldAUnitId && oldAUpgradeId ? "Edit AUnit Link" : "Link new AUnit"}</h1>
            <form onSubmit={onSubmitIntersectionForm}>
                <label>AUnit:</label>
                <select value={aUnitId} onChange={(e) => setAUnitId(e.target.value)} required>
                    <option value="">Select unit</option>
                    {aUnits.map(([id, _, name]) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                </select>
                <select value={aUpgradeId} onChange={(e) => setAUpgradeId(e.target.value)} required>
                    <option value="">Select upgrade</option>
                    {aUpgrades.map(([id, _, name]) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                </select>
                <button type="submit">{oldAUnitId && oldAUpgradeId ? "Update" : "Create"}</button>
                {oldAUnitId && oldAUpgradeId && <button type="button" onClick={onDeleteIntersectionClick}>Delete</button>}
            </form>
        </div>
    );
};

export default IntersectionForm;
