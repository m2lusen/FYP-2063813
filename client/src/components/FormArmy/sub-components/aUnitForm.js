import React, { useState, useEffect, Fragment, useCallback } from "react";
import StatlineForm from "./statlineForm";
import AUnitRuleForm from "./aUnitRuleForm";
import AUnitKeywordForm from "./aUnitKeywordForm";

const AUnitForm = ({ gameSystem, armyId, template, remove, index, totalForms, onDeleteConfirmation, onDeleteConfirmationNullId }) => {

    const [aUnitId, setAUnitId] = useState(null);
    const [gsSupertypeId, setGsSupertypeId] = useState(null);
    const [aUnitName, setAUnitName] = useState('');
    const [aUnitPC, setAUnitPC] = useState(0);
    const [aUnitMin, setAUnitMin] = useState(null);
    const [gsSupertypes, setGsSupertypes] = useState([]);

    const [statlines, setStatlines] = useState([]);
    const [aUnitRules, setAUnitRules] = useState([]);
    const [aUnitKeywords, setAUnitKeywords] = useState([]);

    const [numStatlineForms, setNumStatlineForms] = useState(1);
    const [numAUnitRuleForms, setNumAUnitRuleForms] = useState(1);
    const [numAUnitKeywordForms, setNumAUnitKeywordForms] = useState(1);

    const [removedStatline, setRemovedStatline] = useState(false);
    const [removedAUnitRule, setRemovedAUnitRule] = useState(false); // possibly not necessary
    const [removedAUnitKeyword, setRemovedAUnitKeyword] = useState(false); // possibly not necessary

    useEffect(() => {
        if (template) {
            const [id, supertype_id, name, pc, min, aUnitRulesArr, aUnitKeywordsArr, statlinesArr] = template;
            setAUnitId(id);
            setGsSupertypeId(supertype_id);
            setAUnitName(name);
            setAUnitPC(pc);
            setAUnitMin(min);
            setAUnitRules(aUnitRulesArr);
            setNumAUnitRuleForms(aUnitRulesArr.length);
            setAUnitKeywords(aUnitKeywordsArr);
            setNumAUnitKeywordForms(aUnitKeywordsArr.length);
            setStatlines(statlinesArr);
            setNumStatlineForms(statlinesArr.length);
        }
    }, [template]);

    const onDeleteAUnitClick = useCallback(async () => { // will need to be updated so that all a_statline and all a_upgrade will also be deleted 
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
                    "gs_supertype_id": [Number(gsSupertypeId)],
                    "a_unit_name": [aUnitName],
                    "a_unit_pc": [aUnitPC],
                    "a_unit_limit_per_army": [aUnitMin] 
                };

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
                    "gs_supertype_id": Number(gsSupertypeId),
                    "a_unit_name": aUnitName,
                    "a_unit_pc": aUnitPC,
                    "a_unit_limit_per_army": aUnitMin
                };

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
        if (statlines.length !== 0) {
            setStatlines(statlines.slice(0, statlines.length - 1));
        }
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

    const addAUnitRuleForm = () => {
        setNumAUnitRuleForms(prev => prev + 1); 
    };
    const removeAUnitRuleForm = () => {
        if (aUnitRules.length !== 0) {
            setAUnitRules(aUnitRules.slice(0, aUnitRules.length - 1));
        }
        setRemovedAUnitRule(true);
    };
    const handleAUnitRuleRemoveConfirmation = useCallback(() => {
        setRemovedAUnitRule(false);
        setNumAUnitRuleForms(prev => prev - 1); 
    }, []);
    const handleAUnitRuleDeletionConfirmation = useCallback(() => {
        setRemovedAUnitRule(false);
        setNumAUnitRuleForms(prev => prev - 1); 
    }, []);

    const addAUnitKeywordForm = () => {
        setNumAUnitKeywordForms(prev => prev + 1); 
    };
    const removeAUnitKeywordForm = () => {
        if (aUnitKeywords.length !== 0) {
            setAUnitKeywords(aUnitKeywords.slice(0, aUnitKeywords.length - 1));
        }
        setRemovedAUnitKeyword(true);
    };
    const handleAUnitKeywordRemoveConfirmation = useCallback(() => {
        setRemovedAUnitKeyword(false);
        setNumAUnitKeywordForms(prev => prev - 1); 
    }, []);
    const handleAUnitKeywordDeletionConfirmation = useCallback(() => {
        setRemovedAUnitKeyword(false);
        setNumAUnitKeywordForms(prev => prev - 1); 
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

                    <div>
                        <h2>Manage Rules</h2>
                        {[...Array(numAUnitRuleForms)].map((_, index) => (
                            <AUnitRuleForm 
                                key={index} 
                                gameSystem={gameSystem}
                                aUnitId={aUnitId} 
                                template={aUnitRules[index]}
                                remove={removedAUnitRule} 
                                index={index} 
                                totalForms={numAUnitRuleForms} 
                                onDeleteConfirmation={handleAUnitRuleDeletionConfirmation}
                                onDeleteConfirmationNullId={handleAUnitRuleRemoveConfirmation}
                            /> 
                        ))}
                        <button onClick={addAUnitRuleForm}>Link new Rule</button>
                        {numAUnitRuleForms > 0 && <button onClick={removeAUnitRuleForm}>Remove Newest Rule</button>}
                    </div>

                    <div>
                        <h2>Manage Keywords</h2>
                        {[...Array(numAUnitKeywordForms)].map((_, index) => (
                            <AUnitKeywordForm 
                                key={index} 
                                gameSystem={gameSystem}
                                aUnitId={aUnitId} 
                                template={aUnitKeywords[index]}
                                remove={removedAUnitKeyword} 
                                index={index} 
                                totalForms={numAUnitKeywordForms} 
                                onDeleteConfirmation={handleAUnitKeywordDeletionConfirmation}
                                onDeleteConfirmationNullId={handleAUnitKeywordRemoveConfirmation}
                            /> 
                        ))}
                        <button onClick={addAUnitKeywordForm}>Link new Keyword</button>
                        {numAUnitKeywordForms > 0 && <button onClick={removeAUnitKeywordForm}>Remove Newest Keyword</button>}
                    </div>
                </Fragment>
            )}
        </div>
    );
};

export default AUnitForm;
