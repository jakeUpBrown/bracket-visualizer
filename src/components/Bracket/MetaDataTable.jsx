import React from 'react';
import { connect } from 'react-redux'
import { 
    getMetaTypeFromIsTeam1Selected,
    gameHasAllSlotsFilled,
    getNextRoundMetaDataIndices,
    getMoneyString,
    getOddsString,
    getRoundNumFromGameId
} from '../../utilities/Helpers'
import gamesMetaData from '../../utilities/ObjectConstants'
import '../../App.css';

const MetaDataTable = ({
    currentOddsForUser,
    selectedUserId,
    selectedGameId,
    team1Selected,
    game,
    teams,
    userPicks,
    teamRoundOdds,
}) => {
    if (!game) {
        return <div className="metadata-table-section" />
    }

    let metaType = getMetaTypeFromIsTeam1Selected(team1Selected);

    const gameSlotsFilled = gameHasAllSlotsFilled(game)
    let gameMetaData = gamesMetaData[selectedUserId][Number(selectedGameId)][metaType];
    if (!gameMetaData && gameSlotsFilled) {
        // try to get the game_id and metaType of the next round slot
        // this is because this should be equivalent to this current game if it hasn't been played.
        const {
            nextRoundGameId,
            metaType,
        } = getNextRoundMetaDataIndices(game)
        gameMetaData = gamesMetaData[selectedUserId][nextRoundGameId][metaType];
    }

    const roundNum = getRoundNumFromGameId(Number(selectedGameId));
    const gameHasBeenPlayed = game.team1Won !== undefined;
    const oddsRoundNum = gameSlotsFilled ? roundNum : roundNum - 1;
    
    let firstRowValues;
    if (gameHasBeenPlayed) {
        const winningTeamId = game.team1Won ? game.team1Id : game.team2Id;
        const winningTeam = teams[winningTeamId];
        firstRowValues = [
            winningTeam.seed,
            winningTeam.name,
            userPicks[winningTeamId],
            getOddsString(teamRoundOdds[winningTeamId].oddsByRound[roundNum])
        ];
    } else {
        firstRowValues = 
        [
            '',
            '(current outlook)',
            '',
            '',
        ]
    }

    return (
        <div className="metadata-table-section">
            <table className="metadata-table">
                <thead>
                    <tr className="metadata-header-row">
                        <th>sd</th>
                        <th>school</th>
                        <th>pts</th>
                        <th>odds</th>
                        <th>avg money</th>
                        <th>1st</th>
                        <th>2nd</th>
                        <th>last</th>
                        <th>avg place</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="current-outlook-row">
                        {firstRowValues.map((val, index) => <td key={`first-row-value-${index}`}>{val}</td>)}
                        <td className='text-center'>{getMoneyString(currentOddsForUser.avgMoney)}</td>
                        <td className='text-center'>{currentOddsForUser.perc1st}%</td>
                        <td className='text-center'>{currentOddsForUser.perc2nd}%</td>
                        <td className='text-center'>{currentOddsForUser.percLast}%</td>
                        <td className='text-center'>{currentOddsForUser.avgPlace}</td>
                    </tr>
                    {gameMetaData && gameMetaData.map((metaData, index) => {
                        const team = teams[metaData.teamId]
                        return (<tr key={`meta-data-row-${index}`}>
                            <td>{team.seed}</td>
                            <td>{team.name}</td>
                            <td>{userPicks[metaData.teamId]}</td>
                            <td className='text-center'>
                                {getOddsString(teamRoundOdds[metaData.teamId].oddsByRound[oddsRoundNum])}
                            </td>
                            <td className='text-center'>{getMoneyString(metaData.avgMoney)}</td>
                            <td className='text-center'>{metaData.perc1st}%</td>
                            <td className='text-center'>{metaData.perc2nd}%</td>
                            <td className='text-center'>{metaData.percLast}%</td>
                            <td className='text-center'>{metaData.avgPlace}</td>
                        </tr>);
                    })}
                </tbody>
            </table>
        </div>
    );
        }

const mapStateToProps = (state) => {
    const {
        currentOdds,
        selectedUserId,
        selectedGameId,
        team1Selected,
        games,
        teams,
        picks,
        teamRoundOdds,
    } = state.toJS();
    const game = games[selectedGameId];
    const currentOddsForUser = currentOdds.find(x => x.userId === selectedUserId);
    return {
        currentOddsForUser,
        selectedUserId,
        selectedGameId,
        team1Selected,
        game,
        teams,
        userPicks: picks[selectedUserId].picks,
        teamRoundOdds,
    }
}
const disconnected = connect(mapStateToProps)(MetaDataTable);

export default disconnected;
