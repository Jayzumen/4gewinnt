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
    rowIndex: number,
    colIndex: number,
    currPlayer: string
  ) => {
    const rowCount = board.length;
    const colCount = board[0].length;

    // Check for a win horizontally
    for (let i = 0; i <= colCount - 4; i++) {
      if (
        board[rowIndex][i] === currPlayer &&
        board[rowIndex][i + 1] === currPlayer &&
        board[rowIndex][i + 2] === currPlayer &&
        board[rowIndex][i + 3] === currPlayer
      ) {
        setWinningSlots([
          [rowIndex, i],
          [rowIndex, i + 1],
          [rowIndex, i + 2],
          [rowIndex, i + 3],
        ]);
        return true;
      }
    }

    // Check for a win vertically
    for (let i = 0; i <= rowCount - 4; i++) {
      if (
        board[i][colIndex] === currPlayer &&
        board[i + 1][colIndex] === currPlayer &&
        board[i + 2][colIndex] === currPlayer &&
        board[i + 3][colIndex] === currPlayer
      ) {
        setWinningSlots([
          [i, colIndex],
          [i + 1, colIndex],
          [i + 2, colIndex],
          [i + 3, colIndex],
        ]);
        return true;
      }
    }

    // Check for a win diagonally up and to the right
    for (let i = 0; i <= rowCount - 4; i++) {
      for (let j = 0; j <= colCount - 4; j++) {
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
    for (let i = 0; i <= rowCount - 4; i++) {
      for (let j = colCount - 1; j >= 3; j--) {
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
  const handleClick = (rowIndex: number) => {
    // Check if game is over
    if (gameOver) {
      return;
    }

    // Check if column is already full
    if (board[rowIndex].every((cell) => cell !== null)) {
      return;
    }

    // Find last empty cell in clicked column
    let colIndex = board[rowIndex].length - 1;
    while (colIndex >= 0 && board[rowIndex][colIndex] !== null) {
      colIndex--;
    }

    // Create copy of board
    const newBoard = [...board];

    // Update copied board with current player
    newBoard[rowIndex][colIndex] = currPlayer;

    // Check for win
    if (checkForWin(newBoard, rowIndex, colIndex, currPlayer)) {
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
        <h1 className="text-3xl font-semibold underline">Connect 4</h1>
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
