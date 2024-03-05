import React, { Fragment, useState } from "react";

const PostGsSupertype = () => {

    const [gameSystemId, setGameSystemId] = useState(null);
    const [gsSupertypeName, setGsSupertypeName] = useState('');
    const [gsSupertypeLower, setGsSupertypeLower] = useState(null);

    const onSubmitForm = async (e) => {
        e.preventDefault(); // stops refreshing
        try {
            const body = {
                "game_system_id": [gameSystemId],
                "gs_supertype_name": [gsSupertypeName],
                "gs_supertype_lower": [gsSupertypeLower]
            };
            const response = await fetch("http://localhost:4000/gs_supertype",{
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
            <h1>PostGsSupertype</h1>
        </Fragment>
    );
};

export default PostGsSupertype;
