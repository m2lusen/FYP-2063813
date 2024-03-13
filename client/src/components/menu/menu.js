import { Link } from 'react-router-dom';

function Menu() {
    return (
        <div>
            <div>
                <Link to="/AllArmyLists">All Army Lists</Link>
                <Link to="/Game">Game</Link>
                <Link to="/Settings">Settings</Link>

                <Link to="/FormGame">Form Game</Link> {/**TEMPORARY WILL ONLY BE IN GAME */}
            </div>

            <h1>menu</h1>
        </div>
    )
}

export default Menu;