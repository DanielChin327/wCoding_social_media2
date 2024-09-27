import React from "react"; // Import React
import "./NavBar.css"; // Import styles for the NavBar
import { useState } from "react"; // Import React's useState hook to manage state
import { Link } from "react-router-dom"; // Import Link component for navigation
import { useEffect } from "react"; // Import useEffect to handle side effects
import Logout from "./Logout"; // Import Logout component
import UseToken from "./UseToken"; // Import custom hook for token management

function NavBar() {
  // State to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Destructure token management functions from UseToken hook
  const { token, removeToken, setToken } = UseToken();

  // useEffect to update isAuthenticated whenever the token changes
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true); // User is authenticated if token exists
      console.log("isAuthenticated", isAuthenticated); // Log current authentication status
    } else {
      setIsAuthenticated(false); // User is not authenticated if token doesn't exist
      console.log("isAuthenticated", isAuthenticated); // Log current authentication status
    }
    console.log("token", token); // Log the current token
  }, [token]); // Dependency array ensures effect runs when token changes

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <ul className="navbar-list">
          {/* Login link */}
          <li className="navbar-item">
            <Link to="/login" className="navbar-link">
              Login
            </Link>
          </li>
          {/* Sign Up link */}
          <li className="navbar-item">
            <Link to="/signup" className="navbar-link">
              Sign Up
            </Link>
          </li>
          {/* Profile link: If authenticated, link to /profile, otherwise link to /error */}
          <li className="navbar-item">
            <Link
              to={isAuthenticated ? "/profile" : "/error"} // Conditional link based on authentication status
              className="navbar-link"
            >
              Profile
            </Link>
          </li>
          {/* Show Logout component only if the user is authenticated */}
          {isAuthenticated && <Logout removeToken={removeToken} />}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar; // Export NavBar as default
