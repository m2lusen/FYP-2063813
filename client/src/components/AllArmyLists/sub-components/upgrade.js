import React, { Fragment, useState, useEffect, forwardRef} from 'react';
import { GetArmyList } from "../getRequests";
// currently not using handleCreate

const Upgrade = ({ armyList, gameSystem, armies, forceId, upgrade, typeMinimum, typeMaximum, typeLimit, totalInstances, callculateTotalInstances, alUnitId, aUtId, handleCreate}) => {

    const [alUpgradeId, setAlUpgradeId] = useState(null);
    const [aUpgradeId, setAUpgradeId] = useState(null);

    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        if (upgrade) {
            setAUpgradeId(upgrade[0])
        }
        if (armyList){
            const army = armyList[5].find(item => item[0] == forceId);
            const unit = army[6].find(item => item[10] == alUnitId);
            if (unit !== undefined){
                const upgrades = (unit[9].filter(item => item[0][0] !== null))
                const revelevantUpgrade = (upgrades.find(item => item[1] == upgrade[0]))
                if (revelevantUpgrade !== undefined){
                    setAlUpgradeId(revelevantUpgrade[0]);
                }
            }

        }
    }, [upgrade, armyList]);

    const onDeleteUpgradeClick = async () => { 
        try {
            const response = await fetch(`http://localhost:4000/al_upgrade/${alUpgradeId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                console.log("Deleted successfully");
                
                setAlUpgradeId(null)

                setUpdated(true);
            } else {
                console.error("Failed to delete");
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const onSubmitUpgradeForm = async () => {
        try {
            let body;
            let response;
            body = {
                "al_unit_id": [alUnitId],
                "a_upgrade_id": [aUpgradeId],
                "a_ut_id": [aUtId]
            };

            response = await fetch("http://localhost:4000/al_upgrade", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log("body: ", responseData);
                setAlUpgradeId(responseData[0].al_upgrade_id);

                setUpdated(true);
            } else {
                console.error("Failed to create a_unit");
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        if (updated) {
            const fetchData = async () => {
                try {
                    const newLists = await GetArmyList();

                    const filteredNewArmyLists = newLists.find(subArray => subArray[0] == armyList[0]);

                    const newTemplate = {
                        "Army_List": filteredNewArmyLists,
                        "Linked_Game_System": gameSystem,
                        "Linked_Armies": armies
                    }

                    handleCreate(newTemplate);
                    
                    setUpdated(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
    }, [updated]);

    const submitDecide = () => {
        console.log('submitDecide', alUpgradeId)
        if (alUpgradeId == null){
            onSubmitUpgradeForm();
        } else {
            onDeleteUpgradeClick();
        }
    }

// add button for rules
    return (
        <div> 
            <form> 
                <label>
                    {upgrade[2]}
                    {upgrade[1]} pts
                </label>
                <button onClick={submitDecide}>{alUpgradeId ? "-" : "+"}</button>
                {/* <input min={0} type="number" value={alUnitNumber} onChange={(e) => handleChange(e.target.value)} required /> */}
            </form>
        </div>
    );
};

export default  Upgrade;
