import PropTypes from 'prop-types';

const Question = ({ data, shuffledAnswers, onAnswer, questionNumber, totalQuestions }) => {
  const { question, correct_answer } = data;

  return (
    <div className="card mt-2">
      <div className="card-header">
        <h4 className="fw-bold">
          Question {questionNumber}/{totalQuestions}
        </h4>
      </div>
      <div className="card-body">
        <p className="fs-4" dangerouslySetInnerHTML={{ __html: question }}></p>
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            className="btn btn-outline-dark m-2 fs-5"
            onClick={() => onAnswer(answer === correct_answer)}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
    </div>
  );
};

Question.propTypes = {
  data: PropTypes.shape({
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  shuffledAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswer: PropTypes.func.isRequired,
  questionNumber: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
};

export default Question;
