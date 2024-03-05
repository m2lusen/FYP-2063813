
import React, {Fragment, useEffect, useState} from "react";

function FormArmy() {

    const getGameSystem = async () => {
        try {
            
            const response = await fetch("http://localhost:4000/game_system");
            const jsonData = await response.json();
            console.log(jsonData);

        } catch (err) {
            console.log(err.message) // TEMPORARY
        }
    }

    useEffect(() => {
        getGameSystem();
    })


    return (
        <div>


            <h1>FormArmy</h1>
        </div>
    )
}

export default FormArmy;