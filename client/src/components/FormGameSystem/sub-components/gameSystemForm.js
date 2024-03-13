import React, { useState, useEffect, Fragment, useCallback } from "react";
import GsSupertypeForm from "./gsSupertypeForm";
import GsStatForm from "./gsStatForm";
import RuleForm from "./ruleForm";

const GameSystemForm = ({ template }) => {
    const [gameSystemId, setGameSystemId] = useState(null);
    const [gameSystemName, setGameSystemName] = useState('');
    const [gameSystemEdition, setGameSystemEdition] = useState('');
    const [gameSystemVersion, setGameSystemVersion] = useState('');

    const [gsUsId, setGsUsId] = useState(null);

    const [gsStats, setGsStats] = useState([]);
    const [gsSupertypes, setGsSupertypes] = useState([]);
    const [rules, setRules] = useState([]);

    const [numGsSupertypeForms, setNumGsSupertypeForms] = useState(1);
    const [numGsStatForms, setNumGsStatForms] = useState(1);
    const [numRuleForms, setNumRuleForms] = useState(1);

    const [removedGsSupertype, setRemovedGsSupertype] = useState(false);
    const [removedGsStat, setRemovedGsStat] = useState(false);
    const [removedRule, setRemovedRule] = useState(false);

    useEffect(() => {
        if (template) {
            const [id, name, edition, version, usId, gsStatsArr, gsSupertypesArr, rulesArr] = template;
            setGameSystemId(id);
            setGameSystemName(name);
            setGameSystemEdition(edition);
            setGameSystemVersion(version);
            setGsUsId(usId);
            setGsStats(gsStatsArr);
            setNumGsStatForms(gsStatsArr.length);
            setGsSupertypes(gsSupertypesArr);
            setNumGsSupertypeForms(gsSupertypesArr.length);
            setRules(rulesArr);
            setNumRuleForms(rulesArr.length);
        }
    }, [template]);

    const onSubmitGameSystemForm = async (e) => {
        e.preventDefault();
        try {
            let body;
            let response;
            let response_unit_structure;
            if (gameSystemId === null) {
                body = {
                    "game_system_name": [gameSystemName],
                    "game_system_edition": [gameSystemEdition],
                    "game_system_version": [gameSystemVersion]
                };
                response = await fetch("http://localhost:4000/game_system", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                if (response.ok) {
                    const responseData = await response.json();
                    console.log("body: ", responseData);
                    setGameSystemId(responseData[0].game_system_id);
                    if (gsUsId === null) {
                        const body_unitStructure = {
                            "game_system_id": [responseData[0].game_system_id]
                        };
                        response_unit_structure = await fetch("http://localhost:4000/gs_unit_structure",{
                            method: "POST",
                            headers: {"Content-Type": "application/json"},
                            body: JSON.stringify(body_unitStructure)
                        });
                        if (response_unit_structure.ok) {
                            const response_unit_structureData = await response_unit_structure.json();
                            console.log(response_unit_structureData);
                            setGsUsId(response_unit_structureData[0].gs_us_id);
                        }
                    }

                } else {
                    console.error("Failed to create game system");
                }
            } else {
                body = {
                    "game_system_name": gameSystemName,
                    "game_system_edition": gameSystemEdition,
                    "game_system_version": gameSystemVersion
                };
                response = await fetch(`http://localhost:4000/game_system/${gameSystemId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                if (!response.ok) {
                    console.error("Failed to update game system");
                }
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const onDeleteClick = async () => {
        try {
            const response = await fetch(`http://localhost:4000/game_system/${gameSystemId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                console.log("Deleted successfully");
                setGameSystemId(null);
                setGameSystemName('');
                setGameSystemEdition('');
                setGameSystemVersion('');
            } else {
                console.error("Failed to delete");
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const addGsSupertypeForm = () => {
        setNumGsSupertypeForms(prev => prev + 1); 
    };
    const removeGsSupertypeForm = () => {
        if (gsSupertypes.length !== 0) {
            setGsSupertypes(gsSupertypes.slice(0, gsSupertypes.length - 1));
        }
        setRemovedGsSupertype(true);
    };

    const addGsStatForm = () => {
        setNumGsStatForms(prev => prev + 1);
    };
    const removeGsStatForm = () => {
        if (gsStats.length !== 0) {
            setGsStats(gsStats.slice(0, gsStats.length - 1));
        }
        setRemovedGsStat(true);
    };

    const addRuleForm = () => {
        setNumRuleForms(prev => prev + 1);
    };
    const removeRuleForm = () => {
        if (rules.length !== 0) {
            setRules(rules.slice(0, rules.length - 1));
        }
        setRemovedRule(true);
        // setNumRuleForms(prev => prev - 1); 
    };

    const handleGsSupertypeRemoveConfirmation = useCallback(() => {
        setRemovedGsSupertype(false);
        setNumGsSupertypeForms(prev => prev - 1); 
    }, []);
    const handleGsSupertypeDeletionConfirmation = useCallback(() => {
        setRemovedGsSupertype(false);
        setNumGsSupertypeForms(prev => prev - 1); 
    }, []);

    const handleGsStatRemoveConfirmation = useCallback(() => {
        setRemovedGsStat(false);
        setNumGsStatForms(prev => prev - 1); 
    }, []);
    const handleGsStatDeletionConfirmation = useCallback(() => {
        setRemovedGsStat(false);
        setNumGsStatForms(prev => prev - 1); 
    }, []);

    const handleRuleRemoveConfirmation = useCallback(() => {
        setRemovedRule(false);
        setNumRuleForms(prev => prev - 1); 
    }, []);
    const handleRuleDeletionConfirmation = useCallback(() => {
        setRemovedRule(false);
        setNumRuleForms(prev => prev - 1); 
    }, []);

    return (
        <div>
            <h1>{gameSystemId ? "Edit Game System" : "Add New Game System"}</h1>
            <form onSubmit={onSubmitGameSystemForm}>
                <label>Name:</label>
                <input type="text" value={gameSystemName} onChange={(e) => setGameSystemName(e.target.value)} required />
                <label>Edition:</label>
                <input type="text" value={gameSystemEdition} onChange={(e) => setGameSystemEdition(e.target.value)} required />
                <label>Version:</label>
                <input type="number" value={gameSystemVersion} onChange={(e) => setGameSystemVersion(e.target.value)} required />
                <button type="submit">{gameSystemId ? "Update" : "Create"}</button>
                {gameSystemId && <button type="button" onClick={onDeleteClick}>Delete</button>}
            </form>

            {gameSystemId && (
                <Fragment>
                    {/* <div>
                        <h2>Manage GsSupertypes</h2>
                        {[...Array(numGsSupertypeForms)].map((_, index) => (
                            <GsSupertypeForm 
                                key={index} 
                                gameSystemId={gameSystemId} 
                                template={gsSupertypes[index]} 
                            />
                        ))}
                        <button onClick={addGsSupertypeForm}>Add New GsSupertype</button>
                        <button onClick={removeGsSupertypeForm}>Remove Newest GsSupertype</button>
                    </div> */}
                    <div>
                        <h2>Manage GsSupertype</h2>
                        {[...Array(numGsSupertypeForms)].map((_, index) => (
                            <GsSupertypeForm 
                                key={index} 
                                gameSystemId={gameSystemId}
                                template={gsSupertypes[index]} 
                                remove={removedGsSupertype}
                                index={index} 
                                totalForms={numGsSupertypeForms} 
                                onDeleteConfirmation={handleGsSupertypeDeletionConfirmation}
                                onDeleteConfirmationNullId={handleGsSupertypeRemoveConfirmation}
                            /> 
                        ))}
                        <button onClick={addGsSupertypeForm}>Add New GsSupertype</button>
                        {numGsSupertypeForms > 0 && <button onClick={removeGsSupertypeForm}>Remove Newest GsSupertype</button>}
                    </div>



                    <div>
                        <h2>Manage GsStat</h2>
                        {[...Array(numGsStatForms)].map((_, index) => (
                            <GsStatForm 
                                key={index} 
                                gsUsId={gsUsId} 
                                template={gsStats[index]} 
                                remove={removedGsStat}
                                index={index} 
                                totalForms={numGsStatForms} 
                                onDeleteConfirmation={handleGsStatDeletionConfirmation}
                                onDeleteConfirmationNullId={handleGsStatRemoveConfirmation}
                            /> 
                        ))}
                        <button onClick={addGsStatForm}>Add New GsStat</button>
                        {numGsStatForms > 0 && <button onClick={removeGsStatForm}>Remove Newest GsStat</button>}
                    </div>

                    <div>
                        <h2>Manage Rule</h2>
                        {[...Array(numRuleForms)].map((_, index) => (
                            <RuleForm 
                                key={index} 
                                gameSystemId={gameSystemId} 
                                gsUsId={gsUsId} 
                                template={rules[index]}
                                remove={removedRule}
                                ruleFormIndex={index} 
                                totalForms={numRuleForms} 
                                onDeleteConfirmation={handleRuleDeletionConfirmation}
                                onDeleteConfirmationNullId={handleRuleRemoveConfirmation}
                            />
                        ))}
                        <button onClick={addRuleForm}>Add New Rule</button>
                        <button onClick={removeRuleForm}>Remove Newest Rule</button>
                    </div>
                </Fragment>
            )}
        </div>
    );
};

export default GameSystemForm;
