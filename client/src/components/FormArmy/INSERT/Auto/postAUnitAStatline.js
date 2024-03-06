import React, { Fragment, useState } from "react";

const PostAStatlineGsStat = () => {
    const [aUnitId, setAUnitId] = useState(null);
    const [aStatlineId, setAStatlineId] = useState(null);
    const [aStatlineMin, setAStatlineMin] = useState(null);
    const [aStatlineMax, setAStatlineMax] = useState(null);
    const [aStatlinePointCost, setAStatlinePointCost] = useState(null);


    const onSubmitForm = async (e) => {
        e.preventDefault(); // stops refreshing
        try {
            const body = {
                "a_unit_id": [aUnitId],
                "a_statline_id": [aStatlineId],
                "a_statline_min": [aStatlineMin],
                "a_statline_max": [aStatlineMax],
                "a_statline_point_cost": [aStatlinePointCost]
            };
            const response = await fetch("http://localhost:4000/a_unit_a_statline",{
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
            <h1>PostAStatlineGsStat</h1>
        </Fragment>
    );
};

export default PostAStatlineGsStat;
