import React from 'react';
import { connect } from 'react-redux'
import '../App.css';

const CurrentStandings = ({
    currentOdds,
    users,
}) => 
(
    <div className="overall-standings">
        <table className="standings-table">
            <tr>
                <th>name</th>
                <th>avg money</th>
                <th>1st</th>
                <th>2nd</th>
                <th>last</th>
                <th>avg place</th>
                <th>pts</th>
            </tr>
            {currentOdds && currentOdds.map(odds => {
                return (<tr>
                    <td>{users[odds.playerId].name}</td>
                    <td>${odds.avgMoney}</td>
                    <td>{odds.perc1st}%</td>
                    <td>{odds.perc2nd}%</td>
                    <td>{odds.percLast}%</td>
                    <td>{odds.avgPlace}</td>
                    <td>{odds.currentScore}</td>
                </tr>);
            })}
        </table>
    </div>
);

const mapStateToProps = (state) => {
    const jsState = state.toJS();
    const {
        currentOdds,
        users,
    } = jsState;
    return {
        currentOdds,
        users,
    }
}
const disconnected = connect(mapStateToProps)(CurrentStandings);

export default React.memo(disconnected);
