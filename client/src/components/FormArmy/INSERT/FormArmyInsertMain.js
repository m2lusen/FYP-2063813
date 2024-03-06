
// possible is a Auto missing, a_upgrade_rule was noted, however is not a real intersection table
import React, { Fragment, useState } from "react";

const FormArmyInsertMain = () => {
    const [gameSystemId, setGameSystemId] = useState(null);
    const [armyName, setArmyName] = useState('');
    const [armyEdition, setArmyEdition] = useState('');
    const [armyVersion, setArmyVersion] = useState(null);

    const onSubmitForm = async (e) => {
        e.preventDefault(); // stops refreshing
        try {
            const body = {
                "game_system_id": [gameSystemId],
                "army_name": [armyName],
                "army_edition": [armyEdition],
                "army_version": [armyVersion]
            };
            const response = await fetch("http://localhost:4000/army",{
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
            <h1>Army Form Insert New</h1>
        </Fragment>
    );
};

export default FormArmyInsertMain;
