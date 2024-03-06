import React, { Fragment, useState } from "react";

const DeleteGame = () => { // can be moved into main
    const game_system_id = 3; // TEMPORARY

    const onSubmitForm = async (e) => {
        e.preventDefault(); // stops refreshing
        try {
            const response = await fetch(`http://localhost:4000/game_system/${game_system_id}`,{
                method: "DELETE"
            });

            if (response.ok) {
                console.log("deleted successfully");
            } else {
                console.error("Failed to delete");
            }
        } catch (err)  {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1>DeleteGame</h1>
        </Fragment>
    );
};

export default DeleteGame;
