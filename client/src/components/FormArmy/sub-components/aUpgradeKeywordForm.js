import React, { useState, useEffect, Fragment, useCallback } from "react";

const AUpgradeKeywordForm = ({ gameSystem, aUpgradeId, template, remove, index, totalForms, onDeleteConfirmation, onDeleteConfirmationNullId }) => {
    // const [aUnitId, setAUnitId] = useState(null);
    const [keywordId, setKeywordId] = useState(null);
    const [oldKeywordId, setOldKeywordId] = useState(null);
    const [keywords, setKeywords] = useState([]);

    const onDeleteAUpgradeKeywordClick = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:4000/keyword_a_upgrade/${oldKeywordId}/${aUpgradeId}`, {
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
    }, [aUpgradeId, oldKeywordId, onDeleteConfirmation]);

    useEffect(() => { 
        if (remove === true){
            if (index === totalForms - 1) {
                console.log("REMOVED"); 
                if (oldKeywordId !== null){
                    onDeleteAUpgradeKeywordClick();
                } else {
                    onDeleteConfirmationNullId();
                }
            }
        }
    }, [remove, index, totalForms, oldKeywordId, onDeleteAUpgradeKeywordClick, onDeleteConfirmationNullId]);

    useEffect(() => {
        if (gameSystem) {
            let keywordsArr = [];
            let keywordsSet = new Set();
            gameSystem[7].forEach(rule => {
                const keywords = rule[3];
                keywords.forEach(keyword => {
                    const [keywordId] = keyword;
                    if (!keywordsSet.has(keywordId)) {
                        keywordsSet.add(keywordId);
                        keywordsArr.push(keyword);
                    }
                });
            });
            setKeywords(keywordsArr); 
        }
    }, [gameSystem]);

    const onSubmitAUpgradeKeywordForm = async (e) => {
        e.preventDefault();
        try {
            let body;
            let response;
            if (oldKeywordId === null) {
                body = {
                    "keyword_id": [Number(keywordId)],
                    "a_upgrade_id": [aUpgradeId]
                };

                response = await fetch("http://localhost:4000/keyword_a_upgrade", {//possible false positive
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
                    "a_upgrade_id": aUpgradeId
                };

                response = await fetch(`http://localhost:4000/keyword_a_upgrade/${oldKeywordId}/${aUpgradeId}`, {
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
            <form onSubmit={onSubmitAUpgradeKeywordForm}>
                <label>Keyword:</label>
                <select value={keywordId} onChange={(e) => setKeywordId(e.target.value)} required>
                    <option value="">Select Keyword</option>
                    {keywords.map(([id, name]) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                </select>
                <button type="submit">{oldKeywordId  ? "Update" : "Create"}</button>
                {oldKeywordId && <button type="button" onClick={onDeleteAUpgradeKeywordClick}>Delete</button>}
            </form>
        </div>
    );
};

export default AUpgradeKeywordForm;
