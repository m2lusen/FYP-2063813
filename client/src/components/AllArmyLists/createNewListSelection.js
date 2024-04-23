import React, { Fragment, useState, useEffect} from 'react';

import {GetGameSystems, GetArmy, GetArmyList} from './getRequests';
/**
 * Component for selecting a game to create a new army list.
 * @param {function} handleClick - Function to handle click event when a game is selected.
 * @returns {JSX.Element} JSX for the CreateNewListSelection component.
 */
function CreateNewListSelection({handleClick}) {
    const [games, setGames] = useState(null);
    const [armies, setArmies] = useState(null);
    const [armyLists, setArmyLists] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    /**
     * Fetches game systems, armies, and army lists from the server.
     */
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

    /**
        * Handles search input change.
        * @param {Object} event - Input change event.
    */
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    /**
     * Filters games based on search term.
     */
    const filteredGames = games && games.filter(game => {
        return game[1].toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <Fragment>
            <h1 className='new-list-title'>New List</h1>
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Search by game name..." 
                    value={searchTerm} 
                    onChange={handleSearch} 
                />
            </div>
            {filteredGames ? (
                <div className="list-select-container">
                    {filteredGames.map((nestedArray, index) => (
                        <div key={index}>
                            <button onClick={() => handleClick(nestedArray)}>
                                {nestedArray[1]} - {nestedArray[2]} 
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </Fragment>
    );
}

export default CreateNewListSelection;
