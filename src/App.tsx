import { useState } from "react";
import Board from "./components/Board";
import RestartButton from "./components/RestartButton";

function App() {
  // Create empty board 7x6
  const emptyBoard = [
    Array(6).fill(null),
    Array(6).fill(null),
    Array(6).fill(null),
    Array(6).fill(null),
    Array(6).fill(null),
    Array(6).fill(null),
    Array(6).fill(null),
  ];
  const [board, setBoard] = useState(emptyBoard);
  const [currPlayer, setCurrPlayer] = useState("Red");
  const [gameOver, setGameOver] = useState(false);
  const [draw, setDraw] = useState(false);
  const [winningSlots, setWinningSlots] = useState<number[][]>([]);

  // Restart game function
  const restartGame = () => {
    setBoard(emptyBoard);
    setGameOver(false);
    setDraw(false);
    setCurrPlayer("Red");
    setWinningSlots([]);
  };

  const checkForWin = (
    board: string[][],
    colIndex: number,
    rowIndex: number,
    currPlayer: string
  ) => {
    const colCount = board.length;
    const rowCount = board[0].length;

    // Check for a win horizontally
    for (let i = 0; i <= rowCount - 4; i++) {
      if (
        board[colIndex][i] === currPlayer &&
        board[colIndex][i + 1] === currPlayer &&
        board[colIndex][i + 2] === currPlayer &&
        board[colIndex][i + 3] === currPlayer
      ) {
        setWinningSlots([
          [colIndex, i],
          [colIndex, i + 1],
          [colIndex, i + 2],
          [colIndex, i + 3],
        ]);
        return true;
      }
    }

    // Check for a win vertically
    for (let i = 0; i <= colCount - 4; i++) {
      if (
        board[i][rowIndex] === currPlayer &&
        board[i + 1][rowIndex] === currPlayer &&
        board[i + 2][rowIndex] === currPlayer &&
        board[i + 3][rowIndex] === currPlayer
      ) {
        setWinningSlots([
          [i, rowIndex],
          [i + 1, rowIndex],
          [i + 2, rowIndex],
          [i + 3, rowIndex],
        ]);
        return true;
      }
    }

    // Check for a win diagonally up and to the right
    for (let i = 0; i <= colCount - 4; i++) {
      for (let j = 0; j <= rowCount - 4; j++) {
        if (
          board[i][j] === currPlayer &&
          board[i + 1][j + 1] === currPlayer &&
          board[i + 2][j + 2] === currPlayer &&
          board[i + 3][j + 3] === currPlayer
        ) {
          setWinningSlots([
            [i, j],
            [i + 1, j + 1],
            [i + 2, j + 2],
            [i + 3, j + 3],
          ]);
          return true;
        }
      }
    }

    // Check for a win diagonally up and to the left
    for (let i = 0; i <= colCount - 4; i++) {
      for (let j = rowCount - 1; j >= 3; j--) {
        if (
          board[i][j] === currPlayer &&
          board[i + 1][j - 1] === currPlayer &&
          board[i + 2][j - 2] === currPlayer &&
          board[i + 3][j - 3] === currPlayer
        ) {
          setWinningSlots([
            [i, j],
            [i + 1, j - 1],
            [i + 2, j - 2],
            [i + 3, j - 3],
          ]);
          return true;
        }
      }
    }

    // Check for tie
    if (board.every((col) => col.every((cell) => cell !== null)) && !gameOver) {
      setDraw(true);
    }

    return false;
  };

  // handle game logic
  const handleClick = (colIndex: number) => {
    // Check if game is over
    if (gameOver) {
      return;
    }

    // Check if column is already full
    if (board[colIndex].every((cell) => cell !== null)) {
      return;
    }

    // Find last empty cell in clicked column
    let rowIndex = board[colIndex].length - 1;
    while (rowIndex >= 0 && board[colIndex][rowIndex] !== null) {
      rowIndex--;
    }

    // Create copy of board
    const newBoard = [...board];

    // Update copied board with current player
    newBoard[colIndex][rowIndex] = currPlayer;

    // Check for win
    if (checkForWin(newBoard, colIndex, rowIndex, currPlayer)) {
      setGameOver(true);
      return;
    }

    // Switch to next player
    const nextPlayer = currPlayer === "Red" ? "Blue" : "Red";

    // Update the game state with new board and player
    setBoard(newBoard);
    setCurrPlayer(nextPlayer);
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white flex gap-8 p-4 justify-center">
      <div className="flex flex-col gap-4 text-center min-w-[300px]">
        <h1 className="text-3xl font-semibold underline">4 Gewinnt</h1>
        {/* Player */}
        <p className="text-xl">
          Current Player:{" "}
          <span className="font-semibold">
            {currPlayer === "Red" ? "Red" : "Blue"}
          </span>
        </p>

        {/* Game State */}
        <div className="text-3xl font-bold">
          <p>{draw && "No Winner "}</p>
          <p>
            {gameOver &&
              `Winner: Player ${currPlayer === "Red" ? "Red " : "Blue "}`}
          </p>
          <RestartButton restartGame={restartGame} />
        </div>
      </div>

      {/* Board */}
      <Board
        board={board}
        handleClick={handleClick}
        winningSlots={winningSlots}
      />
    </div>
  );
}

export default App;
