import React, { useState, useEffect, Fragment, useCallback } from "react";

const AUpgradeRuleForm = ({ gameSystem, aUpgradeId, template, remove, index, totalForms, onDeleteConfirmation, onDeleteConfirmationNullId }) => {
    // const [aUnitId, setAUnitId] = useState(null);
    const [ruleId, setRuleId] = useState(null);
    const [oldRuleId, setOldRuleId] = useState(null);
    const [rules, setRules] = useState([]);

    useEffect(() => {
        if (template) {
            setRuleId(template);
            setOldRuleId(template);
        }
    }, [template]);

    const onDeleteAUpgradeRuleClick = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:4000/rule_a_upgrade/${oldRuleId}/${aUpgradeId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                console.log("Deleted successfully");
                setRuleId(null);
                setOldRuleId(null);

                onDeleteConfirmation(); 
            } else {
                console.error("Failed to delete");
            }
        } catch (err) {
            console.error(err.message);
        }
    }, [aUpgradeId, oldRuleId, onDeleteConfirmation]);

    useEffect(() => { 
        if (remove === true){
            if (index === totalForms - 1) {
                console.log("REMOVED"); 
                if (oldRuleId !== null){
                    onDeleteAUpgradeRuleClick();
                } else {
                    onDeleteConfirmationNullId();
                }
            }
        }
    }, [remove, index, totalForms, oldRuleId, onDeleteAUpgradeRuleClick, onDeleteConfirmationNullId]);

    useEffect(() => {
        if (gameSystem) {
            setRules(gameSystem[7]); 
        }
    }, [gameSystem]);

    const onSubmitAUpgradeRuleForm = async (e) => {
        e.preventDefault();
        try {
            let body;
            let response;
            if (oldRuleId === null) {
                body = {
                    "rule_id": [Number(ruleId)],
                    "a_upgrade_id": [aUpgradeId]
                };

                response = await fetch("http://localhost:4000/rule_a_upgrade", {//possible false positive
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                if (response.ok) {
                    const responseData = await response.json();
                    console.log("body: ", responseData);
                    setOldRuleId(responseData[0].rule_id);
                } else {
                    console.error("Failed to create");
                }
            } else { 
                body = { 
                    "rule_id": Number(ruleId),
                    "a_upgrade_id": aUpgradeId
                };

                response = await fetch(`http://localhost:4000/rule_a_upgrade/${oldRuleId}/${aUpgradeId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                if (response.ok) {
                    const responseData = await response.json();
                    setOldRuleId(responseData[0].rule_id);
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
            <h1>{oldRuleId ? "Edit Rule Link" : "Link new Rule"}</h1>
            <form onSubmit={onSubmitAUpgradeRuleForm}>
                <label>Rule:</label>
                <select value={ruleId} onChange={(e) => setRuleId(e.target.value)} required>
                    <option value="">Select Rule</option>
                    {rules.map(([id, name, _]) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                </select>
                <button type="submit">{oldRuleId  ? "Update" : "Create"}</button>
                {oldRuleId && <button type="button" onClick={onDeleteAUpgradeRuleClick}>Delete</button>}
            </form>
        </div>
    );
};

export default AUpgradeRuleForm;
