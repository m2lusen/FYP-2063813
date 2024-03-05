
import React, {Fragment, useEffect, useState} from "react";

const ListGameSystem = () => {

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
        <Fragment>
            <table> {/* TEMPORARY AS TABLE*/}
                <thead>
                <tr>
                    <th>TEMPORARY TITLE game_system</th>
                </tr>
                </thead>
                <tbody>
                    {/* 
                    <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr>
                    */}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListGameSystem;