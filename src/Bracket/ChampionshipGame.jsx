import React from 'react';
import '../App.css';
import Game from './Game.jsx'
import TeamLine from './TeamLine.jsx'

const championshipGame = 
({ gameId }) => 
(
    <div className="game-container">
        <div className="championship-game-box">
            <div className="champions">
                National Champs
                <TeamLine isTeam1={true} gameId={gameId + 1}></TeamLine>
            </div>
            <Game gameId={gameId} isTeam1={true}></Game>
        </div>
    </div>
)

export default React.memo(championshipGame);