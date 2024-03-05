import React, { Fragment, useState } from "react";

const InsertAlForce = () => {
    const [armyListId, setArmyListId] = useState(null);
    const [armyId, setArmyId] = useState(null);

    const onSubmitForm = async (e) => {
        e.preventDefault(); // stops refreshing
        try {
            const body = {
                "army_list_id": [armyListId], 
                "army_id": [armyId] 
            };
            const response = await fetch("http://localhost:4000/al_force",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            if (response.ok) {
                console.log("Al force created successfully");
            } else {
                console.error("Failed to create Army List");
            }
        } catch (err)  {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1>Insert AL force</h1>
        </Fragment>
    );
};

export default InsertArmyList;
