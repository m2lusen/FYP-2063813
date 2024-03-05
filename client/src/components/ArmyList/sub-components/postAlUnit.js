import React, { Fragment, useState } from "react";

const InsertAlUnit = () => {

    const [alForceId, setArmyListId] = useState(null);
    const [aUnitId, setAUnitId] = useState(null);
    const [alUnitName, setAlUnitName] = useState('');
    const [alUnitColor, setAlUnitColor] = useState('');

    const onSubmitForm = async (e) => {
        e.preventDefault(); // stops refreshing
        try {
            const body = {
                "al_force_id": [alForceId], 
                "a_unit_id": [aUnitId], 
                "al_unit_name": [alUnitName], 
                "al_unit_color": [alUnitColor]
            };
            const response = await fetch("http://localhost:4000/al_unit",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            if (response.ok) {
                console.log("Al unit created successfully");
            } else {
                console.error("Failed to create");
            }
        } catch (err)  {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1>Insert AL unit</h1>
        </Fragment>
    );
};

export default InsertAlUnit;
