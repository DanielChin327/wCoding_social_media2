import { useState, useEffect } from "react"; // Import React hooks for state and side effects
import { useNavigate } from "react-router-dom"; // Import hook to programmatically navigate between routes
import axios from "axios"; // Import Axios for making HTTP requests
// import UseToken from "./UseToken"; // Unused import (commented out)

function Login({ setToken }) {
  // useState to manage login form data (username and password)
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  // useState to track if login was successful
  const [loginSuccess, setLoginSuccess] = useState(false);
  // useState to track number of login attempts
  const [loginAttempt, setLoginAttempt] = useState(0);

  const navigate = useNavigate(); // Initialize the useNavigate hook for route navigation

  // useEffect hook that checks for an existing token in localStorage whenever loginAttempt changes
  useEffect(() => {
    const storedToken = localStorage.getItem("token"); // Check for a stored token
    if (storedToken) {
      setLoginSuccess(true); // If token exists, mark login as successful
    }
  }, [loginAttempt]); // Runs after every login attempt (whenever loginAttempt state changes)

  // useEffect hook that navigates to the profile page if login is successful
  useEffect(() => {
    if (loginSuccess) {
      navigate("/profile"); // Navigate to the profile page after successful login
    }
  }, [loginSuccess]); // Runs whenever loginSuccess state changes

  // Handle the login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Send POST request to the backend (Flask API) with loginData
      const response = await axios.post(
        "http://localhost:5000/token",
        loginData
      );

      // If login is successful (status code 200)
      if (response.status === 200) {
        console.log("Login successful");
        setToken(response.data.access_token); // Set the token using the setToken function passed as a prop
        setLoginSuccess(true); // Mark login as successful
      } else {
        console.log("Login failed");

        // Reset the login form fields on failure
        setLoginData({
          username: "",
          password: "",
        });
      }
    } catch (error) {
      // Log any error encountered during the login request
      console.error(error);
    } finally {
      // Increment login attempt counter and log the attempt
      setLoginAttempt(loginAttempt + 1);
      console.log("Login attempt", loginAttempt);
    }
  };

  // Handle changes in the input fields (username and password)
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure the name and value from the input field
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value, // Update the loginData state with the new input values
    }));
  };

  // JSX to render the login form
  return (
    <div>
      <h1>Login</h1>
      {loginSuccess && <p>LOGIN SUCCESSFUL</p>} {/* Display success message if loginSuccess is true */}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={loginData.username}
          onChange={handleChange} // Handle changes in the username input field
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange} // Handle changes in the password input field
        />
        <button type="submit">Login</button> {/* Submit button to trigger form submission */}
      </form>
    </div>
  );
}

export default Login; // Export the Login component as the default export
