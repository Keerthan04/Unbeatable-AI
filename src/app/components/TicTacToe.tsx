"use client";
import { useState } from "react";
import TicTacToe from "@/app/lib/gameLogic";
import {
  initializeBoard,
  makePlayerMove,
  makeAIMove,
} from "@/app/lib/gameUtils";

export default function TicTacToeGame() {
  const [game, setGame] = useState<{
    boardClass: TicTacToe;
    boardState: string[];
    player: 0 | 1;
    gameOver: boolean;
    winner: 0 | 1 | -1 | null;
    success?: boolean;
    moveLog: string[];
  }>(() => initializeBoard());

  const [message, setMessage] = useState("Unbeatable AI - Try and Defeat It!");
  const [disableMoves, setDisableMoves] = useState(false);

  function handleMove(index: number) {
    if (disableMoves || game.gameOver || game.boardState[index] !== " ") return;

    setDisableMoves(true);
    const updatedGame = makePlayerMove(
      game.boardClass,
      index + 1,
      game.moveLog
    );
    setGame(updatedGame);

    if (updatedGame.gameOver) {
      setMessage(
        updatedGame.winner === 1
          ? "You Won! 🎉"
          : updatedGame.winner === 0
          ? "AI Wins! 😈"
          : "It's a Draw! 🏳️"
      );
      setDisableMoves(false);
      return;
    }

    setTimeout(() => {
      const aiGame = makeAIMove(updatedGame.boardClass, updatedGame.moveLog);
      setGame(aiGame);
      if (aiGame.gameOver) {
        setMessage(
          aiGame.winner === 1
            ? "You Won! 🎉"
            : aiGame.winner === 0
            ? "AI Wins! 😈"
            : "It's a Draw! 🏳️"
        );
      }
      setDisableMoves(false);
    }, 500);
  }

  function resetGame() {
    setGame(initializeBoard());
    setMessage("Unbeatable AI - Try and Defeat It!");
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <header className="w-full max-w-xl text-center mb-6">
        <h1 className="text-4xl font-bold">Tic Tac Toe with Unbeatable AI</h1>
        <p className="mt-2 text-lg">
          A simple Tic Tac Toe game built with Next.js and the Minimax algorithm
          for an unbeatable AI.
        </p>
        <a
          href="https://github.com/Keerthan04/Unbeatable-AI"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center mt-3 text-blue-400 hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.613-4.042-1.613-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.082-.73.082-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.76-1.604-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.553 3.296-1.23 3.296-1.23.655 1.653.242 2.874.12 3.176.77.84 1.232 1.91 1.232 3.22 0 4.61-2.805 5.624-5.476 5.92.43.37.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .32.216.694.825.576C20.565 21.796 24 17.303 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          View on GitHub
        </a>
      </header>

      <div className="mb-4">
        <h2 className="text-2xl font-semibold">{message}</h2>
      </div>

      <div className="grid grid-cols-3 gap-2 w-60 mb-4">
        {game.boardState.map((cell, index) => (
          <button
            key={index}
            className="w-20 h-20 text-4xl border-2 border-gray-500 hover:bg-gray-600 transition"
            onClick={() => handleMove(index)}
            disabled={disableMoves || cell !== " "}
          >
            {cell}
          </button>
        ))}
      </div>

      <button
        className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 transition"
        onClick={resetGame}
      >
        Restart Game
      </button>

      {game.moveLog.length > 0 && (
        <div className="mt-6 w-full max-w-md">
          <h3 className="text-xl font-bold mb-2">Move Log</h3>
          <ul className="list-disc list-inside text-gray-300">
            {game.moveLog.map((log, idx) => (
              <li key={idx}>{log}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
