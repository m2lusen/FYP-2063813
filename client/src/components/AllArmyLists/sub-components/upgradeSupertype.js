import React, { Fragment, useState, useEffect} from 'react';
import Upgrade from './upgrade';
// import { GetArmyList } from "../getRequests";


function UpgradeSupertype({ armyList, gameSystem, armies, forceId, supertype, alUnitId, handleCreate }) { // some kind of error were displayed when not the right force

    const [aUtId, setAUtId] = useState(null);
    
    const [typeMinimum, setTypeMinimum] = useState(null);
    const [typeMaximum, setTypeMaximum] = useState(null);
    const [typeLimit, setTypeLimit] = useState(null);

    const [totalInstances, setTotalInstances] = useState(0);
    const [allInstances, setAllInstances] = useState(0);

    const [error, setError] = useState('');

    useEffect(() => {
        if (supertype[0] !== null){
            setAUtId(supertype[0])
        }
        if (supertype[2] !== null){
            setTypeMinimum(supertype[2]);
        }
        if (supertype[3] !== null){
            setTypeMaximum(supertype[3]);
        }
        if (supertype[4] !== null){
            setTypeLimit(supertype[3]);
        }
    }, [armyList, gameSystem, armies]);

    const callculateTotalInstances = (newInstances, oldInstances) => {
        setTotalInstances(totalInstances - oldInstances + newInstances);
    }

    useEffect(() => {
        if (supertype && armyList){
            const army = armyList[5].find(item => item[0] == forceId);
            const upgrades = (army[6].map(item => item[9]))
            const nonNullUpgrades = (upgrades.filter(item => item[0][0] !== null))
            setAllInstances((nonNullUpgrades.filter(item => item[0][2] == supertype[0])).length);
        }
        // [2] = targe id

    }, [totalInstances, armyList]);

    useEffect(() => {

        if (typeMinimum > totalInstances) {
            setError('Error // The number of total instances of this supertype is below the minimum required');
        } else if (typeMaximum !== null && typeMaximum < totalInstances) {
            setError('Error // The number of total instances of this supertype exceeds the maximum allowed');
        } else if (typeLimit !== null && typeLimit < allInstances) {
            setError('Error // The number of all instances of this supertype across the army exceeds the maximum allowed');
        }  else {
            setError('');
        }

    }, [typeMinimum, typeMaximum, typeLimit, totalInstances]);

    return (
        <div>
            <h3>{supertype[1]}</h3>
            <p>{error}</p>
            {supertype && supertype[0][0] !== null ? (
                <div>
                        {[...Array(supertype[5].length)].map((_, index) => (
                            <Fragment key={index}>
                                {/* <p>{supertype[5][index]}</p> */}
                                <Upgrade
                                    key={index} 
                                    armyList={armyList}
                                    gameSystem={gameSystem}
                                    armies={armies}
                                    forceId={forceId}
                                    upgrade={supertype[5][index]}
                                    typeMinimum={typeMinimum}
                                    typeMaximum={typeMaximum}
                                    typeLimit={typeLimit}
                                    totalInstances={totalInstances}
                                    callculateTotalInstances={callculateTotalInstances}
                                    alUnitId={alUnitId}
                                    aUtId={aUtId}
                                    handleCreate={handleCreate}
                                />
                            </Fragment>
                        ))}
                </div>

            ) : (
                <div>Loading...</div>
            )}

        </div>
    );
};

export default UpgradeSupertype;
