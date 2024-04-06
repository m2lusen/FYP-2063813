import React, { Fragment, useState, useEffect} from 'react';
import ArmyListUpdate from './armyListUpdateForm';
import YourUnitsMain from './yourUnitsMain';
import AllArmyListsMain from '../AllArmyListsMain';
import AllUnitsMain from './allUnitsMain';
// import PdfViewer from './components/pdf/PdfViewer';

import { Link } from 'react-router-dom';


function ArmyListsMain({ armyListInitial, gameSystemInitial, armiesInitial }) {

    const [armyList, setArmyList] = useState(null);
    const [gameSystem, setGameSystem] = useState(null);
    const [armies, setArmies] = useState(null);

    const [mode, setMode] = useState('your units');

    // add pdf button

    useEffect(() => {
        if (!armyList) {
            setArmyList(armyListInitial);
        }
        if (!gameSystem) {
            setGameSystem(gameSystemInitial);
        }
        if (!armies) {
            setArmies(armiesInitial);
        }
    }, [armyList, gameSystem, armies]);

    const updateTemplate = (selection) => {
        console.log("updating template")


        setArmyList(selection.Army_List);
        setGameSystem(selection.Linked_Game_System);
        setArmies(selection.Linked_Armies);
    };


    const handleAllUnitsClick = () => {
        setMode('all units');
    };

    const handleYourUnitsClick = () => {
        setMode('your units');
    };

    const handArmyListUpdate = () => {
        setMode('update');
    };

    const renderContent = () => {
        switch (mode) {
            case 'all units':
                return (
                    <div>
                        <button disabled>All Units</button>
                        <button onClick={handleYourUnitsClick}>Your Units</button>
                        <AllUnitsMain gameSystem={gameSystem} armyList={armyList} armies={armies} handleCreate={updateTemplate} />
                    </div>
                );
            case 'your units':
                return (
                    <div>
                        <button onClick={handleAllUnitsClick}>All Units</button>
                        <button disabled>Your Units</button>
                        <YourUnitsMain gameSystem={gameSystem} armyList={armyList} armies={armies} handleCreate={updateTemplate} />
                    </div>
                );
            case 'update':
                return (
                    <div>
                        <button onClick={handleAllUnitsClick}>All Units</button>
                        <button onClick={handleYourUnitsClick}>Your Units</button>
                        <ArmyListUpdate gameSystem={gameSystem} armyList={armyList} armies={armies} handleCreate={updateTemplate}/> 
                    </div>
                ); // update so updates template on return
            default:
                return null;
        }
    };

    return (
        <Fragment>
            {armyList && gameSystem && armies ? (
                <div>
                    <div>
                        <h1>{armyList[3]}</h1>
                        <h3>{armyList[4]}  pts</h3>
                        <button onClick={handArmyListUpdate}>REPLACE WITH ICON - update army list</button>
                        {/* <button>REPLACE WITH ICON - pdf</button> *possiblt replace with link */}
                        <Link to={{
                            pathname: '/PdfViewer',
                            state: {
                                armyList: armyList,
                                gameSystem: gameSystem,
                                armies: armies
                            }
                        }}>REPLACE WITH ICON - pdf</Link>
                    </div>

                    {renderContent()}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </Fragment>
    );
}

export default ArmyListsMain;
