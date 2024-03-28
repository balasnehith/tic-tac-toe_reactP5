import { useEffect, useRef, useState } from "react";

export default function Abc({
  initialName,
  symbol,
  isActive,
  updatePlayerDetails,
}) {
  const [playersName, setPlayersName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  const inputNameRef = useRef(null);
  useEffect(() => {
    if (isEditing) {
      inputNameRef.current.focus();
    }
  }, [isEditing]);

  function handleEditName() {
    if (isEditing) {
      updatePlayerDetails(symbol, playersName);
    }
    setIsEditing((p) => !p);
  }

  function handleNameChange(event) {
    setPlayersName((p) => event.target.value);
  }

  function handleEnterKey(event) {
    if (event.key === "Enter") {
      handleEditName();
    }
  }

  return (
    <div className={`playerInner ${isActive ? "active" : ""}`}>
      <ol>
        <li>
          {isEditing && (
            <input
              id="playerInput"
              value={playersName}
              onChange={handleNameChange}
              ref={inputNameRef}
              onKeyDown={handleEnterKey}
            />
          )}
          {!isEditing && <span id="playerName">{playersName}</span>}
          <span id="eleStyle">{symbol}</span>
          <button id="editName" onClick={handleEditName}>
            {isEditing ? "Save" : "Edit"}
          </button>
        </li>
      </ol>
    </div>
  );
}
