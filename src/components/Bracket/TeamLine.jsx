import React, { PureComponent } from 'react';
import '../../App.css';
import { connect } from 'react-redux';
import { teamIndexSelector } from '../../utilities/selectors'
import { setSelectedTeamLineFuncer, setSelectedGameIdFuncer } from '../../utilities/mappedActions'
import { gameHasAllSlotsFilled } from '../../utilities/Helpers'

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
            this.props.setSelectedTeamLine({});
        } else {
            this.props.setSelectedTeamLine({ selectedGameId: this.props.gameId, team1Selected: this.props.isTeam1 });
        }
    }
    
    render() {
        const isChampLabel = this.props.gameId === 63;
        const isFinalsGame = this.props.gameId === 62;
        let teamLineClass = `teamline ${this.props.isTeam1 ? 'topTeam ' : 'bottomTeam '}`;
        if (isChampLabel) {
            teamLineClass += 'champ-line ';
        } else {
            if (isFinalsGame) teamLineClass += (this.props.isTeam1) ? 'finals-team-1 ' : 'finals-team-2 ';
            if (this.props.allSlotsFilled) teamLineClass += 'all-slots-filled ';
        }
        if (this.props.teamWon !== undefined) teamLineClass += (this.props.teamWon ? ' team-won' : 'team-lost');
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
    const {
        selectedGameId,
        games,
        team1Selected,
        teams,
    } = state.toJS();
    const game = games[gameId];
    const teamInfo = teams[teamIndex];
    const score = (isTeam1 ? game.team1Score : game.team2Score);
    const gameSelected = gameId === selectedGameId;
    const teamLineSelected = gameSelected && isTeam1 === team1Selected;
    return {
        score,
        teamInfo,
        allSlotsFilled: gameHasAllSlotsFilled(game),
        teamWon: game.team1Won === isTeam1,
        teamLineSelected,
        gameSelected,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedTeamLine: setSelectedTeamLineFuncer(dispatch),
        setSelectedGameId: setSelectedGameIdFuncer(dispatch),
    }
}

const Disconnected = connect(mapStateToProps, mapDispatchToProps)(TeamLine);

export default React.memo(Disconnected);