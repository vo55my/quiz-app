import { useState } from 'react';
import Login from './components/Login';
import Quiz from './components/Quiz';

function App() {
  // State to check if the user is logged in
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('username') ? true : false);

  // Function to handle login
  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div className="App">
      {/* Conditionally render Login or Quiz based on the login status */}
      {!loggedIn ? <Login onLogin={handleLogin} /> : <Quiz />}
    </div>
  );
}

export default App;
