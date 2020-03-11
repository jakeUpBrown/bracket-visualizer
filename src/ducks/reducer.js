import { fromJS } from 'immutable';
import picks from '../resources/picks.json';
import teams from '../resources/teams.json';
import currentOdds from '../resources/currentOdds.json';
import users from '../resources/users.json';
import games from '../resources/games.json';

/*
const createGame = (gameId, team1Id, team2Id, team1Score, team2Score) => {
    return {
        gameId,
        team1Id,
        team2Id,
        //team1Score,
        //team2Score,
        team1Won: !team1Score ? undefined : team1Score > team2Score,
        allSlotsFilled: team1Id !== undefined && team2Id !== undefined,
    };
}


const gameList = [
    createGame(0, 0, 1, 54, 74),
    createGame(1, 2, 3, 59, 69),
    createGame(2, 4, 5, 78, 73),
    createGame(3, 6, 7, 68, 89),
    createGame(4, 8, 9, 62, 64),
    createGame(5, 10, 11, 73, 47),
    createGame(6, 12, 13, 87, 83),
    createGame(7, 14, 15, 68, 53),
    createGame(8, 16, 17, 102, 83),
    createGame(9, 18, 19, 54, 67),
    createGame(10, 20, 21, 81, 73),
    createGame(11, 22, 23, 68, 64),
    createGame(12, 24, 25, 67, 65),
    createGame(13, 26, 27, 61, 47),
    createGame(14, 28, 29, 73, 69),
    createGame(15, 30, 31, 84, 66),
    createGame(16, 32, 33, 87, 61),
    createGame(17, 34, 35, 83, 86),
    createGame(18, 36, 37, 85, 68),
    createGame(19, 38, 39, 75, 81),
    createGame(20, 40, 41, 77, 62),
    createGame(21, 42, 43, 70, 60),
    createGame(22, 44, 45, 62, 79),
    createGame(23, 46, 47, 74, 48),
    createGame(24, 48, 49, 76, 60),
    createGame(25, 50, 51, 94, 83),
    createGame(26, 52, 53, 79, 68),
    createGame(27, 54, 55, 62, 58),
    createGame(28, 56, 57, 52, 57),
    createGame(29, 58, 59, 82, 78),
    createGame(30, 60, 61, 83, 78),
    createGame(31, 62, 63, 89, 67),

    createGame(32, 1, 3, 43, 50),
    createGame(33, 4, 7, 95, 75),
    createGame(34, 9, 10, 63, 62),
    createGame(35, 12, 14, 75, 73),
    createGame(36, 16, 19, 70, 75),
    createGame(37, 20, 22, 84, 90),
    createGame(38, 24, 26, 63, 64),
    createGame(39, 28, 30, 86, 65),
    createGame(40, 32, 35, 81, 58),
    createGame(41, 36, 39, 94, 71),
    createGame(42, 40, 42, 66, 69),
    createGame(43, 45, 46, 73, 76),
    createGame(44, 48, 50, 83, 79),
    createGame(45, 52, 54, 84, 53),
    createGame(46, 57, 58, 55, 53),
    createGame(47, 60, 62, 62, 87),

    createGame(48, 3, 4, 61, 58),
    createGame(49, 9, 12, 69, 68),
    createGame(50, 19, 22, 75, 60),
    createGame(51, 26, 28, 99, 72),
    createGame(52, 32, 36, 90, 78),
    createGame(53, 42, 46, 78, 65),
    createGame(54, 48, 52, 80, 76),
    createGame(55, 57, 62, 65, 69),


    createGame(56, 3, 9, undefined, undefined),
    createGame(57, 19, 26, 54, 58),
    createGame(58, 32, 42, 71, 59),
    createGame(59, 48, 62, undefined, undefined),

    createGame(60, undefined, 26, undefined, undefined),
    // createGame(60, 9, 26, 57, 69),
    createGame(61, 32, undefined, undefined, undefined),
    // createGame(61, 32, 48, 95, 79),

    createGame(62, undefined, undefined, undefined, undefined),
    // createGame(62, 26, 32, 62, 79),

    createGame(63, undefined),
    // createGame(63, 32),
]
*/

const initialState = fromJS({
    teams,
    games: games,
    selectedUserId: '0',
    users,
    picks,
    currentOdds,
    selectedGameId: undefined,
});

const getInitState = () => {
    let now = new Date();
    const js = initialState.toJS();
    let after = new Date();
    console.log('time it took: ', (after.getMilliseconds() - now.getMilliseconds()));
    js.games[0].meta = {
        users: {
            '0': [
                {
                    teamId: 0,
                    avgMoney: 15.43,
                    perc1st: 12.12,
                    perc2nd: 4.32,
                    percLast: 0.00,    
                },
                {
                    teamId: 1,
                    avgMoney: 18.43,
                    perc1st: 11.12,
                    perc2nd: 3.32,
                    percLast: 1.00,    
                }
            ],
            '1': [
                {
                    teamId: 0,
                    avgMoney: 18.43,
                    perc1st: 12.12,
                    perc2nd: 4.32,
                    percLast: 0.00,    
                },
                {
                    teamId: 1,
                    avgMoney: 12.43,
                    perc1st: 11.12,
                    perc2nd: 3.32,
                    percLast: 1.00,    
                }
            ]
        },
        teamOdds: {
            0: 67.4,
            1: 32.6,
        }
    }
    return fromJS(js);
}

export const countReducer = function (state = getInitState(), { type, payload }) {
    if (type && type.indexOf('SPREAD') !== -1) {
        return state.merge(payload);
    }
    return state;
};

export const setSelectedGameId = selectedGameId => ({ type: "SELECTED_GAME_SPREAD", payload: { selectedGameId, team1Selected: undefined } });

export const setSelectedTeamLine = (selectedGameId, team1Selected) => ({ type: "SELECTED_TEAMLINE_SPREAD", payload: { selectedGameId, team1Selected } });

export const setSelectedUserId = (selectedUserId) => {
    return ({ type: 'SELECTED_USER_ID_SPREAD', payload: { selectedUserId }})
}