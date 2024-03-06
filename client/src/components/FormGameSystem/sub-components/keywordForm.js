import React, { useState } from "react";

const KeywordForm = ({ gsUsId, ruleId }) => {
    const [keywordId, setKeywordId] = useState(null);
    const [keywordName, setKeywordName] = useState('');

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
                        "keyword_id": [responseData[0].keywordId_id],
                        "rule_id": [ruleId]
                    };
                    response_intersection = await fetch("http://localhost:4000/keyword_rule",{
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

    const onDeleteClick = async () => {
        try {
            const response = await fetch(`http://localhost:4000/keyword/${keywordId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                console.log("Deleted successfully");
                // Clear gs supertype form fields after deletion
                setKeywordId(null);
                setKeywordName('');
            } else {
                console.error("Failed to delete");
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
                {keywordId && <button type="button" onClick={onDeleteClick}>Delete</button>}
            </form>
        </div>
    );
};

export default KeywordForm;
