import React, { useState } from "react";
import "./App.css";

function App() {
  const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Paris", isCorrect: true },
        { text: "London", isCorrect: false },
        { text: "Berlin", isCorrect: false },
        { text: "Madrid", isCorrect: false },
      ],
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      answers: [
        { text: "Harper Lee", isCorrect: true },
        { text: "Mark Twain", isCorrect: false },
        { text: "Ernest Hemingway", isCorrect: false },
        { text: "F. Scott Fitzgerald", isCorrect: false },
      ],
    },
    {
      question: "What is the smallest planet in our solar system?",
      answers: [
        { text: "Mercury", isCorrect: true },
        { text: "Venus", isCorrect: false },
        { text: "Earth", isCorrect: false },
        { text: "Mars", isCorrect: false },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // New state

  const handleAnswerClick = (isCorrect, index) => {
    setSelectedAnswer(index); // Set selected answer index
    if (isCorrect) setScore(score + 1);

    setTimeout(() => {
      setSelectedAnswer(null); // Reset selected answer
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
    }, 300);
  };

  const handleRestartQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
    setSelectedAnswer(null); // Reset selected answer on restart
  };

  return (
    <div className="quiz-app">
      <h1 className="quiz-title">Quiz Challenge</h1>
      {showScore ? (
        <div className="score-section">
          <p className="score-animation">
            You scored {score} out of {questions.length}
          </p>
          <button onClick={handleRestartQuiz} className="restart-btn">
            Try Again
          </button>
        </div>
      ) : (
        <div className="quiz-container fade-in">
          <div className="question-section">
            <h2 className="question-text">
              Question {currentQuestion + 1}/{questions.length}
            </h2>
            <p style={{ color: "black" }}>
              {questions[currentQuestion].question}
            </p>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].answers.map((answer, index) => (
              <button
                key={index}
                className={`answer-btn ${
                  selectedAnswer === index ? "selected" : ""
                }`}
                onClick={() => handleAnswerClick(answer.isCorrect, index)}
              >
                {answer.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
