import { useEffect, useState } from 'react';
import Question from './Question';
import Timer from './Timer';
import Result from './Result';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const savedProgress = localStorage.getItem('quiz-progress');
    if (savedProgress) {
      const { questions, currentQuestion, score, answers } = JSON.parse(savedProgress);
      setQuestions(questions);
      setCurrentQuestion(currentQuestion);
      setScore(score);
      setAnswers(answers);
    } else {
      fetch('https://opentdb.com/api.php?amount=10&category=20&type=multiple')
        .then((res) => res.json())
        .then((data) => {
          setQuestions(data.results);
        });
    }
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      localStorage.setItem(
        'quiz-progress',
        JSON.stringify({ questions, currentQuestion: currentQuestion + 1, score, answers: newAnswers })
      );
    } else {
      setQuizEnded(true);
      localStorage.removeItem('quiz-progress');
    }
  };

  if (quizEnded) return <Result score={score} total={questions.length} answers={answers} />;

  return (
    <div className="container quiz d-flex align-items-center justify-content-center flex-column">
      <Timer onTimeout={() => setQuizEnded(true)} />
      {questions.length > 0 && (
        <Question
          data={questions[currentQuestion]}
          onAnswer={handleAnswer}
          questionNumber={currentQuestion + 1}
          totalQuestions={questions.length}
        />
      )}
    </div>
  );
};

export default Quiz;
