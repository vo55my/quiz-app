import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Timer = ({ timeLeft, setTimeLeft, onTimeout }) => {
  useEffect(() => {
    // Ambil sisa waktu dari localStorage saat komponen dirender
    const savedTimeLeft = localStorage.getItem('timeLeft');
    if (savedTimeLeft) {
      setTimeLeft(parseInt(savedTimeLeft, 10)); // Ubah dari string ke angka
    }

    // Interval untuk mengurangi waktu
    const timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTimeLeft) => {
          const newTimeLeft = prevTimeLeft - 1;
          // Simpan waktu yang tersisa ke localStorage
          localStorage.setItem('timeLeft', newTimeLeft);
          return newTimeLeft;
        });
      } else {
        onTimeout(); // Ketika waktu habis, panggil fungsi timeout
        clearInterval(timerInterval); // Hentikan interval saat waktu habis
      }
    }, 1000);

    // Membersihkan interval saat komponen di-unmount
    return () => clearInterval(timerInterval);
  }, [timeLeft, setTimeLeft, onTimeout]);

  return (
    <div className="alert fs-4 border border-dark fw-bold">
      Time Remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
    </div>
  );
};

Timer.propTypes = {
  timeLeft: PropTypes.number.isRequired,
  setTimeLeft: PropTypes.func.isRequired,
  onTimeout: PropTypes.func.isRequired,
};

export default Timer;
