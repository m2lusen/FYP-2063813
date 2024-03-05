import React, { Fragment, useState } from "react";

const PostAStatline = () => {

    const [aStatlineName, setAStatlineName] = useState('');

    const onSubmitForm = async (e) => {
        e.preventDefault(); // stops refreshing
        try {
            const body = {
                "a_statline_name": [aStatlineName],
            };
            const response = await fetch("http://localhost:4000/a_statline",{
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
            <h1>PostAStatline</h1>
        </Fragment>
    );
};

export default PostAStatline;
