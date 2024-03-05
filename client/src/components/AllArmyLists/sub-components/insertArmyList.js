


// import React, { Fragment, useState } from "react";

// const InsertArmyList = () => {
//     const [gameSystemId, setGameSystemId] = useState(0);
//     const [gameModeId, setGameModeId] = useState(0);
//     const [armyListName, setArmyListName] = useState("");

//     const onSubmitForm = async () => {
//         try {
//             const body = {
//                 "game_system_id": [gameSystemId],
//                 "gs_gm_id": [gameModeId],
//                 "army_list_name": [armyListName]
//             };

//             console.log(body);
            
//             const response = await fetch("http://localhost:4000/ArmyList", {
//                 method: "POST",
//                 headers: { "Content-type": "application/json" },
//                 body: JSON.stringify(body),
//             });

//             // Check if the request was successful
//             if (response.ok) {
//                 console.log("Army List created successfully");
//             } else {
//                 console.error("Failed to create Army List");
//             }
//         } catch (err) {
//             console.error(err.message);
//         }
//     };

//     return (
//         <Fragment>
//             <h1>Insert Army List</h1>

//             <button type="button" onClick={() => setGameSystemId(1)}>Game System ID</button>
//             <button type="button" onClick={() => setGameModeId(1)}>GS GM ID</button>

//             <input type="text" value={armyListName} onChange={(e) => setArmyListName(e.target.value)} />

//             <button onClick={onSubmitForm}>Create New Army List</button>
//         </Fragment>
//     );
// };

// export default InsertArmyList;

// import React, { useState } from 'react';

// const InsertArmyList = () => {
//     const [army_list_name, setInputValue] = useState(''); // temp values will be replaced
//     const [gs_gm_id, setDropdownValue] = useState('1');
//     const [game_system_id, setButtonClicked] = useState('');

//     async function submit(){
//         // console.log([army_list_name], [gs_gm_id], [game_system_id]);
//         try {
//             const body = {
//                 "game_system_id": [game_system_id],
//                 "gs_gm_id": [gs_gm_id],
//                 "army_list_name": [army_list_name]
//             };

//             console.log(body);
            
//             const response = await fetch("http://localhost:4000/ArmyList", {
//                 method: "POST",
//                 headers: { "Content-type": "application/json" },
//                 body: JSON.stringify(body),
//             });

//             // Check if the request was successful
//             if (response.ok) {
//                 console.log("Army List created successfully");
//             } else {
//                 console.error("Failed to create Army List");
//             }
//         } catch (err) {
//             console.error(err.message);
//         }
//     }

//     const handleInputChange = (e) => {
//         setInputValue(e.target.value);
//     };

//     const handleDropdownChange = (e) => {
//         setDropdownValue(e.target.value);
//     };

//     const handleButtonClick = () => {
//         setButtonClicked('1');
//         submit();
//     };

//     return (
//         <div>
//             <input
//                 type="text"
//                 value={army_list_name}
//                 onChange={handleInputChange}
//                 placeholder="Enter text here"
//             />
//             <select value={gs_gm_id} onChange={handleDropdownChange}>
//                 <option value="1" >1</option>
//                 <option value="2" >2</option>
//             </select>
//             <button onClick={handleButtonClick}>Click Me</button>
//         </div>
//     );
// };

// export default InsertArmyList;

import React, { Fragment, useState } from "react";

const InsertArmyList = () => {
    const [gameSystemId, setGameSystemId] = useState(null);
    const [gameModeId, setGameModeId] = useState(null);
    const [armyListName, setArmyListName] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault(); // stops refreshing
        console.log(gameSystemId, gameModeId, armyListName)
        try {
            const body = {
                "game_system_id": [gameSystemId], 
                "gs_gm_id": [gameModeId], 
                "army_list_name": [armyListName]
            };
            const response = await fetch("http://localhost:4000/army_list",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            if (response.ok) {
                console.log("Army List created successfully");
            } else {
                console.error("Failed to create Army List");
            }
        } catch (err)  {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1>Insert Army List</h1>
            <form onSubmit={onSubmitForm}>
                <button type="button" onClick={() => setGameSystemId(1)}>Game System ID</button> {/** TEMPORARY BUTTON */}
                <button type="button" onClick={() => setGameModeId(1)}>GS GM ID</button> {/** TEMPORARY BUTTON */}
                
                <input type="text" value={armyListName} onChange={(e) => setArmyListName(e.target.value)} />

                <button type="submit">Create New Army List</button>
            </form>
        </Fragment>
    );
};

export default InsertArmyList;
