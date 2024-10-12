import { useEffect, useState } from 'react';
import Question from './Question';
import Timer from './Timer';
import Result from './Result';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // Default 5 minutes = 300 seconds
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  // Function to shuffle answers (save result for future restoration)
  const shuffleAnswers = (answers) => {
    return answers.sort(() => Math.random() - 0.5);
  };

  // Save quiz state to localStorage
  const saveQuizState = () => {
    if (questions.length > 0) {
      const quizData = {
        savedQuestions: questions,
        savedAnswers: answers,
        savedCurrentQuestionIndex: currentQuestionIndex,
        savedTimeLeft: timeLeft,
        savedShuffledAnswers: shuffledAnswers,
      };
      localStorage.setItem('quizData', JSON.stringify(quizData));
    }
  };

  // Fetch questions on component mount
  useEffect(() => {
    const savedQuizData = localStorage.getItem('quizData');

    if (savedQuizData) {
      const { savedQuestions, savedAnswers, savedCurrentQuestionIndex, savedTimeLeft, savedShuffledAnswers } = JSON.parse(savedQuizData);
      setQuestions(savedQuestions);
      setAnswers(savedAnswers);
      setCurrentQuestionIndex(savedCurrentQuestionIndex);
      setTimeLeft(savedTimeLeft);
      setShuffledAnswers(savedShuffledAnswers);
      setLoading(false); // Data loaded from localStorage
    } else {
      fetch('https://opentdb.com/api.php?amount=5&category=20&type=multiple')
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch data');
          }
          return res.json();
        })
        .then((data) => {
          if (data && data.results) {
            setQuestions(data.results);
            // Initialize the shuffled answers for each question
            const shuffled = data.results.map((q) => shuffleAnswers([...q.incorrect_answers, q.correct_answer]));
            setShuffledAnswers(shuffled);
            setLoading(false); // Data loaded successfully
          } else {
            throw new Error('Invalid data structure from API');
          }
        })
        .catch((err) => {
          setError(err.message); // Set error state if there is a problem
          setLoading(false);
        });
    }
  }, []);

  // Automatically save quiz state to localStorage on each update
  useEffect(() => {
    saveQuizState();
  }, [answers, currentQuestionIndex, timeLeft, questions, shuffledAnswers]);

  const handleAnswer = (isCorrect) => {
    setAnswers([...answers, isCorrect]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
      localStorage.removeItem('quizData'); // Remove quiz data when completed
    }
  };

  const handleTimeout = () => {
    setQuizCompleted(true);
    localStorage.removeItem('quizData'); // Remove quiz data when completed
  };

  // Reset the quiz state
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShuffledAnswers(questions.map((q) => shuffleAnswers([...q.incorrect_answers, q.correct_answer])));
    setTimeLeft(300); // Reset timer
    localStorage.removeItem('quizData'); // Clear saved quiz data
    setQuizCompleted(false);
  };

  // Check if question and shuffled answers are ready before rendering
  const isQuestionReady = questions[currentQuestionIndex] && shuffledAnswers[currentQuestionIndex];

  return (
    <div className="container quiz d-flex align-items-center justify-content-center flex-column">
      {error ? (
        <div className="alert alert-danger">Error: {error}</div>
      ) : loading ? (
        <p>Loading...</p>
      ) : quizCompleted ? (
        <Result
          score={answers.filter(Boolean).length}
          total={questions.length}
          answers={answers}
          resetQuiz={resetQuiz} // Pass reset function to result component
        />
      ) : (
        <>
          <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} onTimeout={handleTimeout} />
          {isQuestionReady ? (
            <Question
              data={questions[currentQuestionIndex]}
              shuffledAnswers={shuffledAnswers[currentQuestionIndex]}
              onAnswer={handleAnswer}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
            />
          ) : (
            <p>Loading question...</p>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;
