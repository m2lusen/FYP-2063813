import React, { useState, Fragment, useEffect, useCallback } from "react";
import KeywordForm from "./keywordForm";

const RuleForm = ({ gameSystemId, gsUsId, template, remove, ruleFormIndex, totalForms, onDeleteConfirmation, onDeleteConfirmationNullId }) => {
    const [ruleId, setRuleId] = useState(null);
    const [ruleName, setRuleName] = useState('');
    const [ruleDescription, setRuleDescription] = useState('');

    const [keywords, setKeywords] = useState([]);

    const [numKeywordForms, setNumKeywordForms] = useState(1);

    const [removedKeyword, setRemovedKeyword] = useState(false);

    const [cascadeDelete, setCascadeDelete] = useState(false);

    useEffect(() => {
        if (cascadeDelete === true){
            setRemovedKeyword(true);
        }
    }, [cascadeDelete]);
    
    const performRuleDeletion = async () => {
        try {
            const response = await fetch(`http://localhost:4000/rule/${ruleId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                console.log("Deleted successfully");
    
                setRuleId(null);
                setRuleName('');
                setRuleDescription('');
                onDeleteConfirmation(); // Trigger the callback function after successful deletion
            } else {
                console.error("Failed to delete");
            }
        } catch (err) {
            console.error(err.message);
        }
    };
    
    const onDeleteRuleClick = useCallback(async () => { // also on delete ensure that all keywordId that are dependent on are deleted
        setCascadeDelete(true);
    }, []);

    useEffect(() => { // since a useEffect is being used will run everytime that page loaded, also add a bool, to confirm whether should be added or not
        if (remove === true){
            if (ruleFormIndex === totalForms - 1) {
                console.log("REMOVED"); // Log only when the last GsSupertypeForm is removed
                if (ruleId !== null){
                    onDeleteRuleClick();
                } else {
                    onDeleteConfirmationNullId();
                }
            }
        }
    }, [remove, ruleFormIndex, totalForms, ruleId, onDeleteRuleClick, onDeleteConfirmationNullId]);

    useEffect(() => {
        if (cascadeDelete === true && numKeywordForms === 0) {
            // Perform the rule deletion once numKeywordForms becomes 0
            performRuleDeletion();
        }
    }, [cascadeDelete, numKeywordForms, performRuleDeletion]);

    useEffect(() => {
        if (template) {
            const [id, name, description, keywordsArr] = template;
            setRuleId(id);
            setRuleName(name);
            setRuleDescription(description);
            setKeywords(keywordsArr);
            setNumKeywordForms(keywordsArr.length);
        }
    }, [template]);

    const onSubmitRuleForm = async (e) => {
        e.preventDefault(); // stops refreshing
        try {
            let body;
            let response;
            // If gsSupertypeId is null, create a new gs supertype
            if (ruleId === null) {
                body = {
                    "game_system_id": [gameSystemId],
                    "rule_name": [ruleName],
                    "rule_description": [ruleDescription]
                };
                response = await fetch("http://localhost:4000/rule", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                if (response.ok) {
                    const responseData = await response.json();
                    console.log('Created rule: ', responseData)
                    setRuleId(responseData[0].rule_id);
                } else {
                    console.error("Failed to create rule");
                }
            } else {
                body = {
                    "game_system_id": gameSystemId,
                    "rule_name": ruleName,
                    "rule_description": ruleDescription
                };
                response = await fetch(`http://localhost:4000/rule/${ruleId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                if (response.ok) {
                    const responseData = await response.json();
                    console.log('Updated rule: ', responseData)
                } else {
                    console.error("Failed to update rule");
                }
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const addKeywordForm = () => {
        setNumKeywordForms(prev => prev + 1); 
    };
    const removeKeywordForm = () => {
        if (keywords.length !== 0) {
            setKeywords(keywords.slice(0, keywords.length - 1));
        }
        setRemovedKeyword(true);
        // setNumKeywordForms(prev => prev - 1); 
    };    

    const handleKeywordRemoveConfirmation = useCallback(() => {
        setRemovedKeyword(false);
        setNumKeywordForms(prev => prev - 1); 
    }, []);
    const handleKeywordDeletionConfirmation = useCallback(() => {
        setRemovedKeyword(false);
        setNumKeywordForms(prev => prev - 1); 
    }, []);

    return (
        <div>
            <h4>Add New Rule</h4>
            <form onSubmit={onSubmitRuleForm}>
            <label>rule name:</label>
                <input type="text" value={ruleName} onChange={(e) => setRuleName(e.target.value)} required />
                <label>rule description:</label>
                <input type="text" value={ruleDescription} onChange={(e) => setRuleDescription(e.target.value)} required />
                <button type="submit">{ruleId ? "Update" : "Create"}</button>
                {ruleId && <button type="button" onClick={onDeleteRuleClick}>Delete</button>}
            </form>

            {ruleId && (
                <Fragment>
                    <div>
                    <h2>Add Keyword to this Rule</h2>
                        {[...Array(numKeywordForms)].map((_, index) => (
                            <KeywordForm
                                key={index} 
                                gsUsId={gsUsId}
                                ruleId={ruleId} 
                                template={keywords[index]}
                                remove={removedKeyword}
                                index={index} 
                                totalForms={numKeywordForms} 
                                onDeleteConfirmation={handleKeywordDeletionConfirmation}
                                onDeleteConfirmationNullId={handleKeywordRemoveConfirmation}
                            /> 
                        ))}
                        <button onClick={addKeywordForm}>Add New keyword</button>
                        <button onClick={removeKeywordForm}>Remove Newest keyword</button>
                    </div>
                </Fragment>
            )}
        </div>
    );
};

export default RuleForm;
