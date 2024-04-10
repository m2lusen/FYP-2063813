// import React, { useState, useEffect } from "react";
// import { GetArmyList } from "../getRequests";

// const UnitStatline = ({ gameSystem, armyList, armies, forceId, statlineRow, unit, alUnitId, aUnitId, handleCreate }) => {
//     const [aStatlineId, setAStatlineId] = useState(null);
//     const [quanity, setQuantity] = useState(null);

//     const [quanityMin, setQuantityMin] = useState(null);
//     const [quanityMax, setQuantityMax] = useState(null);

//     const [updated, setUpdated] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => { // error i believe it has to do with statlines not being part of unit... possibly to do with unit not being updated after it is picked
//         if (statlineRow && unit) {
//             setAStatlineId(statlineRow[0]);
//             const statlineInfo = unit[10].find(item => item[0] == statlineRow[0]);
//             if (statlineInfo == undefined){
//                 setQuantity(0);
//             } else {
//                 setQuantity(statlineInfo[1]);
//             }
//             setQuantityMin(statlineInfo[2]);


//             setQuantityMax(statlineInfo[3]);
//         }
//     }, [statlineRow, unit]);

//     useEffect(() => {
//         if (quanity > quanityMax) {
//             setError(`Error: The quantity of this unit exceeds what is allowed. The maximum quantity is ${quanityMax}`);
//         } else {
//             setError('');
//         }
//     }, [quanity, quanityMax]);

//  const onSubmitForm = async (e) => { // add update
//         e.preventDefault();
//         try {
//             let body;
//             let response;

//             body = {
//                 "al_unit_id": alUnitId,
//                 "a_unit_id": aUnitId,
//                 "a_statline_id": aStatlineId,
//                 "quantity": quanity
//             };
//             response = await fetch(`http://localhost:4000/al_unit_a_unit_a_statline_quantity/${alUnitId}/${aUnitId}/${aStatlineId}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(body)
//             });
//             if (response.ok) {
//                 const responseData = await response.json();
//                 console.log('Updated: ', responseData)
//                 setUpdated(true);
//             } else {
//                 console.error("Failed to update keyword");
//             }
            
//         } catch (err) {
//             console.error(err.message);
//         }
//     };

//     useEffect(() => {
//         if (updated) {
//             const fetchData = async () => {
//                 try {
//                     const newLists = await GetArmyList();
//                     const filteredNewArmyLists = newLists.find(subArray => subArray[0] == armyList[0]);
//                     const newTemplate = {
//                         "Army_List": filteredNewArmyLists,
//                         "Linked_Game_System": gameSystem,
//                         "Linked_Armies": armies
//                     }
//                     handleCreate(newTemplate);
//                     setUpdated(false);
//                 } catch (error) {
//                     console.error('Error fetching data:', error);
//                 }
//             };
//             fetchData();
//         }
//     }, [updated, armyList, gameSystem, armies, handleCreate]);


//     return (
//         <div>
//             { quanity && quanityMin ? (
//             <form onSubmit={onSubmitForm}>
//                 {error}
//                 <div className="unit-main-statline-quantity">
//                     <input className="unit-main-statline-quantity-input" min={quanityMin} type="number" value={quanity} onChange={(e) => setQuantity(e.target.value)} required/>
//                 </div>
//             </form>

//             ) : (
//                 <div>Loading...</div>
//             )}
//         </div>
//     );
// };

// export default UnitStatline;



import React, { useState, useEffect } from "react";
import { GetArmyList } from "../getRequests";

const UnitStatline = ({ gameSystem, armyList, armies, forceId, statlineRow, unit, alUnitId, aUnitId, handleCreate, handleStatlineError}) => {
    const [aStatlineId, setAStatlineId] = useState(null);
    const [quanity, setQuantity] = useState(null);

    const [quanityMin, setQuantityMin] = useState(null);
    const [quanityMax, setQuantityMax] = useState(null);

    const [updated, setUpdated] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => { // error i believe it has to do with statlines not being part of unit... possibly to do with unit not being updated after it is picked
        if (statlineRow && unit) {
            setAStatlineId(statlineRow[0]);
            const statlineInfo = unit[10].find(item => item[0] == statlineRow[0]);
            if (statlineInfo == undefined){
                setQuantity(0);
            } else {
                setQuantity(statlineInfo[1]);
            }
            setQuantityMin(statlineInfo[2]);


            setQuantityMax(statlineInfo[3]);
        }
    }, [statlineRow, unit]);

    // useEffect(() => {
    //     if (quanity > quanityMax) {
    //         setError(`Error: The quantity of this unit exceeds what is allowed. The maximum quantity is ${quanityMax}`);
    //     } else {
    //         setError('');
    //     }
    // }, [quanity, quanityMax]);
    useEffect(() => {
        if (quanity > quanityMax) {
            handleStatlineError(`Error: The quantity of this unit exceeds what is allowed. The maximum quantity is ${quanityMax}`);
        } else {
            handleStatlineError('');
        }
    }, [quanity, quanityMax]);

    const onSubmitForm = async (e) => { // add update
        e.preventDefault();
        try {
            let body;
            let response;

            body = {
                "al_unit_id": alUnitId,
                "a_unit_id": aUnitId,
                "a_statline_id": aStatlineId,
                "quantity": quanity
            };
            response = await fetch(`http://localhost:4000/al_unit_a_unit_a_statline_quantity/${alUnitId}/${aUnitId}/${aStatlineId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log('Updated: ', responseData)
                setUpdated(true);
            } else {
                console.error("Failed to update keyword");
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
                    const filteredNewArmyLists = newLists.find(subArray => subArray[0] == armyList[0]);
                    const newTemplate = {
                        "Army_List": filteredNewArmyLists,
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
    }, [updated, armyList, gameSystem, armies, handleCreate]);


    return (
        <div>
            { quanity !== null && quanityMin ? (
            <form onSubmit={onSubmitForm}>
                <div className="unit-main-statline-quantity">
                    <input className="unit-main-statline-quantity-input" min={quanityMin} type="number" value={quanity} onChange={(e) => setQuantity(e.target.value)} required/>
                </div>
            </form>

            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default UnitStatline;