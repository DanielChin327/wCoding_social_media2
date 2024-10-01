
// import reactLogo from './assets/react.svg' // Example import (commented out)
// import viteLogo from '/vite.svg' // Example import (commented out)
import "./App.css"; // Import the main stylesheet for the app
import SignUp from "./components/SignUp"; // Import the SignUp component
import Login from "./components/Login"; // Import the Login component
import NavBar from "./components/NavBar"; // Import the NavBar component
import UseToken from "./components/UseToken"; // Import the custom hook for managing tokens
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import routing components from react-router-dom
// import Header from "./components/Logout"; // Unused import, commented out
import Profile from "./components/Profile"; // Import the Profile component
import Home from "./components/Home"; // Import the Home component
import Logout from "./components/Logout"; // Import the Logout component
import Error from "./components/Error"; // Import the Error component

function App() {
  // Destructure the custom hook UseToken, which manages authentication tokens
  const { token, removeToken, setToken } = UseToken();

  // Return statement renders the app layout and routes
  // Summary:
  // - BrowserRouter enables routing for the app.
  // - NavBar is included globally for all routes.
  // - Routes define different paths (e.g., "/", "/login", "/signup") and map them to their corresponding components.
  // - The Login component receives the setToken function as a prop to handle authentication.
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login setToken={setToken} />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/error" element={<Error />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}
export default App; // Export the App component as the default export
