import React, { Fragment, useState, useEffect} from 'react';
import YourUnitsForceForm from './yourForceForm';



function YourUnitsMain({ armyList, gameSystem, armies, handleCreate }) {

    const [mode, setMode] = useState('your units');

    const handleYourUnitsClick = () => {
        setMode('your units');
    };

    const handleUnitClick = () => {
        setMode('specific unit');
    };

    const renderContent = () => {
        switch (mode) {
            case 'your units':
                return (
                    <div>
                        <YourUnitsForceForm gameSystem={gameSystem} armyList={armyList} armies={armies} handleCreate={handleCreate} />
                    </div>
                );
            case 'specific unit':
                return (
                    <div>
                        
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
