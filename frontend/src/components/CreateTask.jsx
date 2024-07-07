import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlertError from "./AlertError";
import AlertSuccess from "./AlertSuccess";
import useForm from "../hooks/useForm";
import axios from "axios";

// Get the API URL from the environment variable
const API_URL = import.meta.env.VITE_API_URL;

const CreateTask = () => {
  // Use the useNavigate hook to get the navigate function for navigation
  const navigate = useNavigate();

  // Define the initial state for the form data
  const initialState = {
    title: "",
    description: "",
    status: "Pending",
  };

  // Define the onSubmit function to handle form submission
  const onSubmit = async (formData) => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");
    // Send a POST request to the API to create a new task
    await axios.post(`${API_URL}/api/tasks`, formData, {
      headers: { "x-access-token": token },
    });
  };

  // Use the useForm custom hook to get the form data, handlers, and state
  const { formData, handleChange, handleSubmit, error, success } = useForm(
    initialState,
    onSubmit
  );

  // Use the useEffect hook to navigate to the "/tasks" route after a successful form submission
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/tasks");
      }, 2000); // Wait for 2 seconds before navigating
      return () => clearTimeout(timer); // Clean up the timer on component unmount
    }
  }, [success, navigate]);

  // Render the CreateTask component
  return (
    <section className="flex items-center justify-center h-screen bg-gray-100 create-task dark:bg-gray-900">
      <div className="w-full max-w-md px-8 pt-6 pb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="mb-6 text-2xl font-bold text-center">Create Task</h1>
        {/* Render the AlertError component if there is an error */}
        {error && <AlertError message={error} />}
        {/* Render the AlertSuccess component if the form submission was successful */}
        {success && <AlertSuccess message={success} />}
        {/* Render the form for creating a new task */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full input input-bordered"
            />
          </div>
          <div className="mb-4">
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full textarea textarea-bordered"
            />
          </div>
          <div className="mb-4">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full select select-bordered"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button type="submit" className="w-full btn btn-primary">
            Create
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateTask;
