import React, { Fragment, useState, useEffect, forwardRef} from 'react';
import { GetArmyList } from "../getRequests";
// currently not using handleCreate

const AllUnitsUnit = ({ armyList, gameSystem, armies, forceId, content, supertypeMinimum, supertypeLimit, totalInstances, callculateTotalInstances, handleCreate}) => {

    const [alUnitIds, setAlUnitIds] = useState([]);
    const [alUnitNumber, setAlUnitNumber] = useState(0);

    const [aUnitId, setAUnitId] = useState(null);
    const [alUnitName, setAlUnitName] = useState('');

    const [statlines, setStatlines] = useState([]);

    const [aUnitLimit, setAUnitLimit] = useState(null);

    const [error, setError] = useState('');

    const [updated, setUpdated] = useState(false);

    const [statlineIds, setStatlineIds] = useState([]);
    const [quantities, setQuantities] = useState([]);

    useEffect(() => {     // may have cause a issue with sypertype limit????
        if (content){
            setStatlineIds(content[9].map((innerArray) => innerArray[0]));
            setQuantities(content[9].map((innerArray) => innerArray[2]));
        }
    }, [armyList, gameSystem, armies, forceId, content]);

    useEffect(() => {     // may have cause a issue with sypertype limit????
        const force = armyList[5].find(item => item[0] == forceId); 
        if (force !== undefined){
            const matchingAlUnit = force[6].reduce((acc, item) => { // causes error
                if (item[10] === content[2] && !acc.some(existingItem => existingItem[0] === item[0])) {
                    acc.push(item);
                }
                return acc;
            }, []);
            // if (matchingAlUnit.length !== 0){
                
            matchingAlUnit.forEach(matchingUnit => {
                setAlUnitIds(prevIds => [...prevIds, matchingUnit[0]]);
            });
            // console.log(alUnitIds)
            callculateTotalInstances(matchingAlUnit.length, setAUnitId);
            setAlUnitNumber(matchingAlUnit.length);
            // }
        }
    }, [armyList, gameSystem, armies, forceId, content]);
    

    const createStatBlock = (statlineNames, statlineRows) => {
        // Create a map of primary keys
        const acronymMap = new Map(statlineNames.map(([primaryKey, _, acronym]) => [primaryKey, acronym]));
        // const uniqueAcronyms = new Set();
        let acronymDone = false;
        const result = [];

        // Iterate through array statlineRows to extract acronyms and values
        statlineRows.forEach(subArray => {
            const uniqueAcronyms = new Set();
            const acronyms = [];
            const values = [];

            subArray.forEach(([primaryKey, value]) => {
                if (acronymDone === false){
                    const acronym = acronymMap.get(primaryKey);
                    if (acronym !== undefined && !uniqueAcronyms.has(acronym)) {
                        uniqueAcronyms.add(acronym);
                        acronyms.push(acronym);
                        values.push(value);
                    }
                } else {
                    values.push(value);
                }
            });
            acronymDone = true;

            if (acronyms.length === 0){
                result.push(values);
            } else {
                result.push(acronyms, values);
            }
        });
        
        return result;
    };

    useEffect(() => {       
        if (statlines.length === 0){
            const statlineRows =  content[9].map(innerArray => innerArray[5]); 

            setStatlines(createStatBlock(gameSystem[5], statlineRows));
        } 
        if (aUnitId === null) {
            setAUnitId(content[2]);
        }
        if (alUnitName === '') {
            setAlUnitName(content[4]);
        }
        if (content[6] !== null) {
            setAUnitLimit(content[6])
        }
    }, [statlines, aUnitId, alUnitName, armyList, gameSystem, armies, content, forceId]);

    useEffect(() => {
        // setHardLimit(aUnitLimit < (supertypeLimit - totalInstances) ? aUnitLimit : (supertypeLimit - totalInstances));

        if (supertypeMinimum > totalInstances) {
            setError('Error // The number of total instances of this supertype is below the minimum required');
        } else if (supertypeLimit !== null && supertypeLimit < totalInstances) {
            setError('Error // The number of total instances of this supertype exceeds the maximum allowed');
        } else if (aUnitLimit !== null && aUnitLimit < alUnitNumber) {
            setError('Error // The number of total instances of this unit exceeds the maximum allowed');
        } else {
            setError('');
        }

    }, [aUnitLimit, supertypeLimit, totalInstances]);

    const onDeleteClick = async (alUnitId) => { 
        try {
            const response = await fetch(`http://localhost:4000/al_unit/${alUnitId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                console.log("Deleted successfully");
                let newArray = [...alUnitIds];
                // console.log(newArray);
                newArray.pop();
                // console.log(newArray);
                setAlUnitIds(newArray);
                setUpdated(true);
            } else {
                console.error("Failed to delete");
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

                    const filteredNewArmyLists = newLists.find(subArray => subArray[0] === armyList[0]);

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
    }, [updated]);

    const onSubmitArmyForm = async () => {
        try {
            let body;
            let response;
            body = {
                "al_force_id": [forceId],
                "a_unit_id": [aUnitId],
                "al_unit_name": [alUnitName],
                "al_unit_color": [null]
            };

            response = await fetch("http://localhost:4000/al_unit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log("body: ", responseData);
                // console.log(responseData[0].al_unit_id);
                setAlUnitIds(prevIds => [...prevIds, responseData[0].al_unit_id]);

                for (let i = 0; i < statlineIds.length; i++) {

                    body = {
                        "al_unit_id":  [responseData[0].al_unit_id],
                        "a_unit_id": [aUnitId],
                        "a_statline_id": [statlineIds[i]],
                        "quantity": [quantities[i]]
                    };

                    // Send POST request
                    response = await fetch("http://localhost:4000/al_unit_a_unit_a_statline_quantity", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                    });

                    // Check response and update state
                    if (response.ok) {
                        const responseData = await response.json();
                        console.log('Created : ', responseData)
                        setUpdated(true);
                    } else {
                        console.error("Failed to create");
                    }
                }


                setUpdated(true);
                // setAlUnitIds(alUnitIds.push(responseData[0].al_unit_id));
            } else {
                console.error("Failed to create a_unit");
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const StatlineTable = ({ data }) => {
        return (
            <table>
                <thead>
                <tr>
                    {data[0].map((header, index) => (
                    <th key={index}>{header}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell !== null ? cell : '-'}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    const handleChange = (newNumberOfInstance) => {

        if (newNumberOfInstance > alUnitNumber) {
            const difference = newNumberOfInstance - alUnitNumber;
            for (let i = 0; i < difference; i++) {
                // console.log('Adding');
                onSubmitArmyForm();
            }
        }
        if (newNumberOfInstance < alUnitNumber) {
            const difference = alUnitNumber - newNumberOfInstance;
            // confirmation of delete should be here
            const confirmDelete = window.confirm("Are you sure you want to delete this/these Unit/s?");
            if (!confirmDelete) return;

            //in order all ids that are being deleted 
            let idsForDelete = [];
            for (let i = 0; i < difference; i++) {
                // console.log(alUnitIds[alUnitIds.length - i - 1]);
                idsForDelete.push(alUnitIds[alUnitIds.length - i - 1]); 
            }

            // console.log(idsForDelete)

            for (let i = 0; i < difference; i++) {
                // console.log('Subtracting');
                onDeleteClick(idsForDelete[i]);
            }
        }
        
        callculateTotalInstances(newNumberOfInstance, alUnitNumber);
        setAlUnitNumber(newNumberOfInstance);
    }

    return (
        <div> 
            <p>{error}</p>
            <form onSubmit={onSubmitArmyForm} class="army-form">
                <div class="left-column">
                    <label>
                        <span class="unit-name">{alUnitName}</span> - <span class="points">{content[5]} pts</span>
                        {statlines.length !== 0 ? (<StatlineTable data={statlines}/>) : (<div>Loading...</div>)}
                        {/* rules */}
                    </label>
                </div>
                <div class="right-column">
                    <input min={0} type="number" value={alUnitNumber} onChange={(e) => handleChange(e.target.value)} required />
                </div>
            </form>
        </div>
    );
};

export default  AllUnitsUnit;
