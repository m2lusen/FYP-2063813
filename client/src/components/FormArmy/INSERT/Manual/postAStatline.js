import React, { Fragment, useState } from "react";

const PostAStatline = () => {

    const [aStatlineName, setAStatlineName] = useState('');

    const onSubmitForm = async (e) => {
        e.preventDefault(); // stops refreshing
        try {
            const body = {
                "a_statline_name": [aStatlineName],
            };
            const response = await fetch("http://localhost:4000/a_statline",{
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
            <h1>PostAStatline</h1>
        </Fragment>
    );
};

export default PostAStatline;


// BELLOW NEEDS TO BE TESTED
// import React, { Fragment, useState } from "react";

// const PostAStatline = () => {
//     const [aStatlineName, setAStatlineName] = useState('');
//     const [statValue, setStatValue] = useState(null);

//     const onSubmitForm = async (e) => {
//         e.preventDefault(); // stops refreshing
//         try {
//             const body = {
//                 "a_statline_name": aStatlineName
//             };
//             const response = await fetch("http://localhost:4000/a_statline", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(body)
//             });

//             if (response.ok) {
//                 console.log("A statline created successfully");
//                 const responseData = await response.json();
//                 const aStatlineId = responseData.a_statline_id;
                
//                 // Use the a_statline_id to create a_statline_gs_stat
//                 const gsStatId = 1; // TEMP

//                 // Create a_statline_gs_stat
//                 const gsStatBody = {
//                     "a_statline_id": aStatlineId,
//                     "gs_stat_id": gsStatId,
//                     "stat_value": statValue
//                 };

//                 const gsStatResponse = await fetch("http://localhost:4000/a_statline_gs_stat", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(gsStatBody)
//                 });

//                 if (gsStatResponse.ok) {
//                     console.log("A statline_gs_stat created successfully");
//                 } else {
//                     console.error("Failed to create a_statline_gs_stat");
//                 }
//             } else {
//                 console.error("Failed to create a_statline");
//             }
//         } catch (err) {
//             console.error(err.message);
//         }
//     };

//     return (
//         <Fragment>
//             <h1>PostAStatline</h1>
//             <form onSubmit={onSubmitForm}>
//                 <input type="text" value={aStatlineName} onChange={(e) => setAStatlineName(e.target.value)} />
                // <input type="text" value={statValue} onChange={(e) => setStatValue(e.target.value)} />
//                 <button type="submit">Create A Statline</button>
//             </form>
//         </Fragment>
//     );
// };

// export default PostAStatline;
