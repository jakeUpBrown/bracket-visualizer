import React from 'react';
import '../../App.css';
import Round from './Round';
import { TOTAL_COLUMNS } from '../../utilities/Constants';

const Bracket = () => {
    let rounds = [];
    let columnIndex = 0;
    for (columnIndex = 0; columnIndex < TOTAL_COLUMNS; columnIndex++) {
        rounds[columnIndex] = <Round key={`round${columnIndex}`} columnIndex={columnIndex}/>;
    }
    return (
        <div className="bracket">
            {rounds}
        </div>
    ) 
}
  
export default React.memo(Bracket);