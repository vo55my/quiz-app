import PropTypes from 'prop-types';

const Result = ({ total, answers }) => {
  const correctAnswers = answers.filter((answer) => answer).length;
  const incorrectAnswers = total - correctAnswers;

  return (
    <div className="container result d-flex align-items-center justify-content-center flex-column">
      <div className="card text-center">
        <div className="card-header">
          <h2>Quiz Completed!</h2>
        </div>
        <div className="card-body fs-4">
          <p>Correct Answers: {correctAnswers}</p>
          <p>Incorrect Answers: {incorrectAnswers}</p>
          <p>Total Questions: {total}</p>
        </div>
      </div>
    </div>
  );
};

Result.propTypes = {
  score: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  answers: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

export default Result;
