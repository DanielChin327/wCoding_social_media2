import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Login successful!');
        // Handle successful login (e.g., redirect, store user data)
      } else {
        setMessage(data.error || 'Login failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred during login.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label><br/>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label><br/>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
