
export const createInitialGameState = (gridSize: number) => {
    const gameState = [...Array(gridSize)].map((e) => Array(gridSize));
    return gameState.map(row => row.fill("", 0, gridSize));;
}
