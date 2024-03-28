export default function GameBoard({ board, handleGameBtnClick, gameOver }) {
  return (
    <div className={`gameBoard`}>
      {board.map((ele, ind) => (
        <button
          onClick={() => handleGameBtnClick(ind)}
          disabled={ele !== null || gameOver}
          key={ind}
        >
          {ele}
        </button>
      ))}
    </div>
  );
}
