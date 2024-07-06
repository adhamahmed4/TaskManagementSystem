import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import noTasksImage from "../assets/no-tasks.svg";
import TaskStatusBadge from "./TaskStatusBadge";
import Header from "./Header";
import ConfirmationModal from "./ConfirmationModal";
import AlertError from "./AlertError";

// API endpoint for tasks
const API_ENDPOINT = import.meta.env.VITE_API_URL + "/api/tasks"; // Define the API endpoint URL for tasks

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // State for storing the list of tasks
  const [showModal, setShowModal] = useState(false); // State for controlling the visibility of the confirmation modal
  const [taskToDelete, setTaskToDelete] = useState(null); // State for storing the ID of the task to be deleted
  const [error, setError] = useState(null); // State for handling errors

  // Function to fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the authentication token from the browser's localStorage
      const response = await axios.get(API_ENDPOINT, {
        headers: { "x-access-token": token }, // Include the authentication token in the request headers
      });
      setTasks(response.data); // Update the tasks state with the fetched tasks
    } catch (error) {
      console.error("Error fetching tasks:", error); // Log the error to the console
      setError("Failed to fetch tasks. Please try again later."); // Set the error state with an error message
    }
  };

  // Function to handle task deletion
  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token"); // Get the authentication token from the browser's localStorage
      await axios.delete(`${API_ENDPOINT}/${taskId}`, {
        headers: { "x-access-token": token }, // Include the authentication token in the request headers
      });
      setTasks(tasks.filter((t) => t.id !== taskId)); // Remove the deleted task from the tasks state
      setShowModal(false); // Close the confirmation modal
    } catch (error) {
      console.error("Error deleting task:", error); // Log the error to the console
      setError("Failed to delete task. Please try again later."); // Set the error state with an error message
    }
  };

  // Function to show the confirmation modal for deleting a task
  const confirmDeleteTask = (taskId) => {
    setTaskToDelete(taskId); // Store the ID of the task to be deleted
    setShowModal(true); // Show the confirmation modal
  };

  // Function to handle cancellation of the delete action
  const cancelDelete = () => {
    setShowModal(false); // Hide the confirmation modal
    setTaskToDelete(null); // Reset the taskToDelete state
  };

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <section className="container p-4 mx-auto task-list">
      <Header />
      {error && <AlertError message={error} />}{" "}
      {/* Display the AlertError component if there is an error */}
      {tasks.length === 0 ? (
        // Render the "No tasks" message if the tasks array is empty
        <div className="flex flex-col items-center justify-center h-screen">
          <img
            src={noTasksImage}
            alt="No tasks"
            className="w-full mb-4 md:w-1/2 md:h-1/2"
          />
          <p className="text-gray-900 dark:text-gray-200">
            You don&apos;t have any tasks yet.
          </p>
        </div>
      ) : (
        // Render the list of tasks
        <ul className="divide-y divide-gray-900 dark:divide-gray-200">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex flex-wrap items-center justify-between py-4"
            >
              <Link
                to={`/tasks/${task.id}`}
                className="text-lg font-semibold hover:text-blue-600"
              >
                {task.title} {/* Display the task title */}
              </Link>
              <div className="flex items-center gap-2">
                <TaskStatusBadge status={task.status} />{" "}
                {/* Display the task status badge */}
                <button
                  onClick={() => confirmDeleteTask(task.id)} // Show the confirmation modal when the "Delete" button is clicked
                  className="normal-case btn btn-error btn-sm"
                >
                  Delete
                </button>
                <Link
                  to={`/edit-task/${task.id}`} // Link to the edit task page
                  className="normal-case btn btn-info btn-sm"
                >
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* Render the ConfirmationModal component if showModal is true */}
      {showModal && (
        <ConfirmationModal
          title="Confirm Delete"
          message="Are you sure you want to delete this task?"
          onCancel={cancelDelete} // Function to handle cancellation of the delete action
          onConfirm={() => handleDeleteTask(taskToDelete)} // Function to handle confirmation of the delete action
        />
      )}
    </section>
  );
};

export default TaskList;
