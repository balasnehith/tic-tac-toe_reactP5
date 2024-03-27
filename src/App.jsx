import { useEffect, useRef, useState } from "react";
import "./App.css";
import Abc from "./Components/Abc";
import GameBoard from "./Components/GameBoard";

function App() {
  const [start, setStart] = useState(false);
  const [player_1_name, setplayer_1_name] = useState("Player-1");
  const [player_2_name, setplayer_2_name] = useState("Player-2");
  const [playerTurn, setPlayerTurn] = useState();
  const [playerWonStatus, setPlayerWonStatus] = useState(null);
  const player_1_symbol = useRef("X");
  const player_2_symbol = useRef("O");
  const [resultMessage, setResultMessage] = useState('');

  useEffect(() => {
    if(start) setPlayerTurn(player_1_name)
  }, [start]);

  useEffect(()=>{
    if(playerWonStatus===player_1_name) setResultMessage(`${player_1_name} has Won!...`);
    else if(playerWonStatus===player_2_name) setResultMessage(`${player_2_name} has Won!...`);
    else if(playerWonStatus==='Draw') setResultMessage(`It's a Draw!...`);
  },[playerWonStatus])
  return (
    <>
      <h1>Tic-Tac-Toe</h1>
      <div className="mainContainer">
        <div className="playerContainer">
          <Abc
            name={player_1_name}
            setName={setplayer_1_name}
            symbol={player_1_symbol.current}
            turn={playerTurn}
            start={start}
          />
          <Abc
            name={player_2_name}
            setName={setplayer_2_name}
            symbol={player_2_symbol.current}
            turn={playerTurn}
            start={start}
          />
        </div>
        <div className="gameContainer">
          {!start && (
            <button id="startBtn" onClick={() => {setStart(true)}}>
              Start
            </button>
          )}
          {playerWonStatus&&<p id="winStatus">{resultMessage}</p>}
          <GameBoard
            playerSymbol={
              playerTurn === player_1_name
                ? player_1_symbol.current
                : player_2_symbol.current
            }
            playerTurn={playerTurn}
            setTurn={setPlayerTurn}
            player_1_name={player_1_name}
            player_2_name={player_2_name}
            start={start}
            setplayerWonStatus={setPlayerWonStatus}
          />
          {start&&<button id="newGame" onClick={()=>{
            setStart(false);
            setPlayerTurn();
            setPlayerWonStatus(null)
          }}>New Game</button>}
        </div>
      </div>
    </>
  );
}

export default App;
