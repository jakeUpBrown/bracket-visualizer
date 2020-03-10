
import React from 'react';
import Bracket from './Bracket.jsx';
import MetaDataTable from './MetaDataTable.jsx';
import '../App.css';

const BracketPage = () => 
(
    <div>
        <div className="bracket-container">
            <Bracket/>
        </div>
        <MetaDataTable />
    </div>
);

export default BracketPage;