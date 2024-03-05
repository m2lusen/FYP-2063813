import React, { Fragment, useState} from 'react';
// import PdfViewer from './components/pdf/PdfViewer';
import InsertArmyList from './sub-components/insertArmyList';
import ListArmyList from './sub-components/listArmyList'
import ListGameSystem from './sub-components/listGameSystems';

import { Link } from 'react-router-dom';

function AllArmyListsMain() {
    return (
        <Fragment>
            <div>
                <Link to="/ArmyList">Army List</Link>
            </div>

            <div className="insertArmyList">
                <InsertArmyList/>
            </div>
            <div className="ListArmyList">
                <ListArmyList/>
            </div>
            <div className="ListGameSystem">
                <ListGameSystem/>
            </div>
        </Fragment>
    );
}

export default AllArmyListsMain;
