import React, { Fragment, useState } from "react";

const PostAUpgradeType = () => {
    const [aUtName, setAUtName] = useState('');
    const [aUtMin, setAUtMin] = useState(null);
    const [aUtMax, setAUtMax] = useState(null);


    const onSubmitForm = async (e) => {
        e.preventDefault(); // stops refreshing
        try {
            const body = {
                "a_ut_name": [aUtName],
                "a_ut_min": [aUtMin],
                "a_ut_max": [aUtMax]
            
            };
            const response = await fetch("http://localhost:4000/a_upgrade_type",{
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
            <h1>PostAUpgradeType</h1>
        </Fragment>
    );
};

export default PostAUpgradeType;
