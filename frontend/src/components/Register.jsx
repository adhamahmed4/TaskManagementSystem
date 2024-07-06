import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AlertError from "./AlertError";

// API endpoint for registration
const API_ENDPOINT = import.meta.env.VITE_API_URL + "/api/auth/register"; // Define the API endpoint URL for registration

const Register = () => {
  // Define state variables using the useState hook
  const [formData, setFormData] = useState({ username: "", password: "" }); // State for form data
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate(); // Get the navigate function from React Router

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Update the formData state with the new input value
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Validate password before submitting the form
    const passwordError = validatePassword(formData.password); // Call the validatePassword function to check the password
    if (passwordError) {
      // If there is a password error
      setError(passwordError); // Set the error state with the password error message
      return; // Exit the function
    }

    try {
      await registerUser(formData); // Call the registerUser function with the form data
      navigate("/"); // Navigate to the root route after successful registration
    } catch (error) {
      handleRegistrationError(error); // Handle the error if the registration fails
    }
  };

  // Function to register a new user
  const registerUser = async (userData) => {
    const response = await axios.post(API_ENDPOINT, userData); // Send a POST request to the API endpoint with the user data
    return response.data; // Return the response data
  };

  // Function to handle registration errors
  const handleRegistrationError = (error) => {
    if (error.response) {
      // Check if the error has a response object
      if (error.response.status === 400) {
        // Check if the status code is 400 (Bad Request)
        setError("Invalid input. Please check your username and password."); // Set the error state with the appropriate message
      } else if (error.response.status >= 400 && error.response.status < 500) {
        // Check if the status code is a client error (4xx)
        setError(
          "Client error occurred. Please check your inputs and try again."
        ); // Set the error state with the appropriate message
      } else if (error.response.status >= 500) {
        // Check if the status code is a server error (5xx)
        setError("Server error occurred. Please try again later."); // Set the error state with the appropriate message
      }
    } else {
      setError("An unexpected error occurred. Please try again later."); // Set the error state with a generic error message
    }
  };

  // Function to validate the password
  const validatePassword = (password) => {
    const minLength = 8; // Minimum password length
    const hasUpperCase = /[A-Z]/.test(password); // Check if the password contains an uppercase letter
    const hasLowerCase = /[a-z]/.test(password); // Check if the password contains a lowercase letter
    const hasDigit = /\d/.test(password); // Check if the password contains a digit
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Check if the password contains a special character

    // Check if the password meets the requirements
    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`; // Return an error message if the password is too short
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter."; // Return an error message if the password doesn't contain an uppercase letter
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter."; // Return an error message if the password doesn't contain a lowercase letter
    }
    if (!hasDigit) {
      return "Password must contain at least one digit."; // Return an error message if the password doesn't contain a digit
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character."; // Return an error message if the password doesn't contain a special character
    }

    return ""; // Return an empty string if the password meets all the requirements
  };

  // Render the Register component
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 register-page">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:w-96 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            {error && <AlertError message={error} />}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full text-gray-200 placeholder-gray-400 rounded-md input input-bordered focus:ring-blue-500"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full text-gray-200 placeholder-gray-400 rounded-md input input-bordered focus:ring-blue-500"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
