import React, { useState, useEffect, Fragment, useCallback } from "react";

const AUnitKeywordForm = ({ gameSystem, aUnitId, template, remove, index, totalForms, onDeleteConfirmation, onDeleteConfirmationNullId }) => {
    // const [aUnitId, setAUnitId] = useState(null);
    const [keywordId, setKeywordId] = useState(null);
    const [oldKeywordId, setOldKeywordId] = useState(null);
    const [keywords, setKeywords] = useState([]);

    const onDeleteAUnitKeywordClick = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:4000/keyword_a_unit/${oldKeywordId}/${aUnitId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                console.log("Deleted successfully");
                setKeywordId(null);
                setOldKeywordId(null);

                onDeleteConfirmation(); 
            } else {
                console.error("Failed to delete");
            }
        } catch (err) {
            console.error(err.message);
        }
    }, [aUnitId, oldKeywordId, onDeleteConfirmation]);

    useEffect(() => { 
        if (remove === true){
            if (index === totalForms - 1) {
                console.log("REMOVED"); 
                if (oldKeywordId !== null){
                    onDeleteAUnitKeywordClick();
                } else {
                    onDeleteConfirmationNullId();
                }
            }
        }
    }, [remove, index, totalForms, oldKeywordId, onDeleteAUnitKeywordClick, onDeleteConfirmationNullId]);

    useEffect(() => {
        if (gameSystem) {
            let keywordsArr = [];
            // gameSystem[7].forEach(rule => {
            //     console.log(rule[3])
            //     const keywords = rule[3]; // Get the array of keywords from the input rule
            //     keywordsArr.push(...keywords); // Push each keyword array into the output array
            // });
            let keywordsSet = new Set();
            gameSystem[7].forEach(rule => {
                const keywords = rule[3]; // Get the array of keywords from the input rule
                keywords.forEach(keyword => {
                    const [keywordId] = keyword;
                    if (!keywordsSet.has(keywordId)) {
                        keywordsSet.add(keywordId); // Add the keyword ID to the set if it's not already present
                        keywordsArr.push(keyword); // Push the keyword array into the output array
                    }
                });
            });
            setKeywords(keywordsArr); 
        }
    }, [gameSystem]);

    const onSubmitAUnitKeywordForm = async (e) => {
        e.preventDefault();
        try {
            let body;
            let response;
            if (oldKeywordId === null) {
                body = {
                    "keyword_id": [Number(keywordId)],
                    "a_unit_id": [aUnitId]
                };

                response = await fetch("http://localhost:4000/keyword_a_unit", {//possible false positive
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                if (response.ok) {
                    const responseData = await response.json();
                    console.log("body: ", responseData);
                    setOldKeywordId(responseData[0].keyword_id);
                } else {
                    console.error("Failed to create");
                }
            } else { 
                body = { 
                    "keyword_id": Number(keywordId),
                    "a_unit_id": aUnitId
                };

                response = await fetch(`http://localhost:4000/keyword_a_unit/${oldKeywordId}/${aUnitId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                if (response.ok) {
                    const responseData = await response.json();
                    setOldKeywordId(responseData[0].keyword_id);
                } else {
                    console.error("Failed to update");
                    console.log(response)
                }
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div>
            <h1>{oldKeywordId ? "Edit Keyword Link" : "Link new Keyword"}</h1>
            <form onSubmit={onSubmitAUnitKeywordForm}>
                <label>Keyword:</label>
                <select value={keywordId} onChange={(e) => setKeywordId(e.target.value)} required>
                    <option value="">Select Keyword</option>
                    {keywords.map(([id, name]) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                </select>
                <button type="submit">{oldKeywordId  ? "Update" : "Create"}</button>
                {oldKeywordId && <button type="button" onClick={onDeleteAUnitKeywordClick}>Delete</button>}
            </form>
        </div>
    );
};

export default AUnitKeywordForm;
