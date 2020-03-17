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
    return 64 - Math.pow(2, TOTAL_ROUNDS - roundNum);
}

export const getGameId = (roundNum, left, columnOffset) => getStartingGameIdByColumn(roundNum, left) + columnOffset

export const getStartingGameIdByColumn = (roundNum, left) => {
    const gamesPlayedInPreviousRounds = getGamesPlayedInPreviousRounds(roundNum);
    const rightSideIncrement = (left || (roundNum > 4)) ? 0 : getNumGamesForColumnByRoundNum(roundNum);
    return gamesPlayedInPreviousRounds + rightSideIncrement;
}

export const isColumnChampionship = roundIndex => roundIndex === 5;

export const getMetaTypeFromIsTeam1Selected = isTeam1Selected => {
    if (isTeam1Selected === undefined) return 'GAME';
    return isTeam1Selected ? 'TEAM1' : 'TEAM2';
}

export const gameHasAllSlotsFilled = (game) =>  game.team1Id !== undefined && game.team2Id !== undefined

export const getNextRoundMetaDataIndices = (game) => {
    const roundNum = getRoundNumFromGameId(game.gameId) + 1;
    const bucketSize = Math.floor(Math.pow(2, roundNum))
    const metaType = (game.team2Id % (bucketSize * 2) < bucketSize) ? 'TEAM1' : 'TEAM2'
    const startingGameId = getGamesPlayedInPreviousRounds(roundNum, )
    const gameOffset = Math.floor(game.team1Id / (bucketSize * 2))
    return {
        metaType,
        nextRoundGameId: startingGameId + gameOffset,
    }
}

export const getMoneyString = (moneyValue, isDeltaValue = false) => {
    if(moneyValue < 0) {
        return '-$' + Number(moneyValue * -1).toFixed(2)
    }
    return (isDeltaValue ? '+' : '') + '$' + Number(moneyValue).toFixed(2);
}

export const getOddsString = (oddsValue) => {
    const percValue = Number(oddsValue * 100).toFixed(1)
    if (percValue < .1)
        return '<0.1%'
    return percValue + '%'
}