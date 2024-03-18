import React, { useState, useEffect, Fragment, useCallback } from "react";
import AUpgradeRuleForm from "./aUpgradeRuleForm";
import AUpgradeKeywordForm from "./aUpgradeKeywordForm";


const AUpgradeForm = ({ gameSystem, armyId, aUTId, template, remove, index, totalForms, onDeleteConfirmation, onDeleteConfirmationNullId }) => {

    const [aUpgradeId, setAUpgradeId] = useState(null);
    const [aUpgradePc, setAUpgradePc] = useState(0);
    const [aUpgradeName, setAUpgradeName] = useState('');

    const [aUpgradeRules, setAUpgradeRules] = useState([]);
    const [aUpgradeKeywords, setAUpgradeKeywords] = useState([]);

    const [numAUpgradeRuleForms, setNumAUpgradeRuleForms] = useState(1);
    const [numAUpgradeKeywordForms, setNumAUpgradeKeywordForms] = useState(1);

    const [removedAUpgradeRule, setRemovedAUpgradeRule] = useState(false);
    const [removedAUpgradeKeyword, setRemovedAUpgradeKeyword] = useState(false);

    useEffect(() => {
        if (template) {
            const [id, pc, name, upgradesRulesArr, aUpgradesKeywordsArr] = template;
            setAUpgradeId(id);
            setAUpgradePc(pc);
            setAUpgradeName(name);
            setAUpgradeRules(upgradesRulesArr);
            setNumAUpgradeRuleForms(upgradesRulesArr.length);
            setAUpgradeKeywords(aUpgradesKeywordsArr);
            setNumAUpgradeKeywordForms(aUpgradesKeywordsArr.length);
        }
    }, [template]);

    const onDeleteAUpgradeClick = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:4000/a_upgrade/${aUpgradeId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                console.log("Deleted successfully");
                setAUpgradeId(null);
                setAUpgradeName(0);
                setAUpgradePc('');

                onDeleteConfirmation(); 
            } else {
                console.error("Failed to delete");
            }
        } catch (err) {
            console.error(err.message);
        }
    }, [aUpgradeId, onDeleteConfirmation]);

    useEffect(() => { 
        if (remove === true){
            if (index === totalForms - 1) {
                console.log("REMOVED"); 
                if (aUpgradeId !== null){
                    onDeleteAUpgradeClick();
                } else {
                    onDeleteConfirmationNullId();
                }
            }
        }
    }, [remove, index, totalForms, aUpgradeId, onDeleteAUpgradeClick, onDeleteConfirmationNullId]);

    const onSubmitAUpgradeForm = async (e) => {
        e.preventDefault();
        try {
            let body;
            let response;
            if (aUpgradeId === null) {
                body = {
                    "a_ut_id": [aUTId],
                    "a_upgrade_pc": [aUpgradePc],
                    "a_upgrade_name": [aUpgradeName]
                };

                response = await fetch("http://localhost:4000/a_upgrade", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                if (response.ok) {
                    const responseData = await response.json();
                    console.log("body: ", responseData);
                    setAUpgradeId(responseData[0].a_upgrade_id);
                } else {
                    console.error("Failed to create");
                }
            } else { 
                body = {
                    "a_ut_id": aUTId,
                    "a_upgrade_pc": aUpgradePc,
                    "a_upgrade_name": aUpgradeName
                };

                response = await fetch(`http://localhost:4000/a_upgrade/${aUpgradeId}`, {
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

    const addAUpgradeRuleForm = () => {
        setNumAUpgradeRuleForms(prev => prev + 1); 
    };
    const removeAUpgradeRuleForm = () => {
        if (aUpgradeRules.length !== 0) {
            setAUpgradeRules(aUpgradeRules.slice(0, aUpgradeRules.length - 1));
        }
        setRemovedAUpgradeRule(true);
    };
    const handleAUpgradeRuleRemoveConfirmation = useCallback(() => {
        setRemovedAUpgradeRule(false);
        setNumAUpgradeRuleForms(prev => prev - 1); 
    }, []);
    const handleAUpgradeRuleDeletionConfirmation = useCallback(() => {
        setRemovedAUpgradeRule(false);
        setNumAUpgradeRuleForms(prev => prev - 1); 
    }, []);

    const addAUpgradeKeywordForm = () => {
        setNumAUpgradeKeywordForms(prev => prev + 1); 
    };
    const removeAUpgradeKeywordForm = () => {
        if (aUpgradeKeywords.length !== 0) {
            setAUpgradeKeywords(aUpgradeKeywords.slice(0, aUpgradeKeywords.length - 1));
        }
        setRemovedAUpgradeKeyword(true);
    };
    const handleAUpgradeKeywordRemoveConfirmation = useCallback(() => {
        setRemovedAUpgradeKeyword(false);
        setNumAUpgradeKeywordForms(prev => prev - 1); 
    }, []);
    const handleAUpgradeKeywordDeletionConfirmation = useCallback(() => {
        setRemovedAUpgradeKeyword(false);
        setNumAUpgradeKeywordForms(prev => prev - 1); 
    }, []);

    return (
        <div>
            <h1>{aUpgradeId ? "Edit Upgrade" : "Add New Upgrade"}</h1>
            <form onSubmit={onSubmitAUpgradeForm}>
                <label>Name:</label>
                <input type="text" value={aUpgradeName} onChange={(e) => setAUpgradeName(e.target.value)} required />
                <label>Point Cost:</label>
                <input type="number" value={aUpgradePc} onChange={(e) => setAUpgradePc(e.target.value)} required/>

                <button type="submit">{aUpgradeId ? "Update" : "Create"}</button>
                {aUpgradeId && <button type="button" onClick={onDeleteAUpgradeClick}>Delete</button>}
            </form>

            {aUpgradeId && (
                <Fragment>
                    <div>
                        <h2>Manage Rules</h2>
                        {[...Array(numAUpgradeRuleForms)].map((_, index) => (
                            <AUpgradeRuleForm 
                                key={index} 
                                gameSystem={gameSystem}
                                aUpgradeId={aUpgradeId} 
                                template={aUpgradeRules[index]}
                                remove={removedAUpgradeRule} 
                                index={index} 
                                totalForms={numAUpgradeRuleForms} 
                                onDeleteConfirmation={handleAUpgradeRuleDeletionConfirmation}
                                onDeleteConfirmationNullId={handleAUpgradeRuleRemoveConfirmation}
                            /> 
                        ))}
                        <button onClick={addAUpgradeRuleForm}>Link new Rule</button>
                        {numAUpgradeRuleForms > 0 && <button onClick={removeAUpgradeRuleForm}>Remove Newest Rule</button>}
                    </div>

                    <div>
                        <h2>Manage keywords</h2>
                        {[...Array(numAUpgradeKeywordForms)].map((_, index) => (
                            <AUpgradeKeywordForm 
                                key={index} 
                                gameSystem={gameSystem}
                                aUpgradeId={aUpgradeId} 
                                template={aUpgradeKeywords[index]}
                                remove={removedAUpgradeKeyword} 
                                index={index} 
                                totalForms={numAUpgradeKeywordForms} 
                                onDeleteConfirmation={handleAUpgradeKeywordDeletionConfirmation}
                                onDeleteConfirmationNullId={handleAUpgradeKeywordRemoveConfirmation}
                            /> 
                        ))}
                        <button onClick={addAUpgradeKeywordForm}>Link new Keyword</button>
                        {numAUpgradeKeywordForms > 0 && <button onClick={removeAUpgradeKeywordForm}>Remove Newest Keyword</button>}
                    </div>

                </Fragment>
            )}
        </div>
    );
};

export default AUpgradeForm;
