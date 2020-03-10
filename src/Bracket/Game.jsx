import React from 'react';
import '../App.css';
import TeamLine from './TeamLine.jsx';
import { connect } from 'react-redux';

const game = 
({ gameId, game, selectedGame, allSlotsFilled }) => {
    return (
        <div className="game-container">
            <div className={`game ${allSlotsFilled ? 'finished' : ''} ${selectedGame ? 'selected-game' : ''}`}>
                <TeamLine isTeam1={true} gameId={gameId}></TeamLine>
                <TeamLine isTeam1={false} gameId={gameId}></TeamLine>
            </div>
        </div>
    )
}

const mapStateToProps = (state, { gameId }) => {
    const jsState = state.toJS();
    const game = jsState.games[gameId];
    return {
        game,
        allSlotsFilled: game.team1Id !== undefined && game.team2Id !== undefined,
        selectedGame: (gameId === jsState.selectedGameId && jsState.team1Selected === undefined),
    };
};

const GameContainer = connect(mapStateToProps)(game);

export default React.memo(GameContainer);