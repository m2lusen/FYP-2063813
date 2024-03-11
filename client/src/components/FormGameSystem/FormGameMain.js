import React, { useState } from 'react';
import GameSystemForm from './sub-components/gameSystemForm';
import ExistingGameSystems from './updateGameFormMain';

function FormGame() {
    const [mode, setMode] = useState('initial');
    const [template, setTemplate] = useState(null);

    const handleShowForm = () => {
        setMode('form');
    };

    const handleShowExisting = () => {
        setMode('existing');
    };

    const handleBack = () => {
        setMode('initial');
        setTemplate(null); // Reset the template to null when going back
    };

    const handleFormClick = (nestedArray) => {
        setMode('form');
        setTemplate(nestedArray);
    };

    const renderContent = () => {
        switch (mode) {
            case 'initial':
                return (
                    <div>
                        <h1>Add Game system</h1>
                        <button onClick={handleShowForm}>Add a new Game System</button>
                        <button onClick={handleShowExisting}>Modify an existing Game System</button>
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
            default:
                return null;
        }
    };

    return <div>{renderContent()}</div>;
}

export default FormGame;
