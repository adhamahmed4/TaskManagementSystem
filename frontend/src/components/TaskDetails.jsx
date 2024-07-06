import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import DetailItem from "./DetailItem";
import LoadingSpinner from "./LoadingSpinner";
import NotFound from "./NotFound";

// API endpoint for fetching task details
const API_ENDPOINT = import.meta.env.VITE_API_URL + "/api/tasks"; // Define the API endpoint URL for fetching task details

const TaskDetails = () => {
  const { id } = useParams(); // Get the task ID from the URL parameters using the useParams hook
  const [task, setTask] = useState(null); // State for storing the task data
  const [loading, setLoading] = useState(true); // State for tracking the loading state
  const [error, setError] = useState(""); // State for storing the error message

  // Function to fetch the task details from the API
  const fetchTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token"); // Get the authentication token from the browser's localStorage
      const response = await axios.get(`${API_ENDPOINT}/${taskId}`, {
        headers: { "x-access-token": token }, // Include the authentication token in the request headers
      });
      setTask(response.data); // Update the task state with the fetched task data
    } catch (error) {
      console.error("Error fetching task:", error); // Log the error to the console
      setError("Failed to fetch task details. Please try again."); // Set the error state with an error message
    } finally {
      setLoading(false); // Set the loading state to false, regardless of whether the request succeeded or failed
    }
  };

  // Use the useEffect hook to fetch the task details when the component mounts or the task ID changes
  useEffect(() => {
    fetchTask(id);
  }, [id]);

  // Render the LoadingSpinner component if the data is still loading
  if (loading) {
    return <LoadingSpinner />;
  }

  // Render the NotFound component with the error message if there was an error fetching the task details
  if (error) {
    return <NotFound message={error} />;
  }

  // Render the NotFound component with a "Task not found" message if the task data is null
  if (!task) {
    return <NotFound message="Task not found." />;
  }

  // Format date function
  function formatDate(date) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  // Render the TaskDetails component with the task data
  return (
    <section className="max-w-5xl p-8 mx-auto rounded-lg shadow-lg task-details bg-gray-50 dark:bg-gray-800">
      <Link to="/tasks" className="flex justify-end">
        {/* SVG icon for the back arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mb-4 lucide lucide-arrow-left"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
      </Link>
      {/* Display the task title */}
      <h1 className="mb-4 text-3xl font-bold">{task.title}</h1>{" "}
      {/* Display the task description */}
      <p className="mb-4 text-gray-500">{task.description}</p>{" "}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 md:gap-0 md:flex-nowrap">
        {/* Display the task status */}
        <DetailItem label="Status" value={task.status} />{" "}
        <DetailItem
          label="Created At"
          value={formatDate(new Date(task.created_at))}
        />
        <DetailItem
          label="Updated At"
          value={formatDate(new Date(task.updated_at))}
        />
      </div>
    </section>
  );
};

export default TaskDetails;
