import React, { Fragment, useState, useEffect} from 'react';

import {GetGameSystems, GetArmy, GetArmyList} from './getRequests';

function CreateNewListSelection({handleClick}) {

    const [games, setGames] = useState(null);
    const [armies, setArmies] = useState(null);
    const [armyLists, setArmyLists] = useState(null);

    const [game, setGame] = useState(null);
    const [army, setArmy] = useState(null);
    const [armyList, setArmyList] = useState(null);

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
    }, [games]);
    
    return (
        <Fragment>
            {games && armies && armyLists ? (
                <div>
                    {games && games.map((nestedArray, index) => (
                        <button key={index} onClick={() => handleClick(nestedArray)}>
                            {nestedArray[1]} - {nestedArray[2]} 
                        </button>
                    ))}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </Fragment>
    );
}

export default CreateNewListSelection;
