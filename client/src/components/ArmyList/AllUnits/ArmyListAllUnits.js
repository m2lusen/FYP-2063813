// import React, {Fragment, useEffect, useState} from "react";

// const AllUnits = () => {

//     const getArmyList = async () => {
//         try {
//             const armyListID = 1; // TEMPORARY
//             const response = await fetch(`http://localhost:4000/army_list/${armyListID}`);
//             const jsonData = await response.json();
//             console.log('Army List')
//             console.log(jsonData);

//         } catch (err) {
//             console.log(err.message) // TEMPORARY
//         }
//     }

//     useEffect(() => {
//         getArmyList();
//     })

//     let getUnits = async () => {
//         try {
//             const a_unit_name = 'Wendigo'; // TEMPORARY, Will be automated for each unit in army_list
//             const response = await fetch(`http://localhost:4000/unit/${a_unit_name}`);
//             const jsonData = await response.json();
//             console.log('Units')
//             console.log(jsonData);

//         } catch (err) {
//             console.log(err.message) // TEMPORARY
//         }
//     }

//     useEffect(() => {
//         getUnits();
//     })

//     let getUpgrades = async () => {
//         try {
//             const a_upgrade_id = 1; // TEMPORARY, Will be automated for each unit in army_list
//             const response = await fetch(`http://localhost:4000/upgrade/${a_upgrade_id}`);
//             const jsonData = await response.json();
//             console.log('Upgrades')
//             console.log(jsonData);

//         } catch (err) {
//             console.log(err.message) // TEMPORARY
//         }
//     }

//     useEffect(() => {
//         getUpgrades();
//     })

//     return (
//         <Fragment>
//             <h1>All Units</h1>
//         </Fragment>
//     );
// };

// export default AllUnits;


import React, { Fragment, useEffect, useState } from "react";
const AllUnits = () => {

    const getArmyList = async () => { // Lots of repetitions instead of retrieving specific, is retrieving all possible units
        try {
        const armyListID = 1; // TEMPORARY
        const response = await fetch(`http://localhost:4000/army_list/${armyListID}`);
        const jsonData = await response.json();
        console.log('Army List');
        console.log(jsonData);
    
        // Check if jsonData is an array before iterating over it
        if (Array.isArray(jsonData)) {
            jsonData.forEach(async (unit) => {
            // Get unit details
            const unitResponse = await fetch(`http://localhost:4000/unit/${unit.a_unit_name}`);
            const unitData = await unitResponse.json();
            console.log('Unit');
            console.log(unitData);
    
            // Check if upgrades array exists before iterating over it
            if (Array.isArray(unit.upgrades)) { // Possible issue with retrieving upgrades
                unit.upgrades.forEach(async (upgradeId) => {
                const upgradeResponse = await fetch(`http://localhost:4000/upgrade/${upgradeId.a_upgrade_id}`);
                const upgradeData = await upgradeResponse.json();
                console.log('Upgrade');
                console.log(upgradeData);
                });
            }
            });
        } else {
            console.error('Invalid response format: expected array');
        }
        } catch (err) {
        console.error(err.message);
        }
    };

    useEffect(() => {
        getArmyList();
    }, []);

    return (
        <Fragment>
        <h1>All Units</h1>
        </Fragment>
    );
};

export default AllUnits;
