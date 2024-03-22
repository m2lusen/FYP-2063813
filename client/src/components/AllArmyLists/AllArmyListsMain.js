import React, { Fragment, useState} from 'react';
// import PdfViewer from './components/pdf/PdfViewer';

import DisplayAllArmyLists from './displayAllArmyLists';

import { Link } from 'react-router-dom';
import CreateNewListSelection from './createNewListSelection';
import CreateNewListPrompt from './createNewListPrompt';
import ArmyListsMain from './sub-components/ArmyListMain';

function AllArmyListsMain() {

    const [game, setGame] = useState(null);
    const [army, setArmy] = useState(null);
    const [armyList, setArmyList] = useState(null);

    const [mode, setMode] = useState('initial');

    // add deleting

    // add search/sort

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
                        <button onClick={handleCreateNew}>Add New List</button>
                    </div>
                );
            case 'new':
                return (
                    <div>
                        <CreateNewListSelection handleClick={handleNew}/>
                        <button onClick={handleBack}>Back</button>
                    </div>
                );
            case 'prompt':
                return (
                    <div>
                        <CreateNewListPrompt gameSystem={game} handleClick={handleSelection}/>
                        <button onClick={handleBack}>Back</button>
                    </div>
                );
            case 'armyListMain':
                return (
                    <div>
                        <button onClick={handleBack}>Back</button>
                        <ArmyListsMain armyListInitial={armyList} gameSystemInitial={game} armiesInitial={army} />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Fragment>
            <div>
                <Link to="/ArmyList">Army List</Link>
            </div>

            {renderContent()}
        </Fragment>
    );
}

export default AllArmyListsMain;
