import { useState } from 'react';
import PropTypes from 'prop-types';
import Ilustrasi from '../assets/Ilustrasi Quis.png'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    localStorage.setItem('username', username);
    onLogin();
  };

  return (
    <section id="login">
      <nav className="navbar">
        <div className="container">
          <span className="navbar-brand fw-bold fs-3">MythQuiz</span>
        </div>
      </nav>
      <div className="login container d-flex justify-content-center align-items-center">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 col-lg-6">
            <img src={Ilustrasi} alt="Quiz" height={400} />
          </div>
          <div className="col-12 col-lg-6">
            <p className="fs-2 fw-bold">Test your knowledge of mythology from around the world</p>
            <p className="fs-5">Are You Ready??? Let&apos;s, Begin</p>
            <div className="d-flex flex-row">
              <input
                type="text"
                className="form-control fs-4 border-dark me-3"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button className="btn btn-outline-dark fw-bold fs-5" onClick={handleLogin}>
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
