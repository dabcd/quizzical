import React from "react";

export default function Start(props) {
  return (
    <div className="Start">
      <h1 className="start--title">Quizzical</h1>
      <p className="start--desc">Choose the answer (only one is correct)</p>
      <button className="start--button" onClick={props.startGame}>
        Start quiz
      </button>
    </div>
  );
}
