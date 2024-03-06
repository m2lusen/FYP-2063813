import React, { Fragment, useState } from "react";

const PostRuleAUnit = () => {
    const [ruleId, setRuleId] = useState(null);
    const [aUnitId, setAUnitId] = useState(null);

    const onSubmitForm = async (e) => {
        e.preventDefault(); // stops refreshing
        try {
            const body = {
                "rule_id": [ruleId],
                "a_unit_id": [aUnitId]
            };
            const response = await fetch("http://localhost:4000/rule_a_unit",{
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
            <h1>PostRuleAUnit</h1>
        </Fragment>
    );
};

export default PostRuleAUnit;
