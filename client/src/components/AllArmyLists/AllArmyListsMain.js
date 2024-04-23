import React, { Fragment, useState } from 'react';
import DisplayAllArmyLists from './displayAllArmyLists';
import { Link } from 'react-router-dom';
import CreateNewListSelection from './createNewListSelection';
import CreateNewListPrompt from './createNewListPrompt';
import ArmyListsMain from './sub-components/ArmyListMain';
import './armyList.css';

/**
 * Component for displaying and managing all army lists.
 * @returns {JSX.Element} JSX for the AllArmyListsMain component.
 */
function AllArmyListsMain() {

    const [game, setGame] = useState(null);
    const [army, setArmy] = useState(null);
    const [armyList, setArmyList] = useState(null);
    const [mode, setMode] = useState('initial');

    /**
     * Handles the click event for creating a new army list.
     */
    const handleCreateNew = () => {
        setMode('new');
    };

    const handleCreateNewPrompt = () => { // check in use ...// why did i create this??
        setMode('prompt');
    };

    /**
     * Handles the click event for navigating back to the initial mode.
     */
    const handleBack = () => {
        setMode('initial');
    };

    /**
     * Handles the selection of a new army list.
     * @param {Object} selection - The selected army list.
     */
    const handleSelection = (selection) => {
        setArmyList(selection.Army_List);
        setGame(selection.Linked_Game_System);
        setArmy(selection.Linked_Armies);
        setMode('armyListMain');
    };

    /**
     * Handles the creation of a new army list.
     * @param {Object} gameMode - The selected game mode.
     */
    const handleNew = (gameMode) => {
        setGame(gameMode);
        setMode('prompt');
    }

    /**
     * Renders the content based on the current mode.
     * @returns {JSX.Element} JSX for rendering the content.
     */
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
