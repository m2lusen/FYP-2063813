import React, { Fragment, useState, useEffect} from 'react';
import AllUnitsSupertype from './allUnitsSupertype';
// import { GetArmyList } from "../getRequests";


function AllUnitsMain({ armyList, gameSystem, armies, handleCreate }) {

    const [forceId, setForceId] = useState(null);

    const [forces, setForces] = useState(null);

    // const [updated, setUpdated] = useState(false);

    const [army, setArmy] = useState([]);

    const [units, setUnits] = useState([]);

    useEffect(() => {           
        setForces(armyList[5]);
        if (!forceId){ 
            if (armyList[5][0][0] !== null){
                setForceId(armyList[5][0][0]);
            }
        }
    }, [forces, armyList, gameSystem, armies]);

    const groupBySupertype = (data) => {
        const groupedByValue = {};
        data.forEach(row => {
            const supertype = row[1];
            if (!groupedByValue[supertype]) {
                groupedByValue[supertype] = [];
            }
            const supertypeInfo = gameSystem[6];
            const supertypeData = supertypeInfo.find(info => info[0] === supertype);
            const supertypeID = supertypeData ? supertypeData[0] : null; 
            const supertypeName = supertypeData ? supertypeData[1] : null; 
            groupedByValue[supertype].push([supertypeID, supertypeName, ...row]);
        });
        return Object.values(groupedByValue);
    };


    useEffect(() => {  // handle null
        if (forceId){
            const force = forces.find(row => row[0] == forceId);

            setArmy(armies.find(row => row[0] == force[1]));

            if (army.length !== 0) { // not dependent on force??
                setUnits(groupBySupertype(army[4]));
            }
        }
    }, [forceId, army, armyList, gameSystem, armies]);


    // useEffect(() => {
    //     if (updated) {
    //         const fetchData = async () => {
    //             try {
    //                 const newLists = await GetArmyList();

    //                 const filteredNewArmyLists = newLists.find(subArray => subArray[0] === armyList[0]);

    //                 const newTemplate = {
    //                     "Army_List": filteredNewArmyLists,
    //                     "Linked_Game_System": gameSystem,
    //                     "Linked_Armies": armies
    //                 }

    //                 handleCreate(newTemplate);
                    
    //                 setUpdated(false);
    //             } catch (error) {
    //                 console.error('Error fetching data:', error);
    //             }
    //         };
    //         fetchData();
    //     }
    // }, [updated]);


    const decideSubmit = (e) => {
        setForceId(e.target.value);
    }

    const getForceNumber = (index) => {
        const count = forces.slice(0, index).filter(([_, __, name]) => name === forces[index][2]).length;
        return count > 0 ? `(${count + 1})` : '';
    };

    return (
        <div>
            {forces ? (
                <div>
                    <form>
                        <select onChangeCapture={decideSubmit} required>
                            {forces.map(([id, _, name], index) => (
                                <option key={id} value={id}>
                                    {name} {getForceNumber(index)}
                                </option>
                            ))}
                        </select>
                    </form>
                </div>

            ) : (
                <div>Loading...</div>
            )}

            {army ? (
                <div>
                        {[...Array(units.length)].map((_, index) => (// temp
                            <AllUnitsSupertype 
                                key={index} 
                                armyList={armyList}
                                gameSystem={gameSystem}
                                armies={armies}
                                content={units[index]}
                                forceId={forceId}
                                handleCreate={handleCreate}
                            /> 
                        ))}
                </div>

            ) : (
                <div>Loading...</div>
            )}

        </div>
    );
};

export default AllUnitsMain;
