import React, { Fragment, useState } from "react";

const PostGsStat = () => {
    const [gsUsId, setGsUsId] = useState(null);
    const [gsStatName, setGsStatName] = useState('');
    const [gsStatAcronyme, setGsStatAcronyme] = useState('');

    const onSubmitForm = async (e) => {
        e.preventDefault(); // stops refreshing
        try {
            const body = {
                "gs_us_id": [gsUsId],
                "gs_stat_name": [gsStatName],
                "gs_stat_acronyme": [gsStatAcronyme]
            };
            const response = await fetch("http://localhost:4000/gs_stat",{
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
            <h1>PostGsStat</h1>
        </Fragment>
    );
};

export default PostGsStat;
