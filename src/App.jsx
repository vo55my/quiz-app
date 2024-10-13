import { useState } from 'react';
import Login from './components/Login';
import Quiz from './components/Quiz';

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('username') ? true : false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div className="App">
      {!loggedIn ? <Login onLogin={handleLogin} /> : <Quiz />}
    </div>
  );
}

export default App;
