import React, { useState } from "react";
import Questions from "./Questions.json";
import ResultPage from "./ResultPage";
import correctAudio from "../Sound Effects/correct.mp3";
import wrongAudio from "../Sound Effects/wrong.mp3";
import InstructionPage from "./InstructionPage";

function GeneralKnowledgeQuiz() {
  const [attempts, setAttempts] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [solved, setSolved] = useState(0);
  const [correctAns, setCorrectAns] = useState(0);
  const [wrongAns, setWrongAns] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [next_or_tryAgain, setNext_or_tryAgain] = useState("Next");
  const [continuePage, setContinuePage] = useState(true);

  // For Audio
  const audioObject = {
    correct: new Audio(correctAudio),
    wrong: new Audio(wrongAudio),
  };

  //  GetOptionClass use for getting  class/
  const getOptionClass = (question, selectedOption) => {
    if (selectedOption === question.answer) {
      audioObject.correct.play();
      return "rightAns";
    } else {
      audioObject.wrong.play();
      return "wrongAns";
    }
  };

  const optionHandle = (question, option, attempts) => {
    // This "if" condition check if the selectedOption State contain null value then add the user selected option in selectedOption State and Also Add the question and user Selected option in Attempts state.

    if (selectedOption === null) {
      setSelectedOption(option);
      setAttempts([
        ...attempts,
        {
          Question: question.question,
          options: Questions[questionIndex].options,
          userSelect: option,
          answer: Questions[questionIndex].answer,
          result: option === Questions[questionIndex].answer ? "Pass" : "Fail",
        },
      ]);

      setSolved(solved + 1);
      // Check selectedOption is correct
      option === question.answer
        ? setCorrectAns(correctAns + 1)
        : setWrongAns(wrongAns + 1);
    }
  };

  const buttonHandle = () => {
    if (questionIndex < Questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelectedOption(null);
    } else {
      setQuestionIndex(questionIndex + 1);
      setShowResult(true);
      setNext_or_tryAgain("Try Again");
      setSelectedOption("");
    }

    // This Function for Try Again

    if (next_or_tryAgain === "Try Again") {
      setContinuePage(true)
      setShowResult(false);
      setQuestionIndex(0);
      setSolved(0);
      setCorrectAns(0);
      setWrongAns(0);
      setNext_or_tryAgain("Next");
      setSelectedOption(null);
      setAttempts([]);
    }
  };
  // This function for Instruction Page
  let continueHandle = () => {
    setContinuePage(false);
  };

  return (
    <>
      {continuePage ? (
        <InstructionPage continueHandle={continueHandle} />
      ) : (
        <div id="quizApp">
          <h1>
            Test Your <span>General Knowledge</span>
          </h1>

          <div className="container">
            {showResult ? (
              <ResultPage
                solved={solved}
                correctAns={correctAns}
                wrongAns={wrongAns}
                totalScore={Questions.length}
                attempts={attempts}
                setAttempts={setAttempts}
              />
            ) : (
              <>
                <input
                  className="progressBar"
                  type="range"
                  onChange={()=> {}}
                  value={questionIndex}
                  max={Questions.length}
                />
                <div className="question">
                  <div className="score">
                    <p>Solved : {solved}</p>
                    <p className="green">Correct : {correctAns}</p>

                    <p>Total : {Questions.length}</p>
                  </div>
                  <h3>{`${questionIndex + 1}: ${
                    Questions[questionIndex].question
                  }`}</h3>
                  <div className="image">
                    <img src={Questions[questionIndex].image} alt="" />
                  </div>
                </div>
                <ul>
                  {Questions[questionIndex].options.map((option) => (
                    <li 
                      key={option}
                      className={` ${
                        option === selectedOption
                          ? getOptionClass(
                              Questions[questionIndex],
                              selectedOption
                            )
                          : ""
                      } ${
                        selectedOption !== null
                          ? option === Questions[questionIndex].answer
                            ? "rightAns"
                            : ""
                          : ""
                      }`}
                      onClick={() =>
                        optionHandle(Questions[questionIndex], option, attempts)
                      }
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <div className="btn ">
              <button
                disabled={selectedOption === null ? true : false}
                onClick={buttonHandle}
              >
                {next_or_tryAgain}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GeneralKnowledgeQuiz;
