
import React, {useEffect} from "react";
import ArmyForm from "./sub-components/armyForm";

const FormArmy = ({gameSystem}) => {

    // useEffect(() => {
    //     if (gameSystem){
    //         console.log(gameSystem)
    //     }
    // }, [gameSystem]);

    return (
        <div>


            <h1>FormArmy</h1>

            <ArmyForm gameSystem={gameSystem} />
        </div>
    )
}

export default FormArmy;