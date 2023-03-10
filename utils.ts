export type GameStateType = ("" | "X" | "O")[][];

export type TreeNode = {
    state: GameStateType;
    score: number | null;
    children: TreeNode[];
    isRoot?: boolean;
  }

// Creates an empty board
export const createInitialGameState = (gridSize: number) => {
    const gameState = [...Array(gridSize)].map((e) => Array(gridSize));
    return gameState.map(row => row.fill("", 0, gridSize));
}

// Return the opposite player of the one given
export const switchPlayers = (player: "X" | "O") => {
    return player === "X" ? "O" : "X";
}

export function hasPlayerWon(gameState: GameStateType, player: "X" | "O") {
    // Check for a row win
    if (gameState.some(row => row.every(cell => cell === player))) {
        return true;
    }

    // check for a column win
    for (let col = 0; col < gameState.length; col++) {
        let isColumnFull = true
        for (let row = 0; row < gameState.length; row++) {
          if (gameState[row][col] !== player) {
            isColumnFull = false;
            break;
          }
        }
        if(isColumnFull) return true
    }

    // Check for a win by player on a diagonal
    let diagonal1Filled= true;
    let diagonal2Filled = true;
    for (let i = 0; i < gameState.length; i++) {
        if (gameState[i][i] !== player) {
            diagonal1Filled = false;
        }
        if (gameState[i][gameState.length - 1 - i] !== player) {
            diagonal2Filled = false;
        }
    }
    if (diagonal1Filled || diagonal2Filled) {
        return true;
    }
    return false
}

// Checks whether all cells are filled
export function isTie(gameState: GameStateType){
    return gameState.every(row => row.every(cell => cell === "X" || cell === "O"))
}

export async function fetchMCTSMove(GameState: GameStateType, Iterations: number, Player: "X" | "O") {
    if(!process.env.MCTS_FETCH_URL) throw new Error("missing url to fetch mcts move");

    const response = await fetch(
        process.env.MCTS_FETCH_URL,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            GameState,
            Iterations,
            Player,
          }),
        }
      );
      if (!response.ok) {
        alert("Something went wrong, please start a new game");
      }
      const newState = await response.json() satisfies GameStateType;

      return newState;
}

