import React, { Fragment, useState, useEffect} from 'react';

import {GetGameSystems, GetArmy, GetArmyList} from './getRequests';

function DisplayAllArmyLists({handleClick}) {  // will also include delete army list functionality here

    const [games, setGames] = useState(null);
    const [armies, setArmies] = useState(null);
    const [armyLists, setArmyLists] = useState(null);

    useEffect(() => {
        if (!games) {
            const fetchData = async () => {
                try {
                    const gameSystems = await GetGameSystems();
                    setGames(gameSystems);
                    
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
        if (!armies) {
            const fetchData = async () => {
                try {
                    const army = await GetArmy();
                    setArmies(army);
                    
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
        if (!armyLists) {
            const fetchData = async () => {
                try {
                    const armyList = await GetArmyList();
                    setArmyLists(armyList);
                    
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
    }, [games, armies, armyLists]);

    const linkedGameSystem = (gameSystemId) => {
        let targetGame = games.find(item => item[0] === gameSystemId); 
        return targetGame;
    };

    const linkedArmy = (forces) => {
        const uniqueArmyIds = new Set();
        forces.forEach(force => {
            uniqueArmyIds.add(force[1]);
        });
    
        const linkedArmies = Array.from(uniqueArmyIds).map(armyId => {
            const targetArmy = armies.find(item => item[0] === armyId);
            return targetArmy;
        });
    
        return linkedArmies;
    };

    const displayLinkedArmy = (forces) => {
        const linkedArmies = forces.map(force => {
            const targetArmy = armies.find(item => item[0] === force[1]);
            return targetArmy ? targetArmy[1] : '';
        });
    
        const displayString = linkedArmies.join(', ');
        const truncatedString = displayString.length > 50 ? displayString.slice(0, 50) + '...' : displayString;
        
        return truncatedString;
    };
    
    const onClick = (nestedArray) => {
        const gameSystem = linkedGameSystem(nestedArray[1]);
        const linkedArmies = linkedArmy(nestedArray[5]);

        return {
            "Army_List": nestedArray,
            "Linked_Game_System": gameSystem,
            "Linked_Armies": linkedArmies
        };
    };
    
    return (
        <Fragment>
            {games && armies && armyLists ? (
                <div>
                    {armyLists && armyLists.map((nestedArray, index) => (
                        <button key={index} onClick={() => handleClick(onClick(nestedArray))}>
                            {nestedArray[3]} - {nestedArray[4]} - 
                            {linkedGameSystem(nestedArray[1])[1]} - {linkedGameSystem(nestedArray[1])[2]} -
                            {displayLinkedArmy(nestedArray[5])}
                        </button>
                        
                        // add in delete button for each
                    ))}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </Fragment>
    );
}

export default DisplayAllArmyLists;
