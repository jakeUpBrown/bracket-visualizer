import React from 'react';
import { connect } from 'react-redux'
import { getMetaTypeFromIsTeam1Selected, gameHasAllSlotsFilled, getNextRoundMetaDataIndices } from './utils/Helpers'
import Tester from './utils/ObjectConstants'
import '../App.css';

const MetaDataTable = ({
    currentOddsForUser,
    selectedUserId,
    selectedGameId,
    team1Selected,
    game,
    teams,
    userPicks,
}) => {
    console.log(game);
    // TODO: remove selectedUserId check here, as every user should be populated.
    if (!game) {
        return <div className="metadata-table-section" />
    }

    const gamesMetaData = Tester;
    let metaType = getMetaTypeFromIsTeam1Selected(team1Selected);

    let gameMetaData = gamesMetaData[selectedUserId][Number(selectedGameId)][metaType];
    if (!gameMetaData && gameHasAllSlotsFilled(game)) {
        // try to get the game_id and metaType of the next round slot
        // this is because this should be equivalent to this current game if it hasn't been played.
        const {
            nextRoundGameId,
            metaType,
        } = getNextRoundMetaDataIndices(game)
        gameMetaData = gamesMetaData[selectedUserId][nextRoundGameId][metaType];
    }

    const gameHasBeenPlayed = game.team1Won !== undefined;
    let firstRowValues;
    if (gameHasBeenPlayed) {
        const winningTeamId = game.team1Won ? game.team1Id : game.team2Id;
        const winningTeam = teams[winningTeamId];
        firstRowValues = [
            winningTeam.seed,
            winningTeam.name,
            userPicks[winningTeamId],
        ];
    } else {
        firstRowValues = 
        [
            '',
            '(current outlook)',
            '',
        ]
    }

    return (
        <div className="metadata-table-section">
            <table className="metadata-table">
                <tr className="metadata-header-row">
                    <th>sd</th>
                    <th>school</th>
                    <th>pts</th>
                    {/*<th>odds</th>*/}
                    <th>avg money</th>
                    <th>1st</th>
                    <th>2nd</th>
                    <th>last</th>
                    <th>avg place</th>
                </tr>
                <tr className="current-outlook-row">
                    {firstRowValues.map(val => <td>{val}</td>)}
                    <td>${currentOddsForUser.avgMoney}</td>
                    <td>{currentOddsForUser.perc1st}%</td>
                    <td>{currentOddsForUser.perc2nd}%</td>
                    <td>{currentOddsForUser.percLast}%</td>
                    <td>{currentOddsForUser.avgPlace}</td>
                </tr>
                {gameMetaData && gameMetaData.map((metaData, index) => {
                    const team = teams[metaData.teamId]
                    return (<tr>
                        <td>{team.seed}</td>
                        <td>{team.name}</td>
                        {/*<td>{game.meta ? game.meta.teamOdds[metaData.teamId] : ''}%</td>*/}
                        <td>{userPicks[metaData.teamId]}</td>
                        <td>${metaData.avgMoney}</td>
                        <td>{metaData.perc1st}%</td>
                        <td>{metaData.perc2nd}%</td>
                        <td>{metaData.percLast}%</td>
                        <td>{metaData.avgPlace}</td>
                    </tr>);
                })}
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
    }
}
const disconnected = connect(mapStateToProps)(MetaDataTable);

export default disconnected;
