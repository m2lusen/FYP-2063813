import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useLocation } from 'react-router-dom';
import PdfViewer from './components/pdf/PdfViewer';
import AllArmyListsMain from './components/AllArmyLists/AllArmyListsMain';
import Game from './components/game/gameMain';
import Settings from './components/setting/settingMain';
import FormArmy from './components/FormArmy/FormArmyMain';
import FormGame from './components/FormGameSystem/FormGameMain';
import Menu from './components/menu/menu';
import './components/setting/settings.css'; 

function App() {
    const location = useLocation();

    return (
        <Router>
            {/* <div className="app-container">
                <div className="dropdown">
                    <button className="dropbtn">Menu</button> 
                    <div className="dropdown-content">
                    <Link to="/">Menu</Link>
                        <Link to="/AllArmyLists">Army Lists</Link>
                        <Link to="/Game">Game</Link>
                        <Link to="/Settings">Settings</Link>
                    </div>
                </div>
            </div> */}

            <Switch>
                <Route path="/Settings">
                    <Settings />
                </Route>
                <Route path="/Game">
                    <Game />
                </Route>
                <Route path="/AllArmyLists">
                    <AllArmyListsMain />
                </Route>
                <Route path="/FormArmy">
                    <FormArmy />
                </Route>
                <Route path="/FormGame">
                    <FormGame />
                </Route>
                <Route exact path="/">
                    <Menu />
                </Route>
                <Route path="/PdfViewer">
                    <PdfViewer />
                </Route>
            </Switch>

            <div className="app-container">
                <div className="dropdown">
                    <button className="dropbtn">Menu</button> 
                    <div className="dropdown-content">
                    <Link to="/">Menu</Link>
                        <Link to="/AllArmyLists">Army Lists</Link>
                        <Link to="/Game">Game</Link>
                        <Link to="/Settings">Settings</Link>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;

