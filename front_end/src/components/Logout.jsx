import axios from "axios"; // Import Axios for making HTTP requests
import { Link } from "react-router-dom"; // Import Link component for navigation

function Logout({ removeToken }) {
  // removeToken is passed as a prop to handle token removal on logout
  // const { removeToken } = UseToken(); // Unused import (commented out)

  // Function to handle logout
  function logout() {
    try {
      // Make a POST request to the backend to log out
      axios
        .post("http://localhost:5000/logout")
        .then((response) => {
          // When the backend responds, remove the access token locally using removeToken
          response.data.access_token = removeToken();
        })
        .catch((error) => {
          // Handle any errors during the request
          console.error(error);
        });
    } catch (error) {
      // Log any errors encountered in the try block
      console.error(error);
    } finally {
      // Log that a logout attempt was made
      console.log("Logout attempt");
    }
  }

  return (
    <li className="navbar-item">
      {/* Link to the home page, onClick triggers the logout function */}
      <Link className="navbar-link" onClick={logout} to="/">
        Logout
      </Link>
    </li>
  );
}

export default Logout; // Export the Logout component as the default export
