import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AlertError from "./AlertError";

// API endpoint for login
const API_ENDPOINT = import.meta.env.VITE_API_URL + "/api/auth/login"; // Define the API endpoint URL for login

const Login = () => {
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
    const { username, password } = formData; // Destructure the username and password from the formData state

    // Check if username or password is empty
    if (!username || !password) {
      setError("Please enter both username and password."); // Set the error state if either field is empty
      return; // Exit the function
    }

    try {
      // Send a POST request to the API endpoint with the username and password
      const response = await axios.post(API_ENDPOINT, { username, password });
      localStorage.setItem("token", response.data.token); // Store the token in the browser's localStorage
      navigate("/tasks"); // Navigate to the /tasks route
    } catch (error) {
      handleLoginError(error); // Handle the error if the API request fails
    }
  };

  // Function to handle login errors
  const handleLoginError = (error) => {
    if (error.response) {
      // Check if the error has a response object
      if (error.response.status === 401) {
        // Check if the status code is 401 (Unauthorized)
        setError("Invalid username or password"); // Set the error state with the appropriate message
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

  // Render the Login component
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 login-page">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:w-96 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
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
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don&apos;t have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
