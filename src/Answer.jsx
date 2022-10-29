import React from "react";
import { decode } from "html-entities";

export default function Answer(props) {
  let classes = "Answer";
  props.isChosen && (classes = classes + " answer--chosen");
  props.isCorrect && (classes = classes + " answer--correct");
  props.isWrong && (classes = classes + " answer--wrong");
  props.isCheckResults && (classes = classes + " answer--overlay");

  return (
    <button className={classes} onClick={() => props.chooseAnswer(props.id)}>
      {decode(props.answer)}
    </button>
  );
}
