
import React, {useEffect} from "react";
import armyForm from "./sub-components/armyForm";

const FormArmy = ({gameSystem}) => {

    useEffect(() => {
        console.log('test')
        if (gameSystem){
            console.log(gameSystem)
        }
    }, [gameSystem]);

    return (
        <div>


            <h1>FormArmy</h1>

            <armyForm gameSystem={gameSystem} />
        </div>
    )
}

export default FormArmy;