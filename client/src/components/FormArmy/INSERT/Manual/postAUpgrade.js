import React, { Fragment, useState } from "react";

const PostAUpgrade = () => {
    const [aUtId, setAUtId] = useState(null);
    const [aUpgradePC, setAUpgradePC] = useState(null);
    const [aUpgradeName, setAUpgradeName] = useState('');

    const onSubmitForm = async (e) => {
        e.preventDefault(); // stops refreshing
        try {
            const body = {
                "a_ut_id": [aUtId],
                "a_upgrade_PC": [aUpgradePC],
                "a_upgrade_name": [aUpgradeName]
            };
            const response = await fetch("http://localhost:4000/a_upgrade",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            if (response.ok) {
                console.log("Created successfully");
            } else {
                console.error("Failed to create");
            }
        } catch (err)  {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1>PostAUpgrade</h1>
        </Fragment>
    );
};

export default PostAUpgrade;
