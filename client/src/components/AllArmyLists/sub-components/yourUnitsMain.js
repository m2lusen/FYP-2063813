// import React, { Fragment, useState, useEffect} from 'react';
// import { GetArmyList, GetArmy } from "../getRequests";

// import YourUnitsForceForm from './yourForceForm';
// import UnitMain from './unitMain';

// // some kind of issue with armies.. not certain for what reason but armies is not consistent between YourUnitsForceForm and UnitMain

// function YourUnitsMain({ armyList, gameSystem, handleCreate }) {

//     const [mode, setMode] = useState('your units');

//     const [forceId, setForceId] = useState(null);
//     const [unit, setUnit] = useState(null);

//     const [armies, setArmies] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const newLists = await GetArmyList();
//                 const newArmies = await GetArmy();
    
//                 const filteredNewArmyLists = newLists.find(subArray => subArray[0] == armyList[0]);
    
//                 const newForces = [...new Set(filteredNewArmyLists[5].map(filteredNewArmyList => filteredNewArmyList[1]))];
    
//                 const filteredNewArmies = newArmies.filter(item => newForces.includes(item[0]));
    
//                 setArmies(filteredNewArmies);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };
//         fetchData();
//     }, [armyList]);
    

//     const handleYourUnitsClick = () => {
//         // setForceId(null);
//         // setUnit(null);
//         setMode('your units');
//     };

//     const handleUnitClick = (unit, forceId) => { // if unit is updated this may not be up to date
//         setForceId(forceId);
//         setUnit(unit);
//         setMode('specific unit');
//     };

//     const renderContent = () => {
//         switch (mode) {
//             case 'your units':
//                 return (
//                     <div>
//                         <YourUnitsForceForm 
//                             gameSystem={gameSystem} 
//                             armyList={armyList} 
//                             armies={armies} 
//                             handleClick={handleUnitClick}
//                             handleCreate={handleCreate} 
//                         />
//                     </div>
//                 );
//             case 'specific unit':
//                 return (
//                     <div>
//                         <button onClick={handleYourUnitsClick}>Back</button>
//                         <UnitMain 
//                             gameSystem={gameSystem} 
//                             armyList={armyList} 
//                             armies={armies} 
//                             forceId={forceId}
//                             unit={unit}
//                             handleClick={handleYourUnitsClick}
//                             handleCreate={handleCreate} 
//                         />
//                     </div>
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <Fragment>
//             {renderContent()}
//         </Fragment>
//     );
// }

// export default YourUnitsMain;


import React, { Fragment, useState, useEffect} from 'react';
import { GetArmyList, GetArmy } from "../getRequests";

import YourUnitsForceForm from './yourForceForm';
import UnitMain from './unitMain';

// some kind of issue with armies.. not certain for what reason but armies is not consistent between YourUnitsForceForm and UnitMain

function YourUnitsMain({ armyList, gameSystem, armies, handleCreate }) {

    const [mode, setMode] = useState('your units');

    const [forceId, setForceId] = useState(null);
    const [unit, setUnit] = useState(null);
    
    const handleYourUnitsClick = () => {
        // setForceId(null);
        // setUnit(null);
        setMode('your units');
    };

    const [armiesX, setArmiesX] = useState(null); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newLists = await GetArmyList();
                const newArmies = await GetArmy();
    
                const filteredNewArmyLists = newLists.find(subArray => subArray[0] == armyList[0]);
    
                const newForces = [...new Set(filteredNewArmyLists[5].map(filteredNewArmyList => filteredNewArmyList[1]))];
    
                const filteredNewArmies = newArmies.filter(item => newForces.includes(item[0]));

                setArmiesX(filteredNewArmies);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [mode]);

    const handleUnitClick = (unit, forceId) => { // if unit is updated this may not be up to date
        setForceId(forceId);
        setUnit(unit);
        setMode('specific unit');
    };

    const renderContent = () => {
        switch (mode) {
            case 'your units':
                return (
                    <div>
                        <YourUnitsForceForm 
                            gameSystem={gameSystem} 
                            armyList={armyList} 
                            armies={armies} 
                            handleClick={handleUnitClick}
                            handleCreate={handleCreate} 
                        />
                    </div>
                );
            case 'specific unit':
                return (
                    <div>
                        <button className='BackButton' onClick={handleYourUnitsClick}>{'<'}</button>
                        <UnitMain 
                            gameSystem={gameSystem} 
                            armyList={armyList} 
                            armies={armiesX} 
                            forceId={forceId}
                            unit={unit}
                            handleClick={handleYourUnitsClick}
                            handleCreate={handleCreate} 
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Fragment>
            {renderContent()}
        </Fragment>
    );
}

export default YourUnitsMain;
