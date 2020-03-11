import React from 'react';
import { connect } from 'react-redux'
import { getMetaTypeFromIsTeam1Selected } from './utils/Helpers'
import Tester from './utils/ObjectConstants'
import '../App.css';

const MetaDataTable = ({
    currentOddsForUser,
    selectedUserId,
    selectedGameId,
    team1Selected,
    game,
    teams,
}) => {
    console.log(game);
    // TODO: remove selectedUserId check here, as every user should be populated.
    if (!game) {
        return <div className="metadata-table-section" />
    }

    const gamesMetaData = Tester;
    let metaType = getMetaTypeFromIsTeam1Selected(team1Selected);

    const gameMetaData = gamesMetaData[selectedUserId][Number(selectedGameId)][metaType];
    console.log(metaType)
    console.log('meta', gameMetaData)

    return (
        <div className="metadata-table-section">
            <table className="metadata-table">
                <tr className="metadata-header-row">
                    <th>school</th>
                    {/*<th>odds</th>*/}
                    <th>avg money</th>
                    <th>1st</th>
                    <th>2nd</th>
                    <th>last</th>
                    <th>avg place</th>
                </tr>
                <tr>
                    {/*<td></td>*/}
                    <td>(current outlook)</td>
                    <td>${currentOddsForUser.avgMoney}</td>
                    <td>{currentOddsForUser.perc1st}%</td>
                    <td>{currentOddsForUser.perc2nd}%</td>
                    <td>{currentOddsForUser.percLast}%</td>
                    <td>{currentOddsForUser.avgPlace}</td>
                </tr>
                {gameMetaData && gameMetaData.map((metaData, index) => {
                    return (<tr>
                        <td>{teams[metaData.teamId].name}</td>
                        {/*<td>{game.meta ? game.meta.teamOdds[metaData.teamId] : ''}%</td>*/}
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
    }
}
const disconnected = connect(mapStateToProps)(MetaDataTable);

export default disconnected;
