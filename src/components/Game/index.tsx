import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import { FaX, FaRegCircle } from "react-icons/fa6";

type Player = "X" | "O" | null;

export const Game: React.FC = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [gameCount, setGameCount] = useState(0);
  const [animatingCell, setAnimatingCell] = useState<number | null>(null);

  useEffect(() => {
    const savedBoard = localStorage.getItem("board");
    const savedTurn = localStorage.getItem("isXTurn");
    const savedGameCount = localStorage.getItem("gameCount");

    if (savedBoard) {
      setBoard(JSON.parse(savedBoard));
    }
    if (savedTurn) {
      setIsXTurn(JSON.parse(savedTurn));
    }
    if (savedGameCount) {
      setGameCount(JSON.parse(savedGameCount));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board));
    localStorage.setItem("isXTurn", JSON.stringify(isXTurn));
    localStorage.setItem("gameCount", JSON.stringify(gameCount));
  }, [board, isXTurn, gameCount]);

  const handleClick = (index: number): void => {
    if (board[index] || checkWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
    setAnimatingCell(index);

    setTimeout(() => setAnimatingCell(null), 300);
  };

  const checkWinner = (board: Player[]): Player => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const winner = checkWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next Player: ${isXTurn ? "X" : "O"}`;

  const resetGame = (): void => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setGameCount((prevCount) => prevCount + 1);
    localStorage.removeItem("board");
    localStorage.removeItem("isXTurn");
  };

  const renderCell = (cell: Player, index: number) => {
    const cellClass =
      cell === "X" ? style.xCell : cell === "O" ? style.oCell : "";

    return (
      <div
        key={index}
        className={`${style.cell} ${cellClass} ${
          animatingCell === index ? style.animate : ""
        }`}
        onClick={() => handleClick(index)}
      >
        {cell === "X" ? (
          <FaX
            className={`${style.icon} ${
              animatingCell === index ? style.animate : ""
            }`}
          />
        ) : cell === "O" ? (
          <FaRegCircle
            className={`${style.icon} ${
              animatingCell === index ? style.animate : ""
            }`}
          />
        ) : null}
      </div>
    );
  };

  return (
    <div className={style.game}>
      <div className={style.board}>
        {board.map((cell, index) => renderCell(cell, index))}
      </div>
      {winner && (
        <>
          <h2>{status}</h2>
          <button className={style.reset} onClick={resetGame}>
            Restart
          </button>
        </>
      )}
    </div>
  );
};
