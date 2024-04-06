import { Link } from 'react-router-dom';
import './menu.css'; // Import CSS file for menu styling
import { ReactComponent as ArmyListIcon } from '../../images/armyListIcon.svg';
import { ReactComponent as GameSystemIcon } from '../../images/gameSystemIcon.svg';
import { ReactComponent as SettingIcon } from '../../images/settingIcon.svg';

function Menu() {
    return (
        <div className="menu-container">
            <h1>Army List Builder</h1>

            <Link to="/AllArmyLists" className="link-box">
                <ArmyListIcon className="menu-icon" /> 
                <h2>All Army Lists</h2>
            </Link>

            <Link to="/Game" className="link-box">
                <GameSystemIcon className="menu-icon" /> 
                <h2>Game</h2>
            </Link>

            <Link to="/Settings" className="link-box">
                <SettingIcon className="menu-icon" /> 
                <h2>Settings</h2>
            </Link>
        </div>
    )
}

export default Menu;
