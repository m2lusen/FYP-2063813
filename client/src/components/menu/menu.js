import { Link } from 'react-router-dom';

function Menu() {
    return (
        <div>
            <div>
                <Link to="/AllArmyLists">All Army Lists</Link>
                <Link to="/Game">Game</Link>
                <Link to="/Settings">Settings</Link>

                <Link to="/FormArmy">Form Army</Link>
                <Link to="/FormGame">Form Game</Link>
            </div>

            <h1>menu</h1>
        </div>
    )
}

export default Menu;