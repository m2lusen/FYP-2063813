import React, { useState, useEffect, useCallback } from "react";
import { GetArmyList } from "../getRequests";

const ArmyListUpdate = ({ gameSystem, armyList, armies, handleCreate }) => {

    const [gameModeId, setGameModeId] = useState(null);
    const [armyListName, setArmyListName] = useState('');

    const [gameModes, setGameModes] = useState(null);

    const [updated, setUpdated] = useState(false);

    useEffect(() => { 
        if (!gameModes) {            
            const gsGM = gameSystem[8];
            const gameModesRelevant = gsGM.map(gameMode => {
                const target = [ gameMode[0], gameMode [1] ] // not working
                return target;
            });
            setGameModes(gameModesRelevant);
        }
    }, [gameModes]);

    const onSubmitArmyListForm = async (e) => {
        e.preventDefault();
        try {
            let body;
            let response;

            body = {
                "game_system_id": gameSystem[0],
                "gs_gm_id": gameModeId,
                "army_list_name": armyListName
            };

            response = await fetch(`http://localhost:4000/army_list/${armyList[0]}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log("body: ", responseData);
                setUpdated(true);
            } else {
                console.error("Failed to update");
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        if (updated) {
            const fetchData = async () => {
                try {
                    const newLists = await GetArmyList();

                    const newTemplate = {
                        "Army_List": newLists.find(subArray => subArray[0] === armyList[0]),
                        "Linked_Game_System": gameSystem,
                        "Linked_Armies": armies
                    }

                    handleCreate(newTemplate);
                    
                    setUpdated(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
    }, [updated]);

    return (
        <div>
            {gameModes ? (
                <div>
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
                        <button type="submit">Update Army List</button>
                    </form>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default ArmyListUpdate;