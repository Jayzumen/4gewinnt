type Props = {
  restartGame: () => void;
};

const RestartButton = ({ restartGame }: Props) => {
  return (
    <button
      className="hover:underline hover:text-blue-500 transition duration-200"
      onClick={restartGame}
    >
      Restart
    </button>
  );
};

export default RestartButton;
