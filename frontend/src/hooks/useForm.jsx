import { useState } from "react";
// import axios from "axios";

const useForm = (initialState, onSubmit) => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      setFormData(initialState);
      setSuccess("Task created successfully.");
    } catch (error) {
      setError("An error occurred while creating the task. Please try again.");
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    error,
    success,
  };
};

export default useForm;
