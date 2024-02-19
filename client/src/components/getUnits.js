import React, {Fragment, useState} from "react";

// all bellow is temporary  just to showcase fetching from db

const  GetUnit = () => {

    const [description, setDescription] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault(); // stops refreshing
        try {
            const body = {description}; // temp
            const response = fetch("http://localhost:4000/unit",{
                method: "GET",
                headers: {"Content-type": "applications/json"},
                body: JSON.stringify(body) // error no body for get
            })

            // console
            console.log(response);
        } catch (err)  {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1 className="text-center mt-5">Unit's</h1>;
            <form onSubmit={onSubmitForm}>
                <input 
                    type="text" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                />
                <button>Add</button>
            </form>
        </Fragment>
    )
};

export default GetUnit;