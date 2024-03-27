import React, { useEffect, useRef, useState } from "react";

export default function Abc({ name, symbol, setName, turn, start }) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const activePlayer = useRef(null);

  useEffect(()=>{
    if(turn===name){
      activePlayer.current.classList.add('active');
    }else{
      activePlayer.current.classList.remove('active');
    }
  })

  function handleEditSave() {
    setIsEditing((p) => !p);
  }
  function inputOnChange(event){
    setName(event.target.value)
  }
  function handleKeyDown(event){
    if(event.key==='Enter'){
      handleEditSave();
    }
  }

  useEffect(()=>{
    if(isEditing){
      inputRef.current.focus();
      inputRef.current.select();
    }
  },[isEditing])

  return (
    <div className="playerInner" ref={activePlayer}>
      <ol>
        <li>
          {isEditing && (
            <input ref={inputRef} onChange={inputOnChange} onKeyDown={handleKeyDown} value={name} id="playerInput"/>
          )}
          {!isEditing && <span id="playerName">{name}</span>}
          <span id="eleStyle">{symbol}</span>
          {!start&&<button id="editName" onClick={handleEditSave}>
            {isEditing ? "Save" : "Edit"}
          </button>}
        </li>
      </ol>
    </div>
  );
}
