import React, { Fragment, useState } from "react";

const PostKeyword = () => {
    const [gsUsId, setGsUsId] = useState(null);
    const [keywordName, setKeywordName] = useState('');

    const onSubmitForm = async (e) => {
        e.preventDefault(); // stops refreshing
        try {
            const body = {
                "gs_us_id": [gsUsId],
                "keyword_name": [keywordName]
            
            };
            const response = await fetch("http://localhost:4000/keyword",{
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
            <h1>PostKeyword</h1>
        </Fragment>
    );
};

export default PostKeyword;
