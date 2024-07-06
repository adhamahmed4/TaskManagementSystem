import useTaskForm from "../hooks/useTaskForm";
import AlertError from "./AlertError";
import AlertSuccess from "./AlertSuccess";

const initialTaskState = {
  title: "",
  description: "",
  status: "Pending",
};

const EditTask = () => {
  const { task, error, success, handleChange, handleSubmit } =
    useTaskForm(initialTaskState);

  return (
    <section className="flex items-center justify-center h-screen bg-gray-100 edit-task dark:bg-gray-900">
      <div className="w-full max-w-md px-8 pt-6 pb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="mb-6 text-2xl font-bold text-center">Edit Task</h1>
        {error && <AlertError message={error} />}
        {success && <AlertSuccess message={success} />}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={task.title}
              onChange={handleChange}
              required
              className="w-full input input-bordered"
            />
          </div>
          <div className="mb-4">
            <textarea
              name="description"
              placeholder="Description"
              value={task.description}
              onChange={handleChange}
              className="w-full textarea textarea-bordered"
            />
          </div>
          <div className="mb-4">
            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              className="w-full select select-bordered"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button type="submit" className="w-full btn btn-primary">
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditTask;
