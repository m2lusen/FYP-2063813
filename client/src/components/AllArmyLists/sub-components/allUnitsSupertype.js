import React, { Fragment, useState, useEffect} from 'react';
import AllUnitsUnit from './allUnitsUnit';
// import { GetArmyList } from "../getRequests";


function AllUnitsSupertype({ armyList, gameSystem, armies, forceId, content, handleCreate }) { // some kind of error were displayed when not the right force

    const [supertypeMinimum, setSupertypeMinimum] = useState(null);
    const [supertypeLimit, setSupertypeLimit] = useState(null);

    const [totalInstances, setTotalInstances] = useState(0);

    useEffect(() => {
        const supertypeInfo = gameSystem[6].find(item => item[0] === content[0][0]);
        if (supertypeInfo[2] !== null){
            console.log(supertypeInfo[2])
            setSupertypeMinimum(supertypeInfo[2]);
        }
        if (supertypeInfo[3] !== null){
            console.log(supertypeInfo[3])
            setSupertypeLimit(supertypeInfo[3]);
        }
    }, [armyList, gameSystem, armies]);

    const callculateTotalInstances = (newInstances, oldIntances) => {
        setTotalInstances(totalInstances - oldIntances + newInstances);
    }

    return (
        <div>
            <h3>{content[0][1]}</h3>

            {content && content[0][0] !== null ? (
                <div>
                        {[...Array(content.length)].map((_, index) => (
                            <Fragment>
                                {/* <p>{content[index]}</p> */}
                                {/* <p>{content[index][9]}</p> */}
                                <AllUnitsUnit
                                    key={index} 
                                    armyList={armyList}
                                    gameSystem={gameSystem}
                                    armies={armies}
                                    forceId={forceId}
                                    content={content[index]}
                                    supertypeMinimum={supertypeMinimum}
                                    supertypeLimit={supertypeLimit}
                                    totalInstances={totalInstances}
                                    callculateTotalInstances={callculateTotalInstances}
                                    handleCreate={handleCreate}
                                />
                            </Fragment>
                            // <AllUnitsSupertype 
                            //     key={index} 
                            //     armyList={armyList}
                            //     gameSystem={gameSystem}
                            //     armies={armies}
                            //     content={units[index]}
                            //     handleCreate={handleCreate}
                            // /> 
                        ))}
                </div>

            ) : (
                <div>Loading...</div>
            )}

        </div>
    );
};

export default AllUnitsSupertype;
