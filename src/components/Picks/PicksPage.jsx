import React from 'react';
import { connect } from 'react-redux'
import '../../App.css';

const PicksPage = ({
    picks,
    teams,
    users,
    selectedUserId,
}) => {
    return (
        <div className="picks-page">
            <table className="picks-table">
                <thead>
                    <tr className="picks-header-row">
                        <th className="hidden-header"></th>
                        <th className="text-left">school</th>
                        <th>wins</th>
                        {/*<th>elim</th>*/}
                        {users && Object.values(users).map((user, index) => {
                            const className = `pick-user-col ${user.userId === selectedUserId ? 'highlighted-user' : ''}`
                            return (
                                <th key={`user-column-header-${user.userId}`} className={className}>{user.name}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {teams && teams.map((team, index) => {
                        return (<tr key={`team-pick-line-${index}`}>
                            <td className='text-center'>{team.seed}</td>
                            <td>{team.name}</td>
                            <td className='text-center'>{team.wins}</td>
                            {/*<td>{team.isEliminated}</td>*/}
                            {/* this should be mapping the pick value for users for team at this index */}  
                            {users && Object.values(users).map(user => {
                                const className = `pick-user-col ${user.userId === selectedUserId ? 'highlighted-user' : ''}`
                                return (
                                    <td key={`user-${user.userId}-team-${index}`} className={className}>{picks[user.userId].picks[index]}</td>
                                )
                            })}
                        </tr>);
                    })}
                </tbody>
            </table>
        </div>
    );
}

const mapStateToProps = (state) => {
    const {
        picks,
        users,
        teams,
        selectedUserId,
    } = state.toJS();
    return {
        picks,
        users,
        teams,
        selectedUserId,
    }
}
const disconnected = connect(mapStateToProps)(PicksPage);

export default React.memo(disconnected);
