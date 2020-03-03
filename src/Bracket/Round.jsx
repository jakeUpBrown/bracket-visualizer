import React from 'react';
import '../App.css';
import Game from './Game.jsx'
import ChampionshipGame from './ChampionshipGame.jsx'
import BracketLine from './BracketLine.jsx'
import {
    getStartingGameIdByColumn,
    isLeftSide,
    isColumnChampionship,
    getRoundNumFromColumnIndex,
    getNumGamesForColumnByRoundNum
} from './utils/Helpers.js';

const round = 
({
    columnIndex,
}) => {
    const left = isLeftSide(columnIndex);
    const roundIndex = getRoundNumFromColumnIndex(columnIndex);
    const numGames = getNumGamesForColumnByRoundNum(roundIndex);
    const isChampionship = isColumnChampionship(roundIndex);

    // insert games directly into round with space-around
    let numBracketLines = Math.floor(numGames / 2);
    let bracketLines = [];
    if (numBracketLines <= 0) {
        // should be center line inserted instead.SW
        bracketLines[0] = <BracketLine key={`bracket-line-${columnIndex}`} oneGame={true} />
    } else {
        let i;
        for (i = 0; i < numBracketLines; i++) {
            bracketLines[i] = <BracketLine key={`bracket-line-${columnIndex}-${i}`} left={left}></BracketLine>
        }
    }

    let gameId = getStartingGameIdByColumn(roundIndex, left);
    let games = [];
    if (isChampionship) {
        games[0] = <ChampionshipGame key={'championship-game'} gameId={gameId}></ChampionshipGame>
    } else {
        let i;
        for (i = 0; i < numGames; i++) {
            games[i] = <Game key={`game-${columnIndex}-${i}`} gameId={gameId}/>;
            gameId++;
        }
    }

    return (
        <div className="round-container">
            <div className="round">
                <div className="outer-bracket-line-container">
                    {bracketLines}
                </div>
                <div className={`outer-game-container ${(left ? "left" : "right")}`}>
                    {games}
                </div>
            </div>
        </div>
    )
}

export default React.memo(round);