import React, { PureComponent } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { teamIndexSelector } from '../utilities/selectors'
import { setSelectedTeamLine, setSelectedGameId } from '../ducks/reducer'

class TeamLine extends PureComponent {
    constructor(props)
    {
      super(props);
      this.handleTeamLineClicked = this.handleTeamLineClicked.bind(this);
    }
    
    state = {
      highlighted: false,
    };

    handleTeamLineClicked = () => {
        if (this.props.allSlotsFilled) {
            if(this.props.gameSelected) this.props.setSelectedGameId();
            else this.props.setSelectedGameId(this.props.gameId)
            return;
        }
        if (this.props.teamLineSelected) {
            this.props.setSelectedTeamLine();
        } else {
            this.props.setSelectedTeamLine(this.props.gameId, this.props.isTeam1);
        }
    }
    
    render() {
        const isChampLabel = this.props.gameId === 63;
        let teamLineClass = `teamline ${this.props.isTeam1 ? 'topTeam ' : 'bottomTeam '}`;
        if (isChampLabel) {
            teamLineClass += 'champ-line ';
        } else if (this.props.allSlotsFilled) {
            teamLineClass += 'all-slots-filled ';
        }
        if (this.props.teamWon !== undefined) {
            teamLineClass += (this.props.teamWon ? ' team-won' : 'team-lost');
        }
        if (this.props.teamLineSelected) teamLineClass += ' selected-team-line';

        if (!this.props.teamInfo) {
            // game has not been set yet. Should render totally different component
            return (
                <div className={teamLineClass}
                    onClick={this.handleTeamLineClicked}
                >
                </div>
            )
        }
        return (
            <div className={teamLineClass}
                onClick={this.handleTeamLineClicked}
            >
                <span className="seed">
                {this.props.teamInfo.seed}
                </span>
                <span className="team-name">
                    {this.props.teamInfo.name}
                </span>
                <span className="score">
                    {this.props.score}
                </span>
            </div>
        );
    }
    
}

const mapStateToProps = (state, { gameId, isTeam1 }) => {
    const teamIndex = teamIndexSelector(state, gameId, isTeam1);
    const jsState = state.toJS();
    let game = jsState.games[gameId];
    const score = (isTeam1 ? game.team1Score : game.team2Score);
    const gameSelected = gameId === jsState.selectedGameId;
    const teamLineSelected = gameSelected && isTeam1 === jsState.team1Selected;
    return {
        score,
        teamInfo: jsState.teams[teamIndex],
        allSlotsFilled: game.team1Id !== undefined && game.team2Id !== undefined,
        teamWon: game.team1Won === isTeam1,
        teamLineSelected,
        gameSelected,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedTeamLine: (gameId, isTeam1) => dispatch(setSelectedTeamLine(gameId, isTeam1)),
        setSelectedGameId: gameId => dispatch(setSelectedGameId(gameId)),
    }
}

const Disconnected = connect(mapStateToProps, mapDispatchToProps)(TeamLine);

export default React.memo(Disconnected);