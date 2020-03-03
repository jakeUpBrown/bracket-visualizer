import { TOTAL_ROUNDS, TOTAL_COLUMNS } from "./Constants";

export const getNumGamesByRoundNum = roundNum => Math.pow(2, 5 - roundNum)

export const getNumGamesForColumnByRoundNum = roundNum => Math.max(1, getNumGamesByRoundNum(roundNum) / 2);

export const getRoundNumFromColumnIndex = columnIndex => {
    if (columnIndex < TOTAL_ROUNDS) {
        return columnIndex;
    } else {
        return TOTAL_COLUMNS - 1 - columnIndex;
    }
}


export const getRoundNumFromGameId = gameId => {
    let i = 0;
    for (i = 0; i < 10; i++) {
        if (gameId < getGamesPlayedInPreviousRounds(i + 1)) return i;
    }
    return i; 
}

export const isLeftSide = columnIndex => columnIndex < 5;

export const getGamesPlayedInPreviousRounds = roundNum => {
    return 64 - Math.pow(2, 6 - roundNum);
}

export const getGameId = (roundNum, left, columnOffset) => getStartingGameIdByColumn(roundNum, left) + columnOffset

export const getStartingGameIdByColumn = (roundNum, left) => {
    const gamesPlayedInPreviousRounds = getGamesPlayedInPreviousRounds(roundNum);
    const rightSideIncrement = (left || (roundNum > 4)) ? 0 : getNumGamesForColumnByRoundNum(roundNum);
    return gamesPlayedInPreviousRounds + rightSideIncrement;
}

export const isColumnChampionship = roundIndex => roundIndex === 5;

export const hasGameBeenPlayed = game => game.team1Score && game.team2Score;