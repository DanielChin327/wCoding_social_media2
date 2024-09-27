import { useState } from "react"; // Import useState hook for managing state

function UseToken() {
  // Function to get the token from localStorage
  function getToken() {
    const tokenString = localStorage.getItem("token"); // Retrieve the token string from localStorage
    const userToken = JSON.parse(tokenString); // Parse the JSON string to an object
    return userToken; // Return the parsed token object
  }

  // useState to store the token, initialized with the value returned from getToken
  const [token, setToken] = useState(getToken());

  // Function to save the token to localStorage and update the state
  function saveToken(userToken) {
    localStorage.setItem("token", JSON.stringify(userToken)); // Store the token as a JSON string in localStorage
    setToken(userToken.token); // Update the token state with the userToken's token property
  }

  // Function to remove the token from localStorage and set the state to null
  function removeToken() {
    localStorage.removeItem("token"); // Remove the token from localStorage
    setToken(null); // Set the token state to null, effectively logging the user out
  }

  // Return an object with the token, and the functions to save and remove the token
  return {
    setToken: saveToken, // Expose saveToken function as setToken
    token, // Expose the current token
    removeToken, // Expose removeToken function to clear the token
  };
}

export default UseToken; // Export UseToken as the default export
