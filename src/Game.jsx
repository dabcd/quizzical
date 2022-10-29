import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";
// import data from "./api.json";

// category=17 -> science and nature
// category=23 -> history
// category=25 -> art
const CATEGORY = 25;
const NUM_OF_QUESTIONS = 5;

export default function Game() {
  const apiUrl = `https://opentdb.com/api.php?amount=${NUM_OF_QUESTIONS}&category=${CATEGORY}&type=multiple`;
  const [data, setData] = React.useState({});
  const [scores, setScores] = React.useState(0);
  const [keys, setKeys] = React.useState([]);
  const [isCheckResults, setIsCheckResults] = React.useState(false);
  const [intPlayAgain, setIntPlayAgain] = React.useState(0);

  function addScore() {
    setScores((prev) => prev + 1);
  }

  function initKeys() {
    let a = [];
    for (let i = 0; i < 5; i++) {
      a.push(nanoid());
    }
    setKeys(a);
  }

  React.useEffect(() => {
    (async function () {
      const res = await fetch(apiUrl);
      const fetchedData = await res.json();
      setData(fetchedData);
      initKeys();
    })();
  }, [intPlayAgain]);

  function playAgain() {
    setIntPlayAgain((prev) => prev + 1);
    setIsCheckResults(false);
    setScores(0);
  }

  let quiz = null;
  if (data.response_code === 0) {
    quiz = data.results.map(
      ({ question, correct_answer, incorrect_answers }, index) => (
        <Question
          key={keys[index]}
          question={question}
          correct_answer={correct_answer}
          incorrect_answers={incorrect_answers}
          isCheckResults={isCheckResults}
          addScore={() => setScores((prev) => prev + 1)}
          intPlayAgain={intPlayAgain}
        />
      )
    );
  }

  return (
    <div className="Game">
      {quiz}
      {isCheckResults ? (
        <div className="game--results">
          <div className="game--score">
            You scored {scores}/{NUM_OF_QUESTIONS} correct answers
          </div>
          <button className="game--button" onClick={playAgain}>
            Play again
          </button>
        </div>
      ) : (
        <button className="game--button" onClick={() => setIsCheckResults(true)}>
          Check answers
        </button>
      )}
    </div>
  );
}
