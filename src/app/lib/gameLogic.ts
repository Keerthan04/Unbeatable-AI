export default class TicTacToe {
  board: (1 | 0 | null)[];
  currentPlayer: 1 | 0; // 1 = Player (X), 0 = AI (O)

  constructor() {
    this.board = Array(9).fill(null);
    this.currentPlayer = 1; // Player starts first
  }

  possibleMoves(): number[] {
    return this.board
      .map((val, idx) => (val === null ? idx + 1 : null))
      .filter((val) => val !== null) as number[];
  }

  makeMove(move: number): void {
    if (this.board[move - 1] === null) {
      this.board[move - 1] = this.currentPlayer;
      this.currentPlayer = this.currentPlayer === 1 ? 0 : 1;
    }
  }

  unmakeMove(move: number): void {
    this.board[move - 1] = null;
    this.currentPlayer = this.currentPlayer === 1 ? 0 : 1;
  }

  checkWin(): 1 | 0 | -1 | null {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (const [a, b, c] of lines) {
      if (
        this.board[a] !== null &&
        this.board[a] === this.board[b] &&
        this.board[b] === this.board[c]
      ) {
        return this.board[a] as 1 | 0;
      }
    }

    return this.possibleMoves().length === 0 ? -1 : null;
  }

  isOver(): boolean {
    return this.checkWin() !== null;
  }

  returnBoard(): string[] {
    return this.board.map((value) =>
      value === 1 ? "X" : value === 0 ? "O" : " "
    );
  }

  /** Minimax algorithm with Alpha-Beta Pruning */
  minmax(alpha: number, beta: number, maximizing: boolean): number {
    const winner = this.checkWin();
    if (winner === 1) return -1; // Player win is negative for AI
    if (winner === 0) return 1; // AI win is positive
    if (winner === -1) return 0; // Draw

    if (maximizing) {
      let bestScore = -Infinity;
      for (const move of this.possibleMoves()) {
        this.makeMove(move);
        const score = this.minmax(alpha, beta, false);
        this.unmakeMove(move);
        bestScore = Math.max(bestScore, score);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) break;
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (const move of this.possibleMoves()) {
        this.makeMove(move);
        const score = this.minmax(alpha, beta, true);
        this.unmakeMove(move);
        bestScore = Math.min(bestScore, score);
        beta = Math.min(beta, score);
        if (beta <= alpha) break;
      }
      return bestScore;
    }
  }

  aiMove(): number | null {
    let bestScore = -Infinity;
    let bestMove: number | null = null;
    for (const move of this.possibleMoves()) {
      this.makeMove(move);
      const score = this.minmax(-Infinity, Infinity, false);
      this.unmakeMove(move);
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    return bestMove;
  }

  // Process the player's move. Returns false if move is invalid or game over.
  playerMove(move: number): boolean {
    if (!this.possibleMoves().includes(move) || this.isOver()) {
      return false;
    }
    this.makeMove(move);
    return true;
  }

  // Makes the AI move and returns the move number chosen.
  aiMakeMove(): number | null {
    if (!this.isOver()) {
      const move = this.aiMove();
      if (move !== null) {
        this.makeMove(move);
        return move;
      }
    }
    return null;
  }
}
