import React, { useState, useEffect} from "react";
import {GetArmyList} from './getRequests';
/**
 * Component for creating a new army list.
 * @param {Array} gameSystem - The selected game system.
 * @param {function} handleClick - Function to handle click event when a new army list is created.
 * @returns {JSX.Element} JSX for the CreateNewListPrompt component.
 */
function CreateNewListPrompt({gameSystem, handleClick}) {
    
    const [armyListId, setArmyListId] = useState(null);
    const [gameSystemId, setGameSystemId] = useState(null);
    const [gameModeId, setGameModeId] = useState(null);
    const [armyListName, setArmyListName] = useState('');

    const [gameModes, setGameModes] = useState([]);
    /**
     * Fetches game modes related to the selected game system.
     */
    useEffect(() => { 
        if (gameSystem) {
            setGameSystemId(gameSystem[0]);
            
            const gsGM = gameSystem[8];

            const gameModesRelevant = gsGM.map(gameMode => {
                const target = [ gameMode[0], gameMode [1] ]
                return target;
            });
            setGameModes(gameModesRelevant);
        }
    }, [gameSystem]);

    /**
     * Fetches the army list based on the selected army list ID.
     */
    useEffect(() => {
        if (armyListId) {
            const fetchData = async () => {
                try {
                    const armyList = await GetArmyList();
                    console.log(armyList);
                    console.log(armyListId);


                    submit(armyList.find(subArray => subArray[0] === armyListId));
                    // setArmyLists(armyList);
                    
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
    }, [armyListId]);

    /**
     * Submits the new army list to the server.
     * @param {Array} NewArmyList - The new army list data.
     */
    const submit = (NewArmyList) => {
        handleClick ({
            "Army_List": NewArmyList,
            "Linked_Game_System": gameSystem,
            "Linked_Armies": []
        });
    };

    /**
     * Handles form submission for creating a new army list.
     * @param {Object} e - Form submission event.
     */
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

            response = await fetch("http://localhost:4000/army_list", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log("body: ", responseData);
                setArmyListId(responseData[0].army_list_id);
            } else {
                console.error("Failed to create");
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    // return (
    //     <div>
    //         <h1>Create New Army List</h1>
    //         <form onSubmit={onSubmitArmyListForm}>
    //             <label>Army List Name:</label>
    //             <input type="text" value={armyListName} onChange={(e) => setArmyListName(e.target.value)} required />
    //             <label>Game Mode:</label>
    //             <select value={gameModeId} onChange={(e) => setGameModeId(e.target.value)} required>
    //                 <option value="">Select Game Mode</option>
    //                 {gameModes.map(([id, name]) => (
    //                     <option key={id} value={id}>{name}</option>
    //                 ))}
    //             </select>
    //             <button type="submit">Create Army List</button>
    //         </form>
    //     </div>
    // );
    return (
        <div className="create-new-list-container">
            <h1 className='new-list-title'>New List</h1>
            <form onSubmit={onSubmitArmyListForm} className="new-list-form">
                <div className="new-list-input-group">
                    <label className="label">Army List Name:</label>
                    <input type="text" value={armyListName} onChange={(e) => setArmyListName(e.target.value)} required className="new-list-input" />
                </div>
                <div className="new-list-input-group">
                    <label className="new-list-label">Game Mode:</label>
                    <select value={gameModeId} onChange={(e) => setGameModeId(e.target.value)} required className="new-list-input">
                        <option value="">Select Game Mode</option>
                        {gameModes.map(([id, name]) => (
                            <option key={id} value={id}>{name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="new-list-create-button">Create Army List</button>
            </form>
        </div>
    );
};

export default CreateNewListPrompt;
