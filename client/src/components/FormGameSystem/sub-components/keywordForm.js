import React, { useState, useEffect, useCallback } from "react";

const KeywordForm = ({ gsUsId, ruleId, template, remove, index, totalForms, onDeleteConfirmation, onDeleteConfirmationNullId }) => {
    const [keywordId, setKeywordId] = useState(null);
    const [keywordName, setKeywordName] = useState('');

    const onDeleteKeywordClick = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:4000/keyword/${keywordId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                console.log("Deleted successfully");
                setKeywordId(null);
                setKeywordName('');
                onDeleteConfirmation(); // Trigger the callback function after successful deletion
            } else {
                console.error("Failed to delete");
            }
        } catch (err) {
            console.error(err.message);
        }
    }, [keywordId, onDeleteConfirmation]);

    useEffect(() => { // since a useEffect is being used will run everytime that page loaded, also add a bool, to confirm whether should be added or not
        if (remove === true){
            if (index === totalForms - 1) {
                console.log("REMOVED"); // Log only when the last GsSupertypeForm is removed
                if (keywordId !== null){
                    onDeleteKeywordClick();
                } else {
                    onDeleteConfirmationNullId();
                }
            }
        }
    }, [remove, index, totalForms, keywordId, onDeleteKeywordClick, onDeleteConfirmationNullId]);



    useEffect(() => {
        if (template) {
            setKeywordId(template[0]);
            setKeywordName(template[1]);
        }
    }, [template]);

 const onSubmitKeywordForm = async (e) => {
        e.preventDefault(); // stops refreshing
        try {
            let body;
            let response;
            let response_intersection;
            if (keywordId === null) {
                body = {
                    "gs_us_id": [gsUsId],
                    "keyword_name": [keywordName]
                };
                response = await fetch("http://localhost:4000/keyword", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                if (response.ok) {
                    const responseData = await response.json();
                    console.log('Created keyword: ', responseData)
                    setKeywordId(responseData[0].keyword_id);

                    const body_intersection = {
                        "rule_id": [ruleId],
                        "keyword_id": [responseData[0].keyword_id]
                    };
                    console.log(body_intersection)
                    response_intersection = await fetch("http://localhost:4000/keyword_rule",{ // ruleId not valid
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(body_intersection)
                    });
                    if (response_intersection.ok) {
                        const response_intersectionData = await response_intersection.json();
                        console.log(response_intersectionData);
                    }

                } else {
                    console.error("Failed to create keyword");
                }
            } else {
                body = {
                    "gs_us_id": gsUsId,
                    "keyword_name": keywordName
                };
                response = await fetch(`http://localhost:4000/keyword/${keywordId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                if (response.ok) {
                    const responseData = await response.json();
                    console.log('Updated keyword: ', responseData)
                } else {
                    console.error("Failed to update keyword");
                }
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div>
            <h4>Add New Keyword</h4>
            <form onSubmit={onSubmitKeywordForm}>
                <label>keyword:</label>
                <input type="text" value={keywordName} onChange={(e) => setKeywordName(e.target.value)} required />
                <button type="submit">{keywordId ? "Update" : "Create"}</button>
                {keywordId && <button type="button" onClick={onDeleteKeywordClick}>Delete</button>}
            </form>
        </div>
    );
};

export default KeywordForm;