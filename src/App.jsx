import React from "react";
import Start from "./Start";
import Game from "./Game";
// import "./styles.css";

export default function App() {
  const [isGame, setIsGame] = React.useState(false);
  function startGame() {
    setIsGame(true);
  }
  return (
    <div className="App">
      {isGame ? <Game /> : <Start startGame={startGame} />}
    </div>
  );
}
