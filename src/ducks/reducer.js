import { fromJS } from 'immutable';
import picks from '../resources/picks';
import teams from '../resources/teams';
import currentOdds from '../resources/currentOdds';
import users from '../resources/users';
import games from '../resources/games';
import teamRoundOdds from '../resources/teamRoundOdds';

const initialState = fromJS({
    teams,
    games: games,
    selectedUserId: '0',
    users,
    picks,
    currentOdds,
    selectedGameId: undefined,
    teamRoundOdds,
});

export const reducer = function (state = initialState, { type, payload }) {
    if (type && type.indexOf('SPREAD') !== -1) {
        return state.merge(payload);
    }
    return state;
};

export const setSelectedGameId = selectedGameId => (
    { 
        type: "SELECTED_GAME_SPREAD",
        payload: { 
            selectedGameId,
            team1Selected: undefined
        } 
    }
);

export const setSelectedTeamLine = (selectedGameId, team1Selected) => (
    { 
        type: "SELECTED_TEAMLINE_SPREAD",
         payload: { 
             selectedGameId, 
             team1Selected,
        } 
    }
);

export const setSelectedUserId = (selectedUserId) => (
    { 
        type: 'SELECTED_USER_ID_SPREAD',
        payload: { 
            selectedUserId 
        }
    }
);