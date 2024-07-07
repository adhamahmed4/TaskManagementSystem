import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getTask = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/api/tasks/${id}`, {
    headers: { "x-access-token": token },
  });
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const token = localStorage.getItem("token");
  await axios.put(`${API_URL}/api/tasks/${id}`, taskData, {
    headers: { "x-access-token": token },
  });
};
