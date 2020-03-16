import React from 'react';
import { connect } from 'react-redux'
import '../../App.css';

const CurrentStandings = ({
    currentOdds,
    users,
    selectedUserId,
}) => 
(
    <div className="overall-standings">
        <table className="standings-table">
            <tr className="standings-header-row">
                <th>name</th>
                <th>avg money</th>
                <th>1st</th>
                <th>2nd</th>
                <th>last</th>
                <th>avg place</th>
                <th>pts</th>
            </tr>
            {currentOdds && currentOdds.map(odds => {
                const selectedUserClassName = odds.userId === selectedUserId ? 'highlighted-user' : '';
                const className='text-center ' + selectedUserClassName;
                return (<tr>
                    <td className={selectedUserClassName}>{users[odds.userId].name}</td>
                    <td className={className}>${Number(odds.avgMoney).toFixed(2)}</td>
                    <td className={className}>{Number(odds.perc1st).toFixed(1)}%</td>
                    <td className={className}>{Number(odds.perc2nd).toFixed(1)}%</td>
                    <td className={className}>{Number(odds.percLast).toFixed(1)}%</td>
                    <td className={className}>{Number(odds.avgPlace).toFixed(1)}</td>
                    <td className={className}>{odds.currentScore}</td>
                </tr>);
            })}
        </table>
    </div>
);

const mapStateToProps = (state) => {
    const {
        currentOdds,
        users,
        selectedUserId,
    } = state.toJS();
    return {
        currentOdds,
        users,
        selectedUserId,
    }
}
const disconnected = connect(mapStateToProps)(CurrentStandings);

export default React.memo(disconnected);
