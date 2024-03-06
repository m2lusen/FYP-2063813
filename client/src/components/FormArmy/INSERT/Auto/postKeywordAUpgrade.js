import React, { Fragment, useState } from "react";

const PostKeywordAUpgrade = () => {
    const [keywordId, setKeywordId] = useState(null);
    const [aUpgradeId, setAUpgradeId] = useState(null);

    const onSubmitForm = async (e) => {
        e.preventDefault(); // stops refreshing
        try {
            const body = {
                "keyword_id": [keywordId],
                "a_upgrade_id": [aUpgradeId]
            };
            const response = await fetch("http://localhost:4000/keyword_a_upgrade",{
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
            <h1>PostKeywordAUpgrade</h1>
        </Fragment>
    );
};

export default PostKeywordAUpgrade;
