import React from 'react';
import { connect } from 'react-redux'
import '../App.css';

const PicksPage = ({
    picks,
    teams,
    users,
    userMap,
}) => {
    return (
        <div className="overall-standings">
            <table className="standings-table">
                <tr>
                    <th>seed</th>
                    <th>team</th>
                    <th>wins</th>
                    <th>elim</th>
                    {users && Object.values(users).map((user, index) => {
                        return (
                            <th>{user.name}</th>
                        )
                    })}
                </tr>
                {teams && teams.map((team, index) => {
                    return (<tr>
                        <td>{team.seed}</td>
                        <td>{team.name}</td>
                        <td>{team.wins}</td>
                        <td>{team.isEliminated}</td>
                        {/* this should be mapping the pick value for users for team at this index */}  
                        {users && Object.values(users).map(user => {
                            return (
                                <td>{picks[user.userId].picks[index]}</td>
                            )
                        })}
                    </tr>);
                })}
            </table>
        </div>
    );
}

const mapStateToProps = (state) => {
    const jsState = state.toJS();
    const {
        picks,
        users,
        teams,
    } = jsState;
    return {
        picks,
        users,
        teams,
    }
}
const disconnected = connect(mapStateToProps)(PicksPage);

export default React.memo(disconnected);
