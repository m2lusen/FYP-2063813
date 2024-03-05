import { Link } from 'react-router-dom';
import AllUnits from './AllUnits/ArmyListAllUnits';

function ArmyList() {
    return (
        <div>
            <div>
                <Link to="/AllArmyLists">All Army Lists</Link>
            </div>

            <AllUnits/>
            <h1>Army List</h1>
        </div>
    )
}

export default ArmyList;