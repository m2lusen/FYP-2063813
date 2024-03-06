import React, { Fragment, useState } from "react";

const PostRule = () => {

    const [gameSystemId, setGameSystemId] = useState(null);
    const [ruleName, setRuleName] = useState('');
    const [ruleDescription, setRuleDescription] = useState('');

    const onSubmitForm = async (e) => {
        e.preventDefault(); // stops refreshing
        try {
            const body = {
                "game_system_id": [gameSystemId],
                "rule_name": [ruleName],
                "rule_description": [ruleDescription]
            };
            const response = await fetch("http://localhost:4000/rule",{
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
            <h1>PostRule</h1>
        </Fragment>
    );
};

export default PostRule;
