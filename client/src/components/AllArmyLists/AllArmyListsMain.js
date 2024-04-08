import React, { Fragment, useState } from 'react';
import DisplayAllArmyLists from './displayAllArmyLists';
import { Link } from 'react-router-dom';
import CreateNewListSelection from './createNewListSelection';
import CreateNewListPrompt from './createNewListPrompt';
import ArmyListsMain from './sub-components/ArmyListMain';
import './armyList.css';

function AllArmyListsMain() {

    const [game, setGame] = useState(null);
    const [army, setArmy] = useState(null);
    const [armyList, setArmyList] = useState(null);
    const [mode, setMode] = useState('initial');

    const handleCreateNew = () => {
        setMode('new');
    };

    const handleCreateNewPrompt = () => {
        setMode('prompt');
    };

    const handleBack = () => {
        setMode('initial');
    };

    const handleSelection = (selection) => {
        setArmyList(selection.Army_List);
        setGame(selection.Linked_Game_System);
        setArmy(selection.Linked_Armies);
        setMode('armyListMain');
    };

    const handleNew = (gameMode) => {
        setGame(gameMode);
        setMode('prompt');
    }

    const renderContent = () => {
        switch (mode) {
            case 'initial':
                return (
                    <div>
                        <DisplayAllArmyLists handleClick={handleSelection} />
                        <button className="AddNewButton" onClick={handleCreateNew}>+</button>
                    </div>
                );
            case 'new':
                return (
                    <div>
                        <button className="BackButton" onClick={handleBack}>{'<'}</button>
                        <CreateNewListSelection handleClick={handleNew} />
                    </div>
                );
            case 'prompt':
                return (
                    <div>
                        <button className="BackButton" onClick={handleBack}>{'<'}</button>
                        <CreateNewListPrompt gameSystem={game} handleClick={handleSelection} />
                    </div>
                );
            case 'armyListMain':
                return (
                    <div>
                        <button className="BackButton" onClick={handleBack}>{'<'}</button>
                        <ArmyListsMain armyListInitial={armyList} gameSystemInitial={game} armiesInitial={army} />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Fragment>
            <div class="backgroundSquare"></div>
            <h1 className='alTitle'>Army List</h1>
            {renderContent()}
        </Fragment>
    );
}

export default AllArmyListsMain;
