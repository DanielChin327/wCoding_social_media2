import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // First, verify the user's credentials
      const loginResponse = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const loginData = await loginResponse.json();

      if (loginResponse.ok) {
        // Credentials are valid; now request a token
        const tokenResponse = await fetch('http://localhost:5000/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        const tokenData = await tokenResponse.json();

        if (tokenResponse.ok) {
          // Store the token (e.g., in localStorage)
          localStorage.setItem('token', tokenData.access_token);
          setMessage('Login successful!');
          // Redirect or update application state as needed
        } else {
          setMessage(tokenData.error || 'Failed to retrieve token.');
        }
      } else {
        setMessage(loginData.error || 'Login failed.');
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
