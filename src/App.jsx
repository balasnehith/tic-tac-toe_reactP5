import { useState } from "react";
import "./App.css";
import Abc from "./Components/Abc";
import GameBoard from "./Components/GameBoard";

const InitialGameBoard = [null, null, null, null, null, null, null, null, null];
const PLAYERS = { X: "Player-1", O: "Player-2" };
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

function deriveWinner(gameData, playersData) {
  let winner;
  for (const combinations of winPatterns) {
    const firstEle = gameData[combinations[0]];
    const secondEle = gameData[combinations[1]];
    const thirdEle = gameData[combinations[2]];
    if (firstEle && firstEle === secondEle && firstEle === thirdEle) {
      winner = playersData[firstEle];
    }
  }
  return winner;
}

function playerTurn(data) {
  let currentTurn = "X";
  if (data.length > 0 && data[0].player === "X") {
    currentTurn = "O";
  }
  return currentTurn;
}

function deriveGameBoard(data) {
  let updateBoard = [...InitialGameBoard];

  for (const ele of data) {
    const { indexPosition, player } = ele;
    updateBoard[indexPosition] = player;
  }
  return updateBoard;
}

function App() {
  const [gameData, setGameData] = useState([]);
  const [playerDetails, setPlayerDetails] = useState(PLAYERS);

  const activePlayer = playerTurn(gameData);
  const gameBoard = deriveGameBoard(gameData);
  const winner = deriveWinner(gameBoard, playerDetails);
  const draw = !winner && gameData.length === 9;
  // console.log(winner)

  function handleGameBtnClick(ind) {
    setGameData((p) => {
      const currentPlayer = playerTurn(p);
      const updateData = [{ indexPosition: ind, player: currentPlayer }, ...p];
      return updateData;
    });
  }
  function updatePlayerDetails(symbol, newName) {
    setPlayerDetails((p) => {
      return {
        ...p,
        [symbol]: newName,
      };
    });
  }
  function handleNewGame() {
    setGameData([]);
  }
  return (
    <>
      <h1>Tic-Tac-Toe</h1>
      <div className="mainContainer">
        <div className="playerContainer">
          <Abc
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X" && !winner && !draw}
            updatePlayerDetails={updatePlayerDetails}
          />
          <Abc
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O" && !winner && !draw}
            updatePlayerDetails={updatePlayerDetails}
          />
        </div>
        <div className="gameContainer">
          {winner && <p id="winStatus">{winner} won!...</p>}
          {draw && <p id="winStatus">It's a Draw!...</p>}
          <GameBoard
            board={gameBoard}
            handleGameBtnClick={handleGameBtnClick}
            gameOver={winner}
          />
          <button
            onClick={handleNewGame}
            className={`newGame ${winner || draw ? "active" : ""}`}
          >
            New Game
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
