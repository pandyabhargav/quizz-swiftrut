import { useContext, useEffect, useState } from "react";
import axios from "axios";
import QuizContext from "../../contexts/QuizContext";
import Spiner from "../Spiner";

const Quiz = () => {
  const { score, setScore } = useContext(QuizContext);
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [dataNotFound, setDataNotFound] = useState(false); 
  const API_URL = "https://quizz-swiftrut.onrender.com/api/quiz/js";

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await axios.get(API_URL);
        if (data.length === 0) {
          setDataNotFound(true); 
        } else {
          setQuestions(data.sort(() => 0.5 - Math.random()).slice(0, 10));
        }
      } catch (error) {
        console.error(error);
        setDataNotFound(true); 
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleOption = (option) => {
    setSelectedOption(option);
    setUserAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = option;
      return newAnswers;
    });
  };

  const handleSubmitQuiz = () => {
    const userScore = questions.reduce(
      (acc, question, index) =>
        acc + (question.correctAnswer === userAnswers[index] ? 1 : 0),
      0
    );
    setScore(userScore);
    setFinalScore(userScore);
    setShowScore(true);
    localStorage.setItem("quiz", JSON.stringify(questions));
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setCurrentQuestion((prev) => prev + 1);
    setSelectedOption(null);
  };

  return (
    <div className="quiz-wrapper w-full min-h-[100vh] bg-gradient-to-br from-blue-50 to-blue-100 flex justify-center items-center">
      {isLoading ? (
        <Spiner />
      ) : dataNotFound ? (
        <div className="data-not-found flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Data Not Found</h2>
          <p className="text-xl">Please check the database and add questions.</p>
        </div>
      ) : showScore ? (
        <div className="score-display flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Your Score</h2>
          <p className="text-xl">{finalScore} out of {questions.length}</p>
          <button
            onClick={() => window.location.replace("/user")}
            className="bg-blue-500 text-white rounded px-4 py-2 mt-4 hover:bg-blue-600 transition"
          >
            Back to Home
          </button>
        </div>
      ) : (
        <div className="quiz-container w-full max-w-xl p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6">Q. {questions[currentQuestion].question}</h1>
          <div className="options flex flex-col gap-4 mb-4">
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`option p-4 border-2 rounded-md cursor-pointer transition-colors ${option === selectedOption ? 'bg-blue-500 text-white border-blue-600' : 'bg-gray-100 border-gray-300 hover:bg-blue-100'}`}
                onClick={() => handleOption(option)}
              >
                <span className="font-bold">{index + 1}. {option}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition"
              >
                Submit Test
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
