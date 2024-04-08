// import React, { Fragment, useState, useEffect} from 'react';

// import {GetGameSystems, GetArmy, GetArmyList} from './getRequests';

// function CreateNewListSelection({handleClick}) {

//     const [games, setGames] = useState(null);
//     const [armies, setArmies] = useState(null);
//     const [armyLists, setArmyLists] = useState(null);

//     // const [game, setGame] = useState(null);
//     // const [army, setArmy] = useState(null);
//     // const [armyList, setArmyList] = useState(null);

//     useEffect(() => {
//         if (!games) {
//             const fetchData = async () => {
//                 try {
//                     const gameSystems = await GetGameSystems();
//                     setGames(gameSystems);
                    
//                 } catch (error) {
//                     console.error('Error fetching data:', error);
//                 }
//             };
//             fetchData();
//         }
//         if (!armies) {
//             const fetchData = async () => {
//                 try {
//                     const army = await GetArmy();
//                     setArmies(army);
                    
//                 } catch (error) {
//                     console.error('Error fetching data:', error);
//                 }
//             };
//             fetchData();
//         }
//         if (!armyLists) {
//             const fetchData = async () => {
//                 try {
//                     const armyList = await GetArmyList();
//                     setArmyLists(armyList);
                    
//                 } catch (error) {
//                     console.error('Error fetching data:', error);
//                 }
//             };
//             fetchData();
//         }
//     }, [games]);
    
//     return (
//         <Fragment>
//             {games && armies && armyLists ? (
//                 <div className="list-select-container">
//                     {games && games.map((nestedArray, index) => (
//                         <div>
//                             <button key={index} onClick={() => handleClick(nestedArray)}>
//                                 {nestedArray[1]} - {nestedArray[2]} 
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <div>Loading...</div>
//             )}
//         </Fragment>
//     );
// }

// export default CreateNewListSelection;


import React, { Fragment, useState, useEffect} from 'react';

import {GetGameSystems, GetArmy, GetArmyList} from './getRequests';

function CreateNewListSelection({handleClick}) {
    const [games, setGames] = useState(null);
    const [armies, setArmies] = useState(null);
    const [armyLists, setArmyLists] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredGames = games && games.filter(game => {
        return game[1].toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <Fragment>
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
