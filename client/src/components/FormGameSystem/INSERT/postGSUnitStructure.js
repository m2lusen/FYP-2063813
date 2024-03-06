import React, { Fragment, useState } from "react";

const PostGSUnitStructure = () => {

    const [gameSystemId, setGameSystemId] = useState(null);

    const onSubmitForm = async (e) => {
        e.preventDefault(); // stops refreshing
        try {
            const body = {
                "game_system_id": [gameSystemId]
            };
            const response = await fetch("http://localhost:4000/gs_unit_structure",{
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
            <h1>PostGSUnitStructure</h1>
        </Fragment>
    );
};

export default PostGSUnitStructure;
