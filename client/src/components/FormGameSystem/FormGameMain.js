import React, { useState } from 'react';
import GameSystemForm from './sub-components/gameSystemForm';
import ExistingGameSystems from './updateGameFormMain';
import FormArmy from '../FormArmy/FormArmyMain'

function FormGame() { // if time rewrite
    const [mode, setMode] = useState('initial');
    const [template, setTemplate] = useState(null);

    const handleShowForm = () => {
        setMode('form');
    };

    const handleShowChooseAction = () => {
        setMode('chooseAction');
    };

    const handleChooseExisting = () => {
        setMode('existing');
    };

    const handleChooseArmyFormNav = () => {
        setMode('armyFormNav');
    };

    const handleBack = () => {
        setMode('initial');
        setTemplate(null); // Reset the template to null when going back
    };

    const handleFormClick = (nestedArray) => {
        setMode('form');
        setTemplate(nestedArray);
    };

    const handleArmyFormClick = (nestedArray) => {
        setMode('armyForm');
        setTemplate(nestedArray);
    };

    const renderContent = () => {
        switch (mode) {
            case 'initial':
                return (
                    <div>
                        <h1>Add Game system</h1>
                        <button onClick={handleShowForm}>Add a new Game System</button>
                        <button onClick={handleShowChooseAction}>Modify an existing Game System</button>
                    </div>
                );
            case 'chooseAction':
                return (
                    <div>
                        <h1>Choose Action</h1>
                        <button onClick={handleChooseExisting}>Update Game System</button>
                        <button onClick={handleChooseArmyFormNav}>Create/Update Army List</button>
                        <button onClick={handleBack}>Back</button>
                    </div>
                );
            case 'form':
                return (
                    <div>
                        <GameSystemForm template={template} />
                        <button onClick={handleBack}>Back</button>
                    </div>
                );
            case 'existing':
                return (
                    <div>
                        <ExistingGameSystems handleClick={handleFormClick} />
                        <button onClick={handleBack}>Back</button>
                    </div>
                );
            case 'armyForm':
                return (
                    <div>
                        <FormArmy gameSystem={template} />
                        <button onClick={handleBack}>Back</button>
                    </div>
                );
            case 'armyFormNav':
                return (
                    <div>
                        <ExistingGameSystems handleClick={handleArmyFormClick} />
                        <button onClick={handleBack}>Back</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return <div>{renderContent()}</div>;
}

export default FormGame;


// import React, { useState } from 'react';
// import GameSystemForm from './sub-components/gameSystemForm';
// import ExistingGameSystems from './updateGameFormMain';
// import ExistingArmies from '../FormArmy/updateArmyFormMain';
// import FormArmy from '../FormArmy/FormArmyMain';

// function FormGame() {
//     const [mode, setMode] = useState('initial');
//     const [template, setTemplate] = useState(null);

//     const handleShowForm = () => {
//         setMode('form');
//     };

//     const handleShowChooseAction = () => {
//         setMode('chooseAction');
//     };

//     const handleChooseExisting = () => {
//         setMode('existing');
//     };

//     const handleChooseArmyFormNav = () => {
//         setMode('armyFormNav');
//     };

//     const handleBack = () => {
//         setMode('initial');
//         setTemplate(null); // Reset the template to null when going back
//     };

//     const handleFormClick = (nestedArray) => {
//         setMode('form');
//         setTemplate(nestedArray);
//     };

//     const handleArmyFormClick = (nestedArray) => {
//         setMode('armyForm');
//         setTemplate(nestedArray);
//     };

//     const handleNewArmyForm = () => {
//         setMode('newArmyForm');
//         setTemplate(null); // Reset the template to null when creating a new army
//     };

//     const handleExistingGameSystemClick = (nestedArray) => {
//         setMode('form');
//         setTemplate(nestedArray);
//     };

//     const handleUpdateGameSystemClick = (nestedArray) => {
//         setMode('form');
//         setTemplate(nestedArray);
//     };

//     const renderContent = () => {
//         switch (mode) {
//             case 'initial':
//                 return (
//                     <div>
//                         <h1>Add Game system</h1>
//                         <button onClick={handleShowForm}>Add a new Game System</button>
//                         <button onClick={handleShowChooseAction}>Modify an existing Game System</button>
//                     </div>
//                 );
//             case 'chooseAction':
//                 return (
//                     <div>
//                         <h1>Choose Action</h1>
//                         <button onClick={handleChooseExisting}>Update Game System</button>
//                         <button onClick={handleChooseArmyFormNav}>Create/Update Army List</button>
//                         <button onClick={handleBack}>Back</button>
//                     </div>
//                 );
//             case 'form':
//                 return (
//                     <div>
//                         <GameSystemForm template={template} />
//                         <button onClick={handleBack}>Back</button>
//                     </div>
//                 );
//             case 'existing':
//                 return (
//                     <div>
//                         <ExistingGameSystems handleGameSystemClick={handleExistingGameSystemClick} handleUpdateGameSystemClick={handleUpdateGameSystemClick} />
//                         <button onClick={handleBack}>Back</button>
//                     </div>
//                 );
//             case 'armyForm':
//                 return (
//                     <div>
//                         <FormArmy gameSystem={template} />
//                         <button onClick={handleBack}>Back</button>
//                     </div>
//                 );
//             case 'armyFormNav':
//                 return (
//                     <div>
//                         <ExistingArmies handleClick={handleArmyFormClick} />
//                         <button onClick={handleNewArmyForm}>Create New Army</button>
//                         <button onClick={handleBack}>Back</button>
//                     </div>
//                 );
//             case 'newArmyForm':
//                 return (
//                     <div>
//                         <FormArmy gameSystem={null} /> {/* Pass null as template for a new army */}
//                         <button onClick={handleBack}>Back</button>
//                     </div>
//                 );
//             default:
//                 return null;
//         }
//     };

//     return <div>{renderContent()}</div>;
// }

// export default FormGame;