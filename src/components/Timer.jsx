import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Timer = ({ onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeout]);

  return (
    <div className="alert fs-4 border border-dark fw-bold">
      Time Remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
    </div>
  );
};

Timer.propTypes = {
  onTimeout: PropTypes.func.isRequired,
};

export default Timer;
