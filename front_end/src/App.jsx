import React from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  return (
    <div>
      <h1>Welcome to the App</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>
          <Login />
        </div>
        <div>
          <SignUp />
        </div>
      </div>
    </div>
  );
}

export default App;
