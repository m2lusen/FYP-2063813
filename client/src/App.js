// import React, { Fragment } from "react";

// import GetUnits from "./components/getUnits"

// const App = () => {
//   return (
//   <Fragment>
//     <div className="container">
//       <GetUnits></GetUnits>
  
//     </div>
//   </Fragment>
//   );
// };


// export default App;

import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import PdfViewer from './components/pdf/PdfViewer';

import AllArmyListsMain from './components/AllArmyLists/AllArmyListsMain'
import Game from './components/game/gameMain'
import Settings from './components/setting/settingMain'
import ArmyList from './components/ArmyList/ArmyMain';
import FormArmy from './components/FormArmy/FormArmyMain';
import FormGame from './components/FormGameSystem/FormGameMain';
import Menu from './components/menu/menu';

function App() {
    return (
        // <div className="App">
        //     <AllArmyListsMain/>
        // </div>
        <Router>
            {/** NAVBAR WOULD GO HERE */}
            <div>
                <Link to="/">Home</Link>
            </div>

            <div>
                <Switch>
                    <Route path='/Settings'>
                        <Settings />
                    </Route>
                    <Route path='/Game'>
                        <Game />
                    </Route>
                    <Route path='/AllArmyLists'>
                        <AllArmyListsMain/>
                    </Route>
                    <Route path='/ArmyList'>
                        <ArmyList/>
                    </Route>
                    <Route path='/FormArmy'>{/**POSSIBLY REMOVE */}
                        <FormArmy/>
                    </Route>
                    <Route path='/FormGame'>
                        <FormGame/>
                    </Route>
                    <Route exact path='/'>
                        <Menu/>
                    </Route>
                    <Route path='/PdfViewer'>
                        <PdfViewer />
                    </Route>
                </Switch>
                {/* <Link to="/AllArmyLists">Army List</Link>
                <Link to="/Game">Game</Link>
                <Link to="/Settings">Settings</Link>

                <Routes>
                    <Route path='/AllArmyLists' element={<AllArmyListsMain />} />
                    <Route path='/Game' element={<Game />} />
                    <Route path='/Settings' element={<Settings />}/>
                </Routes> */}
            </div>
        </Router>


    );
}

export default App;
