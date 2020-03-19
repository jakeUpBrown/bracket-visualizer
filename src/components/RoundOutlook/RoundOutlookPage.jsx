import React from 'react';
import { connect } from 'react-redux';
import roundOutlook from '../../resources/roundOutlook';
import { 
    getRoundNumFromGameId,
    getOddsString,
    getMoneyString,
} from '../../utilities/Helpers'
import '../../App.css';

const RoundOutlookPage = ({
    teams,
    selectedUserId,
    teamRoundOdds,
    userPicks,
}) => {
    if (!roundOutlook) return <div><h1>No Round Outlook Data</h1></div>
    const userRoundOutlook = roundOutlook[selectedUserId]
    const roundNum = getRoundNumFromGameId(userRoundOutlook[0].gameId)
    return (
        <div className="round-outlook-container">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>winner</th>
                        <th>odds</th>
                        <th>money effect</th>
                        <th>1st</th>
                        <th>2nd</th>
                        <th>last</th>
                        <th>avg place</th>
                        <th></th>
                        <th>loser</th>
                    </tr>
                </thead>
                <tbody>
                    {userRoundOutlook && userRoundOutlook.map((roundOutlookRow, index) => {
                        const winningTeam = teams[roundOutlookRow.winningTeamId];
                        const losingTeam = teams[roundOutlookRow.losingTeamId]

                        return (<tr key={`round-outlook-user${index}`}>
                            <td>{winningTeam.seed}</td>
                            <td>{`${winningTeam.name} (${userPicks.picks[roundOutlookRow.winningTeamId]})`}</td>
                            <td className='text-center'>{getOddsString(teamRoundOdds[roundOutlookRow.winningTeamId].oddsByRound[roundNum])}</td>
                            <td className='text-center'>{getMoneyString(roundOutlookRow.avgMoney, true)}</td>
                            <td className='text-center'>{Number(roundOutlookRow.perc1st).toFixed(1)}%</td>
                            <td className='text-center'>{Number(roundOutlookRow.perc2nd).toFixed(1)}%</td>
                            <td className='text-center'>{Number(roundOutlookRow.percLast).toFixed(1)}%</td>
                            <td className='text-center'>{Number(roundOutlookRow.avgPlace).toFixed(1)}</td>
                            <td className='text-right'>{losingTeam.seed}</td>
                            <td>{`${losingTeam.name} (${userPicks.picks[roundOutlookRow.losingTeamId]})`}</td>
                        </tr>);
                    })}
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
    } = state.toJS();
    return {
        teams,
        selectedUserId,
        teamRoundOdds,
        userPicks: picks[selectedUserId],
    }
}
const disconnected = connect(mapStateToProps)(RoundOutlookPage);

export default React.memo(disconnected);
