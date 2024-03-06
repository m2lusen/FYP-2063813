// import React, { Fragment, useState, useEffect } from "react";

// const GameSystemForm = () => {
//     const [gameSystemId, setGameSystemId] = useState(null);
//     const [gameSystemName, setGameSystemName] = useState('');
//     const [gameSystemEdition, setGameSystemEdition] = useState('');
//     const [gameSystemVersion, setGameSystemVersion] = useState('');

//     useEffect(() => {
//         // Fetch the game system if gameSystemId is provided
//         if (gameSystemId !== null) {
//             fetchGameSystem();
//         }
//     }, [gameSystemId]);

//     const fetchGameSystem = async () => {
//         try {
//             const response = await fetch(`http://localhost:4000/game_system/${gameSystemId}`);
//             if (response.ok) {
//                 const data = await response.json();
//                 setGameSystemName(data.game_system_name);
//                 setGameSystemEdition(data.game_system_edition);
//                 setGameSystemVersion(data.game_system_version);
//             } else {
//                 console.error("Failed to fetch game system");
//             }
//         } catch (err) {
//             console.error(err.message);
//         }
//     };

//     const onSubmitForm = async (e) => {
//         e.preventDefault(); // stops refreshing
//         try {
//             const body = {
//                 "game_system_name": [gameSystemName],
//                 "game_system_edition": [gameSystemEdition],
//                 "game_system_version": [gameSystemVersion]
//             };
//             let response;
//             if (gameSystemId === null) {
//                 // If gameSystemId is not provided, create a new game system
//                 console.log("inserting");
//                 response = await fetch("http://localhost:4000/game_system", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(body)
//                 });
//             } else {
//                 console.log("inserting");
//                 // If gameSystemId is provided, update the existing game system
//                 response = await fetch(`http://localhost:4000/game_system/${gameSystemId}`, {
//                     method: "PUT",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(body)
//                 });
//             }

//             if (response.ok) {
//                 console.log("Operation successful");
//                 console.log(gameSystemId); // TEMPORARY
//             } else {
//                 console.error("Failed to perform operation");
//             }
//         } catch (err) {
//             console.error(err.message);
//         }
//     };

//     const onDeleteClick = async () => {
//         try {
//             const response = await fetch(`http://localhost:4000/game_system/${gameSystemId}`, {
//                 method: "DELETE"
//             });

//             if (response.ok) {
//                 console.log("Deleted successfully");
//                 // Clear form fields after deletion
//                 setGameSystemId(null);
//                 setGameSystemName('');
//                 setGameSystemEdition('');
//                 setGameSystemVersion('');
//             } else {
//                 console.error("Failed to delete");
//             }
//         } catch (err) {
//             console.error(err.message);
//         }
//     };

//     return (
//         <Fragment>
//             <h1>{gameSystemId ? "Edit Game System" : "Add New Game System"}</h1>
//             <form onSubmit={onSubmitForm}>
//                 <label>Name:</label>
//                 <input type="text" value={gameSystemName} onChange={(e) => setGameSystemName(e.target.value)} required />
//                 <label>Edition:</label>
//                 <input type="text" value={gameSystemEdition} onChange={(e) => setGameSystemEdition(e.target.value)} required />
//                 <label>Version:</label>
//                 <input type="number" value={gameSystemVersion} onChange={(e) => setGameSystemVersion(e.target.value)} required />
//                 <button type="submit">{gameSystemId ? "Update" : "Create"}</button>
//                 {gameSystemId && <button type="button" onClick={onDeleteClick}>Delete</button>}
//             </form>
//         </Fragment>
//     );
// };

// export default GameSystemForm;

import React, { Fragment, useState, useEffect } from "react";

const GameSystemForm = () => {
    const [gameSystemId, setGameSystemId] = useState(null);
    const [gameSystemName, setGameSystemName] = useState('');
    const [gameSystemEdition, setGameSystemEdition] = useState('');
    const [gameSystemVersion, setGameSystemVersion] = useState('');

    const onSubmitForm = async (e) => {
        e.preventDefault(); // stops refreshing
        try {
            let body;
            let response;
            if (gameSystemId === null) {
                body = {
                    "game_system_name": [gameSystemName],
                    "game_system_edition": [gameSystemEdition],
                    "game_system_version": [gameSystemVersion]
                };
                // If gameSystemId is not provided, create a new game system
                response = await fetch("http://localhost:4000/game_system", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
            } else {
                body = {
                    "game_system_name": gameSystemName,
                    "game_system_edition": gameSystemEdition,
                    "game_system_version": gameSystemVersion
                };
                // If gameSystemId is provided, update the existing game system
                response = await fetch(`http://localhost:4000/game_system/${gameSystemId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
            }

            if (response.ok) {
                console.log("Operation successful");
                const responseData = await response.json();
                console.log("response Data: ", responseData);
                // If inserting a new game system, set the returned game_system_id
                if (gameSystemId === null) {
                    setGameSystemId(responseData[0].game_system_id);
                }
            } else {
                console.error("Failed to perform operation");
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
                // Clear form fields after deletion
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

    return (
        <Fragment>
            <h1>{gameSystemId ? "Edit Game System" : "Add New Game System"}</h1>
            <form onSubmit={onSubmitForm}>
                <label>Name:</label>
                <input type="text" value={gameSystemName} onChange={(e) => setGameSystemName(e.target.value)} required />
                <label>Edition:</label>
                <input type="text" value={gameSystemEdition} onChange={(e) => setGameSystemEdition(e.target.value)} required />
                <label>Version:</label>
                <input type="number" value={gameSystemVersion} onChange={(e) => setGameSystemVersion(e.target.value)} required />
                <button type="submit">{gameSystemId ? "Update" : "Create"}</button>
                {gameSystemId && <button type="button" onClick={onDeleteClick}>Delete</button>}
            </form>
        </Fragment>
    );
};

export default GameSystemForm;

