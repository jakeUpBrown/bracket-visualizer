import React from 'react';
import '../App.css';

const bracketLine = 
({
    oneGame = false,
    left = true,
}) => {
    let bracketLineClass = "bracket-line " + (oneGame ? "center-line" : (left ? "left-line" : "right-line"));
    return (
        <div className="bracket-line-container">
            <div className={bracketLineClass}>
            </div>
        </div>
    )
}

export default React.memo(bracketLine);