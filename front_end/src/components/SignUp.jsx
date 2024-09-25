import React, { useState } from 'react';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, bio }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('User registered successfully!');
        // You can redirect the user or clear the form here
      } else if (response.status === 409) {
        setMessage('Username already exists.');
      } else {
        setMessage('Failed to register user.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while registering.');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
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
        <div>
          <label>Bio:</label><br/>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          ></textarea>
        </div>
        <br/>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
