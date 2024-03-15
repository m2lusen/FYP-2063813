
// import React, {useState} from "react";
// import ArmyForm from "./sub-components/armyForm";

// const FormArmy = ({gameSystem}) => {

//     const [template, setTemplate] = useState(null);

//     return (
//         <div>


//             <h1>FormArmy</h1>

//             <ArmyForm gameSystem={gameSystem} template={template} />
//         </div>
//     )
// }

// export default FormArmy;

import React, { useState } from "react";
import ArmyForm from "./sub-components/armyForm";
import ExistingArmies from "./updateArmyFormMain";

const FormArmy = ({ gameSystem }) => {
    const [template, setTemplate] = useState(null);
    const [mode, setMode] = useState('initial');

    const handleCreateArmy = () => {
        setMode('create');
        setTemplate(null); // Set template to null for creating a new army
    };

    const handleUpdateArmy = () => {
        setMode('update');
    };

    const handleBack = () => {
        setMode('initial');
    };

    const handleArmySelection = (nestedArray) => {
        setTemplate(nestedArray); // Set the selected army's nested array as the template
        setMode('create')
    };

    return (
        <div>
            {mode === 'initial' && (
                <div>
                    <h1>Form Army</h1>
                    <button onClick={handleCreateArmy}>Create Army</button>
                    <button onClick={handleUpdateArmy}>Update Army</button>
                </div>
            )}
            {mode === 'create' && (
                <div>
                    <h1>Create Army</h1>
                    <ArmyForm gameSystem={gameSystem} template={template} />
                    <button onClick={handleBack}>Back</button>
                </div>
            )}
            {mode === 'update' && (
                <div>
                    <h1>Update Existing Army</h1>
                    <ExistingArmies gameSystem={gameSystem} handleClick={handleArmySelection} />
                    <button onClick={handleBack}>Back</button>
                </div>
            )}
        </div>
    );
};

export default FormArmy;
