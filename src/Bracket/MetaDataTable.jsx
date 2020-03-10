import React from 'react';
import { connect } from 'react-redux'
import '../App.css';

const MetaDataTable = ({
    currentOddsForUser,
    selectedUserId,
    game,
    teams,
}) => {
    console.log(game);
    // TODO: remove selectedUserId check here, as every user should be populated.
    if (!game || !game.meta) {
        return <div className="metadata-table-section" />
    }

    console.log('meta', game.meta.users[selectedUserId])

    return (
        <div className="metadata-table-section">
            <table className="metadata-table">
                <tr className="metadata-header-row">
                    <th>school</th>
                    <th>odds</th>
                    <th>avg money</th>
                    <th>1st</th>
                    <th>2nd</th>
                    <th>last</th>
                    <th>avg place</th>
                </tr>
                <tr>
                    <td></td>
                    <td>current</td>
                    <td>${currentOddsForUser.avgMoney}</td>
                    <td>{currentOddsForUser.perc1st}%</td>
                    <td>{currentOddsForUser.perc2nd}%</td>
                    <td>{currentOddsForUser.percLast}%</td>
                    <td>{currentOddsForUser.avgPlace}</td>
                </tr>
                {game.meta.users[selectedUserId] && game.meta.users[selectedUserId].map((metaData, index) => {
                    return (<tr>
                        <td>{teams[metaData.teamId].name}</td>
                        <td>{game.meta.teamOdds[metaData.teamId]}%</td>
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
    const jsState = state.toJS();
    const {
        currentOdds,
        selectedUserId,
        games,
        selectedGameId,
        teams,
    } = jsState;
    const game = games[selectedGameId];
    const currentOddsForUser = currentOdds.find(x => x.playerId === selectedUserId);
    return {
        currentOddsForUser,
        selectedUserId,
        game,
        teams,
    }
}
const disconnected = connect(mapStateToProps)(MetaDataTable);

export default disconnected;
