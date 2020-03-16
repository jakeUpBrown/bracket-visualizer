import * as Actions from '../ducks/reducer';

export const setSelectedTeamLineFuncer = dispatch => obj => dispatch(
    Actions.setSelectedTeamLine(obj)
);

export const setSelectedUserIdFuncer = dispatch => obj => dispatch(
    Actions.setSelectedUserId(obj)
);

export const setSelectedGameIdFuncer = dispatch => obj => dispatch(
    Actions.setSelectedGameId(obj)
);