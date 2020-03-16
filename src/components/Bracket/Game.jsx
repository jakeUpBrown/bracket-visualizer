import React from 'react';
import '../../App.css';
import TeamLine from './TeamLine';
import { connect } from 'react-redux';
import { gameHasAllSlotsFilled } from '../../utilities/Helpers'

const game = 
({ gameId, selectedGame, allSlotsFilled }) => {
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
        allSlotsFilled: gameHasAllSlotsFilled(game),
        selectedGame: (gameId === jsState.selectedGameId && jsState.team1Selected === undefined),
    };
};

const GameContainer = connect(mapStateToProps)(game);

export default React.memo(GameContainer);