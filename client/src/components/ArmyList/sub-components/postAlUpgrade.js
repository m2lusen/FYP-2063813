import React, { Fragment, useState } from "react";

const InsertAlUpgrade = () => {

    const [aLUnitId, setAlUnitId] = useState(null);
    const [aUpgradeId, setAUpgradeId] = useState(null);
    const [aUtId, setAUtId] = useState(null);

    const onSubmitForm = async (e) => {
        e.preventDefault(); // stops refreshing
        try {
            const body = {
                "al_unit_id": [aLUnitId], 
                "a_upgrade_id": [aUpgradeId], 
                "a_ut_id": [aUtId]
            };
            const response = await fetch("http://localhost:4000/al_upgrade",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            if (response.ok) {
                console.log("created successfully");
            } else {
                console.error("Failed to create");
            }
        } catch (err)  {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1>Insert AL Upgrade</h1>
        </Fragment>
    );
};

export default InsertALUpgrade;
