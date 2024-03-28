export default function GameBoard({ board, handleGameBtnClick, gameOver }) {

  return (
    <div className={`gameBoard`}>
      {board.map((ele, ind) => (
        <button
          className={`gameBtn ${
            gameOver[0] &&
            (ind === gameOver[1][0] ||
              ind === gameOver[1][1] ||
              ind === gameOver[1][2])
              ? "active"
              : ""
          }`}
          onClick={() => handleGameBtnClick(ind)}
          disabled={ele !== null || gameOver[0]}
          key={ind}
        >
          {ele}
        </button>
      ))}
    </div>
  );
}
