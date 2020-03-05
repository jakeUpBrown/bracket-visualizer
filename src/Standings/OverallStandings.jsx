import React from 'react';
import { connect } from 'react-redux'
import '../App.css';
import { getUserNameMap } from '../utilities/selectors';

const OverallStandings = ({
    currentOdds,
    userMap,
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
            </tr>
            {currentOdds && currentOdds.map(odds => {
                return (<tr>
                    <td>{userMap[odds.playerId]}</td>
                    <td>${odds.avgMoney}</td>
                    <td>{odds.perc1st}%</td>
                    <td>{odds.perc2nd}%</td>
                    <td>{odds.percLast}%</td>
                    <td>{odds.avgPlace}</td>
                </tr>);
            })}
        </table>
    </div>
);

const mapStateToProps = (state) => {
    const jsState = state.toJS();
    const {
        currentOdds,
    } = jsState;
    return {
        currentOdds,
        userMap: getUserNameMap(state),
    }
}
const disconnected = connect(mapStateToProps)(OverallStandings);

export default React.memo(disconnected);
