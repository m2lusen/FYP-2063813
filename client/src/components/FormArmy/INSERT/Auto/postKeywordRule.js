import React, { Fragment, useState } from "react";

const PostKeywordRule = () => {
    const [keywordId, setKeywordId] = useState(null);
    const [ruleId, setRuleId] = useState(null);

    const onSubmitForm = async (e) => {
        e.preventDefault(); // stops refreshing
        try {
            const body = {
                "keyword_id": [keywordId],
                "rule_id": [ruleId]
            };
            const response = await fetch("http://localhost:4000/keyword_rule",{
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
            <h1>PostKeywordRule</h1>
        </Fragment>
    );
};

export default PostKeywordRule;
