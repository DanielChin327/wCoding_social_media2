import React, { useEffect, useState } from "react"; // Import necessary React hooks
import axios from "axios"; // Import Axios for HTTP requests

function SignUp() {
  // useState hook to manage form data (username, password, bio)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    bio: "", // You have a bio field, but it's not used in the form. It could be removed or included in the form.
  });

  // State to track if password and confirm password match
  const [passwordMatch, setPasswordMatch] = useState(true);

  // Handle changes in the form inputs
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure the name and value from the input field
    // Update form data as the user types
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically set the value for username, password, or confirmPassword
    }));

    // Check for password matching when either password or confirmPassword changes
    if (name === "confirmPassword") {
      setPasswordMatch(value === formData.password); // Check if confirmPassword matches the password
    } else if (name === "password") {
      setPasswordMatch(value === formData.confirmPassword); // Check if password matches confirmPassword
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form behavior (like reloading the page)
    // If passwords match, log form data and send the request to the backend
    if (passwordMatch) {
      console.log("Form submitted", formData);
      registerUser(formData); // Call the function to register the user
    } else {
      console.log("Passwords do not match"); // Log a message if passwords don't match
    }
  };

  // Function to send user registration data to the backend
  const registerUser = async (data) => {
    try {
      // Send POST request to the Flask backend at the /register route with form data
      const response = await axios.post("http://localhost:5000/register", data);
      console.log(response.data); // Log the response from the backend
    } catch (error) {
      console.error(error); // Log any errors encountered during the request
    }
  };

  // JSX to render the signup form
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username} // Controlled input bound to formData
            onChange={handleChange} // Trigger handleChange on input change
            required // Make the input required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password} // Controlled input bound to formData
            onChange={handleChange} // Trigger handleChange on input change
            required // Make the input required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword || ""} // Controlled input for confirm password
            onChange={handleChange} // Trigger handleChange on input change
            required // Make the input required
          />
          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords do not match</p> // Show an error message if passwords do not match
          )}
        </div>
        <button type="submit">Sign Up</button> {/* Submit button */}
      </form>
    </>
  );
}

export default SignUp; // Export the SignUp component
