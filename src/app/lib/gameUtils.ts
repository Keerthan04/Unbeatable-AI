import TicTacToe from "./gameLogic";

export function initializeBoard() {
  const board = new TicTacToe();
  return {
    boardClass: board,
    boardState: board.returnBoard(),
    player: board.currentPlayer,
    gameOver: board.isOver(),
    winner: null,
    moveLog: [] as string[],
  };
}

export function makePlayerMove(
  boardClass: TicTacToe,
  move: number,
  currentLog: string[]
) {
  const valid = boardClass.playerMove(move);
  const logMessage = valid
    ? `You chose cell ${move}`
    : `Invalid move on cell ${move}`;
  return {
    boardClass,
    boardState: boardClass.returnBoard(),
    player: boardClass.currentPlayer,
    gameOver: boardClass.isOver(),
    winner: boardClass.checkWin(),
    success: valid,
    playerMove: move,
    moveLog: [...currentLog, logMessage],
  };
}

export function makeAIMove(boardClass: TicTacToe, currentLog: string[]) {
  const aiChosenMove = boardClass.aiMakeMove(); // returns number | null
  const logMessage = aiChosenMove
    ? `AI chose cell ${aiChosenMove}`
    : `AI did not move`;
  return {
    boardClass,
    boardState: boardClass.returnBoard(),
    player: boardClass.currentPlayer,
    gameOver: boardClass.isOver(),
    winner: boardClass.checkWin(),
    aiMove: aiChosenMove,
    moveLog: [...currentLog, logMessage],
  };
}
