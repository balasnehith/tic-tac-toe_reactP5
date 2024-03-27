import { useEffect, useState } from "react";

export default function GameBoard({
  playerSymbol,
  playerTurn,
  setTurn,
  player_1_name,
  player_2_name,
  start,
  setplayerWonStatus,
}) {
  const [boardValues, setBoardValues] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const [isDisabled, setIsDisabled] = useState(true);

  const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  useEffect(() => {
    checkGame();
  }, [boardValues]);

  useEffect(() => {
    if (!start) {
      setBoardValues([null, null, null, null, null, null, null, null, null]);
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [start]);

  function checkGame() {
    let isDraw = true;
    let startPlayer = true;
    for (let k = 0; k < boardValues.length; k++) {
      if (boardValues[k] !== null) {
        startPlayer = false;
      }
    }
    if (startPlayer&&start) {
      setTurn(player_1_name);
    } else if(!startPlayer&&start){
      const changeTurn =
        playerTurn === player_1_name ? player_2_name : player_1_name;
      setTurn(changeTurn);
    }
    for (let i = 0; i < winPatterns.length; i++) {
      if (
        boardValues[winPatterns[i][0]] === boardValues[winPatterns[i][1]] &&
        boardValues[winPatterns[i][1]] === boardValues[winPatterns[i][2]] &&
        boardValues[winPatterns[i][1]] !== null
      ) {
        setplayerWonStatus(
          boardValues[winPatterns[i][1]] === "X" ? player_1_name : player_2_name
        );
        setIsDisabled(true);
        setTurn();
        return;
      }
    }
    for (let j = 0; j < boardValues.length; j++) {
      if (boardValues[j] === null) {
        isDraw = false;
      }
    }
    if (isDraw) {
      setTurn();
      setplayerWonStatus("Draw");
      return;
    }
  }

  function handleGameClick(ind) {
    const newBoardValues = [...boardValues];
    if (newBoardValues[ind] === null) {
      newBoardValues[ind] = playerSymbol;

      // const changeTurn =
      //   playerTurn === player_1_name ? player_2_name : player_1_name;
      // setTurn(changeTurn);
      setBoardValues(newBoardValues);
    }
  }

  return (
    <div className={`gameBoard ${!start ? "blur" : ""}`}>
      {boardValues.map((ele, ind) => (
        <button
          disabled={isDisabled}
          onClick={() => handleGameClick(ind)}
          key={ind}
        >
          {ele}
        </button>
      ))}
    </div>
  );
}
