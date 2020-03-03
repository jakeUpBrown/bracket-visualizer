import React from 'react';
import '../App.css';
import TeamLine from './TeamLine.jsx';
import { connect } from 'react-redux';
import { hasGameBeenPlayed } from './utils/Helpers';

const game = 
({ gameId, hasBeenPlayed, selectedGame }) => {
    return (
        <div className="game-container">
            <div className={`game ${hasBeenPlayed ? 'finished' : ''} ${selectedGame ? 'selected-game' : ''}`}>
                <TeamLine isTeam1={true} gameId={gameId}></TeamLine>
                <TeamLine isTeam1={false} gameId={gameId}></TeamLine>
            </div>
        </div>
    )
}

const mapStateToProps = (state, { gameId }) => {
    const jsState = state.toJS();
    const gameInfo = jsState.games[gameId];
    return {
        hasBeenPlayed: hasGameBeenPlayed(gameInfo),
        selectedGame: (gameId === jsState.selectedGameId && jsState.team1Selected === undefined),
    };
};

const GameContainer = connect(mapStateToProps)(game);

export default React.memo(GameContainer);