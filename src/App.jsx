import React from "react";
import Start from "./Start";
import Game from "./Game";

export default function App() {
  const [isGame, setIsGame] = React.useState(false);

  return (
    <div className="App">
      {isGame ? <Game /> : <Start startGame={() => setIsGame(true)} />}
    </div>
  );
}
