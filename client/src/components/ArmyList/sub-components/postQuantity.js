import React, { Fragment, useState } from "react";

const InsertQuantity = () => {

const [alUnitId, setAlUnitId] = useState(null);
const [aUnitId, setAUnitId] = useState(null);
const [aStatlineId, setAStatlineId] = useState(null);
const [quantity, setQuantity] = useState(null);

    const onSubmitForm = async (e) => {
        e.preventDefault(); // stops refreshing
        try {
            const body = {
                "al_unit_id": [alUnitId], 
                "a_unit_id": [aUnitId],
                "a_statline_id": [aStatlineId], 
                "quantity": [quantity]
            };
            const response = await fetch("http://localhost:4000/al_unit_a_unit_a_statline_quantity",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            if (response.ok) {
                console.log("created successfully");
            } else {
                console.error("Failed to create");
            }
        } catch (err)  {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1>Insert Quantity</h1>
        </Fragment>
    );
};

export default InsertQuantity;
