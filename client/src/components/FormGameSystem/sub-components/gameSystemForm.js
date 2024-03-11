// IS GOING TO modified so that after a nested array is added, auto fills out form according to said array

import React, { useState, useEffect, Fragment } from "react";
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

    useEffect(() => {
        if (template) {
            const [id, name, edition, version, usId, gsStatsArr, gsSupertypesArr, rulesArr] = template;
            setGameSystemId(id);
            setGameSystemName(name);
            setGameSystemEdition(edition);
            setGameSystemVersion(version);
            setGsUsId(usId);
            // Additional logic to handle gsStats, gsSupertypes, and rules
            setGsStats(gsStatsArr);
            setNumGsStatForms(gsStatsArr.length);
            setGsSupertypes(gsSupertypesArr);
            setNumGsSupertypeForms(gsSupertypesArr.lengt);
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
        setNumGsSupertypeForms(prev => prev - 1); 
    };

    const addGsStatForm = () => {
        setNumGsStatForms(prev => prev + 1);
    };
    const removeGsStatForm = () => {
        setNumGsStatForms(prev => prev - 1); 
    };

    const addRuleForm = () => {
        setNumRuleForms(prev => prev + 1);
    };
    const removeRuleForm = () => {
        setNumRuleForms(prev => prev - 1); 
    };

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
                    <div>
                        <h2>Manage GsSupertypes</h2>
                        {[...Array(numGsSupertypeForms)].map((_, index) => (
                            <GsSupertypeForm key={index} gameSystemId={gameSystemId} />
                        ))}
                        <button onClick={addGsSupertypeForm}>Add New GsSupertype</button>
                        <button onClick={removeGsSupertypeForm}>Remove Newest GsSupertype</button>
                    </div>
                    {/* <div>
                    <h2>Manage GsStat</h2>
                        {[...Array(numGsStatForms)].map((_, index) => (
                            <GsStatForm key={index} gsUsId={gsUsId} template={gsStats} />
                        ))}
                        <button onClick={addGsStatForm}>Add New GsStat</button>
                        <button onClick={removeGsStatForm}>Remove Newest GsStat</button>
                    </div> */}
                    {/* <div>
                        <h2>Manage GsStat</h2>
                        {gsStats.map((stat, index) => (
                            <GsStatForm key={index} gsUsId={gsUsId} template={stat} />
                        ))}
                        <button onClick={addGsStatForm}>Add New GsStat</button>
                        <button onClick={removeGsStatForm}>Remove Newest GsStat</button>
                    </div> */}
                    <div>
                        <h2>Manage GsStat</h2>
                        {gsStats.length >= numGsStatForms ? (
                            gsStats.map((stat, index) => (
                                <GsStatForm key={index} gsUsId={gsUsId} template={stat} />
                            ))
                        ) : (
                            [...Array(numGsStatForms)].map((_, index) => (
                                <GsStatForm key={index} gsUsId={gsUsId} template={null} />
                            ))
                        )}
                        <button onClick={addGsStatForm}>Add New GsStat</button>
                        <button onClick={removeGsStatForm}>Remove Newest GsStat</button>
                    </div>
                    <div>
                        <h2>Manage Rule</h2>
                        {[...Array(numRuleForms)].map((_, index) => (
                            <RuleForm key={index} gameSystemId={gameSystemId} gsUsId={gsUsId}/>
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
