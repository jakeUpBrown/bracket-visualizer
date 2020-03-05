export const teamIndexSelector = (state, gameIndex, isTeam1) => {
    const jsState = state.toJS();
    const game = jsState.games[gameIndex];
    return isTeam1 ? game.team1Id : game.team2Id;
}

export const getUserNameMap = (state) => {
    const jsState = state.toJS();
    const {
        users
    } = jsState;
    const userMap = {}
    users.forEach(element => {
        userMap[element.userId] = element.name
    });
    return userMap;
}  