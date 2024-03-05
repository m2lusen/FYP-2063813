
import React, {Fragment, useEffect, useState} from "react";

const ListArmyList = () => {

    const getArmyList = async () => {
        try {
            
            const response = await fetch("http://localhost:4000/army_list");
            const jsonData = await response.json();
            console.log(jsonData);

        } catch (err) {
            console.log(err.message) // TEMPORARY
        }
    }

    useEffect(() => {
        getArmyList();
    })

    return (
        <Fragment>
            <table> {/* TEMPORARY AS TABLE*/}
                <thead>
                <tr>
                    <th>TEMPORARY TITLE Army Lists</th>
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

export default ListArmyList;