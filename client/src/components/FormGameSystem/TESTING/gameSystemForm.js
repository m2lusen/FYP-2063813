import React, { useState, Fragment } from "react";
import GsSupertypeForm from "./gsSupertypeForm";

const GameSystemForm = () => {
    const [gameSystemId, setGameSystemId] = useState(null);
    const [gameSystemName, setGameSystemName] = useState('');
    const [gameSystemEdition, setGameSystemEdition] = useState('');
    const [gameSystemVersion, setGameSystemVersion] = useState('');

    const onSubmitGameSystemForm = async (e) => {
        e.preventDefault();
        try {
            let body;
            let response;
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
                    setGameSystemId(responseData[0].game_system_id);
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

    const [numGsSupertypeForms, setNumGsSupertypeForms] = useState(1); // State to track the number of GsSupertypeForms

    const addGsSupertypeForm = () => {
        setNumGsSupertypeForms(prev => prev + 1); // Increment the number of GsSupertypeForms
    };

    const removeGsSupertypeForm = () => {
        setNumGsSupertypeForms(prev => prev - 1); // Increment the number of GsSupertypeForms
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
                </Fragment>
            )}
        </div>
    );
};

export default GameSystemForm;
