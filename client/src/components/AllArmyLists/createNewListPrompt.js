import React, { useState, useEffect, Fragment, useCallback } from "react";
import {GetArmyList} from './getRequests';

function CreateNewListPrompt({gameSystem}) { // pass in gameSystemId
    
    const [armyListId, setArmyListId] = useState(null);
    const [gameSystemId, setGameSystemId] = useState(null);
    const [gameModeId, setGameModeId] = useState(null);
    const [armyListName, setArmyListName] = useState('');

    const [gameModes, setGameModes] = useState([]);

    useEffect(() => { // RETURN TOO
        if (gameSystem) {
            setGameSystemId(gameSystem[0]);
            // create gameModes, array containing Id  at position [0] and name at position [1]. 
            const gsGM = gameSystem[8];
            console.log(gameSystem)

            const gameModesRelevant = gsGM.map(gameMode => { // issue with
                const target = [ gameMode[0], gameMode [1] ]
                return target;
            });
            console.log(gameModesRelevant);
            setGameModes(gameModesRelevant);
        }
    }, [gameSystem]);

    const onSubmitArmyListForm = async (e) => {
        e.preventDefault();
        try {
            let body;
            let response;

            body = {
                "game_system_id": [gameSystemId],
                "gs_gm_id": [gameModeId],
                "army_list_name": [armyListName]
            };

            response = await fetch("http://localhost:4000/army_list", {//possible false positive
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log("body: ", responseData);
                setArmyListId(responseData[0].armyListId);
            } else {
                console.error("Failed to create");
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div>
            <h1>Create New Army List</h1>
            <form onSubmit={onSubmitArmyListForm}>
                <label>Army List Name:</label>
                <input type="text" value={armyListName} onChange={(e) => setArmyListName(e.target.value)} required />
                <label>Game Mode:</label>
                <select value={gameModeId} onChange={(e) => setGameModeId(e.target.value)} required>
                    <option value="">Select Game Mode</option>
                    {gameModes.map(([id, name]) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                </select>
                <button type="submit">Create Army List</button>
            </form>
        </div>
    );
};

export default CreateNewListPrompt;
