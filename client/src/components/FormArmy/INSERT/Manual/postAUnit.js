import React, { Fragment, useState } from "react";

const PostAUnit = () => {
    const [armyId, setArmyId] = useState(null);
    const [gsSupertypeId, setGsSupertypeId] = useState(null);
    const [aUnitName, setAUnitName] = useState('');
    const [aUnitPC, setAUnitPC] = useState(null);
    const [aUnitLimitPerArmy, setAUnitLimitPerArmy] = useState(null);


    const onSubmitForm = async (e) => {
        e.preventDefault(); // stops refreshing
        try {
            const body = {
                "army_id": [armyId],
                "gs_supertype_id": [gsSupertypeId],
                "a_unit_name": [aUnitName],
                "a_unit_PC": [aUnitPC],
                "a_unit_limit_per_army": [aUnitLimitPerArmy]
            };
            const response = await fetch("http://localhost:4000/a_unit",{
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
            <h1>PostAUnit</h1>
        </Fragment>
    );
};

export default PostAUnit;