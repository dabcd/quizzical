import React from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";
import Answer from "./Answer";

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function atobSafe(str) {
  try {
    return window.atob(str);
  } catch (e) {
    return "";
  }
}

export default function Question(props) {
  const [answers, setAnswers] = React.useState([]);
  const [choices, setChoices] = React.useState([]);

  function initChoices() {
    const a = [];
    for (let i = 0; i < 4; i++) {
      const id = nanoid();
      a.push({ id: id, isChosen: false, isCorrect: false, isWrong: false });
    }
    return a;
  }

  function initAnswers() {
    let a = [];
    a = a.concat(props.incorrect_answers, props.correct_answer);
    shuffleArray(a);
    return a;
  }

  React.useEffect(() => {
    setChoices(initChoices());
    setAnswers(initAnswers());
  }, [props.intPlayAgain]);

  React.useEffect(() => {
    if (props.isCheckResults) {
      checkResults();
    }
  }, [props.isCheckResults]);

  function checkResults() {
    for (let i = 0; i < 4; i++) {
      if (answers[i] === props.correct_answer) {
        setChoices((prev) =>
          prev.map((elem, index) => {
            return index === i ? { ...elem, isCorrect: true } : elem;
          })
        );
        if (choices[i].isChosen) {
          props.addScore();
        }
      } else {
        setChoices((prev) =>
          prev.map((elem, index) => {
            return index === i ? { ...elem, isWrong: true } : elem;
          })
        );
      }
    }
  }

  function chooseAnswer(id) {
    if (!props.isCheckResults) {
      setChoices((prev) =>
        prev.map((elem) => {
          return elem.id === id
            ? { ...elem, isChosen: true }
            : { ...elem, isChosen: false };
        })
      );
    }
  }

  let answersElements = [];
  if (choices.length !== 0) {
    for (let i = 0; i < 4; i++) {
      answersElements[i] = (
        <Answer
          key={choices[i].id}
          id={choices[i].id}
          answer={answers[i]}
          chooseAnswer={chooseAnswer}
          isChosen={choices[i].isChosen}
          isCorrect={choices[i].isCorrect}
          isWrong={choices[i].isWrong}
          isCheckResults={props.isCheckResults}
        />
      );
    }
  }

  return (
    <div className="Question">
      <div className="q--question">{decode(props.question)}</div>
      <div className="q--answers">{answersElements}</div>
    </div>
  );
}
