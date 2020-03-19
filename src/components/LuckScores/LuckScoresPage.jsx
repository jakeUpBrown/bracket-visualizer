import React from 'react';
import { connect } from 'react-redux';
import luckScores from '../../resources/luckScores';
import { 
    getRoundNumFromGameId,
    getOddsString,
    getMoneyString,
} from '../../utilities/Helpers'
import '../../App.css';

const LuckScoresPage = ({
    teams,
    renderAllUsers,
    selectedUserId,
    teamRoundOdds,
    userPicks,
    users,
}) => {
    const luckRows = luckScores && luckScores
        .filter(luckRow => renderAllUsers || luckRow.userId === selectedUserId)
        .map((luckRow, index) => {

        const winningTeam = teams[luckRow.winningTeamId];
        const losingTeam = teams[luckRow.losingTeamId]
        const roundNum = getRoundNumFromGameId(luckRow.gameId)

        return (<tr key={`luck-score-user-${index}-gameid-${luckRow.gameId}`}>
            {renderAllUsers ? <td>{users[luckRow.userId].name}</td> : null}
            <td>{winningTeam.seed}</td>
            <td>{`${winningTeam.name} (${userPicks.picks[luckRow.winningTeamId]})`}</td>
            <td className='text-right'>{losingTeam.seed}</td>
            <td>{`${losingTeam.name} (${userPicks.picks[luckRow.losingTeamId]})`}</td>
            <td className='text-center'>
                {getOddsString(teamRoundOdds[luckRow.winningTeamId].oddsByRound[roundNum])}
            </td>
            <td className='text-center'>{luckRow.luckScore}</td>
            <td className='text-center'>{getMoneyString(luckRow.avgMoney, true)}</td>
            <td className='text-center'>{Number(luckRow.perc1st).toFixed(1)}%</td>
            <td className='text-center'>{Number(luckRow.perc2nd).toFixed(1)}%</td>
            <td className='text-center'>{Number(luckRow.percLast).toFixed(1)}%</td>
            <td className='text-center'>{Number(luckRow.avgPlace).toFixed(1)}</td>
        </tr>);
    });

    if (!luckRows || luckRows.length === 0)
        return <div><h3>No Luck Data Found</h3></div>

    return (
        <div className="luck-scores-container">
            <table>
                <thead>
                    <tr>
                        {renderAllUsers ? <th>user</th> : null}
                        <th></th>
                        <th>winner</th>
                        <th></th>
                        <th>loser</th>
                        <th>odds</th>
                        <th>luckScore</th>
                        <th>money effect</th>
                        <th>1st</th>
                        <th>2nd</th>
                        <th>last</th>
                        <th>avg place</th>
                    </tr>
                </thead>
                <tbody>
                    {luckRows}
                </tbody>
            </table>
        </div>
    );
}

const mapStateToProps = (state) => {
    const {
        teams,
        selectedUserId,
        teamRoundOdds,
        picks,
        users,
    } = state.toJS();
    return {
        teams,
        selectedUserId,
        teamRoundOdds,
        userPicks: picks[selectedUserId],
        users,
        renderAllUsers: false,
    }
}
const disconnected = connect(mapStateToProps)(LuckScoresPage);

export default React.memo(disconnected);
