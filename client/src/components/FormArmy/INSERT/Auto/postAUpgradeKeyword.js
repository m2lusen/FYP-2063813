import React, { Fragment, useState } from "react";

const PostAStatlineGsStat = () => {
    const [aStatlineId, setAStatlineId] = useState(null);
    const [gsStatId, setGsStatId] = useState(null);
    const [statValue, setStatValue] = useState(null);


    const onSubmitForm = async (e) => {
        e.preventDefault(); // stops refreshing
        try {
            const body = {
                "a_statline_name": [aStatlineName],
            };
            const response = await fetch("http://localhost:4000/a_statline_gs_stat",{
                "a_statline_id": [aStatlineId],
                "gs_stat_id": [gsStatId],
                "stat_value": [statValue]
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
            <h1>PostAStatlineGsStat</h1>
        </Fragment>
    );
};

export default PostAStatlineGsStat;
