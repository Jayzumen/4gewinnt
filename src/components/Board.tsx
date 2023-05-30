import Slot from "./Slot";

type Props = {
  board: string[][];
  handleClick: (rowIndex: number) => void;
  winningSlots: number[][];
};

const Board = ({ board, handleClick, winningSlots }: Props) => {
  return (
    <div className="border-x-[50px] border-blue-700 w-[860px] h-[670px] flex justify-center m-4 bg-slate-500">
      <div className="flex flex-row items-center justify-center gap-2">
        {board.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-col gap-2 hover:bg-slate-700"
            onClick={() => handleClick(rowIndex)}
          >
            {row.map((cell, colIndex) => (
              <Slot
                key={colIndex}
                value={cell}
                isWinningSlot={winningSlots.some(
                  (slot) => slot[0] === rowIndex && slot[1] === colIndex
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
