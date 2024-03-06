import React, { Fragment, useState } from "react";

const PostGame = () => { // can be moved into main

    const [gameSystemName, setGameSystemName] = useState('');
    const [gameSystemEdition, setGameSystemEdition] = useState('');
    const [gameSystemVersion, setGameSystemVersion] = useState(null);

    const onSubmitForm = async (e) => {
        e.preventDefault(); // stops refreshing
        try {
            const body = {
                "game_system_name": [gameSystemName],
                "game_system_edition": [gameSystemEdition],
                "game_system_version": [gameSystemVersion]
            
            };
            const response = await fetch("http://localhost:4000/game_system",{
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
            <h1>PostGame</h1>
        </Fragment>
    );
};

export default PostGame;
