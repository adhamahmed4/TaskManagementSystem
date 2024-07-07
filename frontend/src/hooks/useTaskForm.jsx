import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTask, updateTask } from "../services/apiService";

const useTaskForm = (initialState) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const fetchedTask = await getTask(id);
        setTask(fetchedTask);
      } catch (error) {
        console.error("Error fetching task:", error);
        setError("Failed to fetch task details. Please try again.");
      }
    };

    fetchTaskData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(id, task);
      setSuccess("Task updated successfully.");
      setTimeout(() => {
        navigate("/tasks");
      }, 2000);
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Failed to update task. Please try again.");
    }
  };

  return {
    task,
    error,
    success,
    handleChange,
    handleSubmit,
  };
};

export default useTaskForm;
