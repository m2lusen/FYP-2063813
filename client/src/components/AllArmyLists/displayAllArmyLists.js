import React, { Fragment, useState, useEffect } from 'react';
import { GetGameSystems, GetArmy, GetArmyList } from './getRequests';
import './armyList.css'; // Import CSS file for styles

/**
 * Displays all army lists with options for searching, sorting, and filtering.
 * @param {function} handleClick - Function to handle click events on army list buttons.
 * @returns {JSX.Element} JSX element representing the component.
 */
function DisplayAllArmyLists({ handleClick }) {
    const [games, setGames] = useState(null);
    const [armies, setArmies] = useState(null);
    const [armyLists, setArmyLists] = useState(null);
    const [searchBy, setSearchBy] = useState('name');
    const [searchTerm, setSearchTerm] = useState('');
    const [orderBy, setOrderBy] = useState('name');
    const [orderDirection, setOrderDirection] = useState('asc');

    useEffect(() => {
        if (!games) {
            const fetchData = async () => {
                try {
                    const gameSystems = await GetGameSystems();
                    setGames(gameSystems);
                } catch (error) {
                    console.error('Error fetching game systems:', error);
                }
            };
            fetchData();
        }
        if (!armies) {
            const fetchData = async () => {
                try {
                    const armyData = await GetArmy();
                    setArmies(armyData);
                } catch (error) {
                    console.error('Error fetching armies:', error);
                }
            };
            fetchData();
        }
        if (!armyLists) {
            const fetchData = async () => {
                try {
                    const armyListData = await GetArmyList();
                    setArmyLists(armyListData);
                } catch (error) {
                    console.error('Error fetching army lists:', error);
                }
            };
            fetchData();
        }
    }, [games, armies, armyLists]);

    /**
     * Retrieves the linked game system based on its ID.
     * @param {string} gameSystemId - ID of the game system.
     * @returns {Array|null} Linked game system data.
     */
    const linkedGameSystem = (gameSystemId) => {
        if (!games) return null;

        let targetGame = games.find(item => item[0] === gameSystemId);
        return targetGame;
    };

    /**
     * Retrieves the linked armies based on the provided forces.
     * @param {Array} forces - Forces data.
     * @returns {Array} Linked armies data.
     */
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

    /**
     * Displays the names of linked armies.
     * @param {Array} forces - Forces data.
     * @returns {string} Display string of linked armies.
     */
    const displayLinkedArmy = (forces) => {
        const linkedArmies = forces.map(force => {
            const targetArmy = armies.find(item => item[0] === force[1]);
            return targetArmy ? targetArmy[1] : '';
        });

        const displayString = linkedArmies.join(', ');
        const truncatedString = displayString.length > 50 ? displayString.slice(0, 50) + '...' : displayString;
        return truncatedString;
    };

    /**
     * Retrieves the value of the field to sort by.
     * @param {Array} nestedArray - Nested array representing army list data.
     * @returns {string} Value of the field to sort by.
     */
    const getValueToSortBy = (nestedArray) => {
        switch (orderBy) {
            case 'name':
                return nestedArray[3].toLowerCase();
            case 'point':
                return nestedArray[4].toString();
            case 'army':
                return displayLinkedArmy(nestedArray[5]).toLowerCase();
            case 'game':
                return linkedGameSystem(nestedArray[1])[1].toLowerCase();
            default:
                return '';
        }
    };

    /**
     * Handles click event on army list button.
     * @param {Array} nestedArray - Nested array representing army list data.
     * @returns {Object} Object containing army list, linked game system, and linked armies data.
     */
    const onClick = (nestedArray) => {
        const gameSystem = linkedGameSystem(nestedArray[1]);
        const linkedArmies = linkedArmy(nestedArray[5]);

        return {
            "Army_List": nestedArray,
            "Linked_Game_System": gameSystem,
            "Linked_Armies": linkedArmies
        };
    };

    const filteredArmyLists = armyLists ? armyLists.filter(armyList => {
        if (searchTerm === '') return true;
        switch (searchBy) {
            case 'name':
                return armyList[3].toLowerCase().includes(searchTerm.toLowerCase());
            case 'point':
                return armyList[4].toString().toLowerCase().includes(searchTerm.toLowerCase());
            case 'army':
                return displayLinkedArmy(armyList[5]).toLowerCase().includes(searchTerm.toLowerCase());
            case 'game':
                return linkedGameSystem(armyList[1])[1].toLowerCase().includes(searchTerm.toLowerCase());
            default:
                return true;
        }
    }).sort((a, b) => {
        const valueA = getValueToSortBy(a);
        const valueB = getValueToSortBy(b);

        if (orderDirection === 'asc') {
            return valueA.localeCompare(valueB);
        } else {
            return valueB.localeCompare(valueA);
        }
    })
    : [];
    

    return (
        <Fragment>
            {games && armies && armyLists ? (
                <div>
                    <div className="search-sort-section">
                        <div>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
                                <option value="name">Search by Name</option>
                                <option value="point">Search by Point Cost</option>
                                <option value="army">Search by Army</option>
                                <option value="game">Search by Game</option>
                            </select>
                        </div>
                        <div>
                            <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
                                <option value="name">Order by Name</option>
                                <option value="point">Order by Point Cost</option>
                                <option value="army">Order by Army</option>
                                <option value="game">Order by Game</option>
                            </select>
                            <select value={orderDirection} onChange={(e) => setOrderDirection(e.target.value)}>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                    </div>
                    <div className="button-container">
                        {filteredArmyLists.length > 0 ? (
                            filteredArmyLists.map((nestedArray, index) => (
                                <div className="button-box" key={index}>
                                    <button onClick={() => handleClick(onClick(nestedArray))}>
                                        <div className="button-name">{nestedArray[3]}</div>
                                        <div className="button-point">{nestedArray[4]}</div>
                                        <div className="button-game">
                                            <span>Game System: </span>{linkedGameSystem(nestedArray[1])[1]}
                                            <span> Version: </span>{linkedGameSystem(nestedArray[1])[2]}
                                        </div>
                                        <div className="button-army">
                                            <span>Armies: </span>{displayLinkedArmy(nestedArray[5])}
                                        </div>
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div>No results found.</div>
                        )}
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </Fragment>
    );
}

export default DisplayAllArmyLists;
