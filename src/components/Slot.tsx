type ISlotProps = {
  value: string;
  isWinningSlot: boolean;
};

const Slot = ({ value, isWinningSlot }: ISlotProps) => {
  let slotColor = "bg-slate-600";

  if (value === "Red") {
    slotColor = "bg-red-500";
  } else if (value === "Blue") {
    slotColor = "bg-blue-500";
  }

  return (
    <button
      className={`
            rounded-full border-2 border-black h-[100px] w-[100px]
            ${slotColor} ${isWinningSlot ? "border-yellow-500" : ""}
            `}
    ></button>
  );
};

export default Slot;
