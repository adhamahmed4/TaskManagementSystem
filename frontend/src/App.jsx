import { Route, Routes } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails";
import CreateTask from "./components/CreateTask";
import EditTask from "./components/EditTask";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/edit-task/:id" element={<EditTask />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </main>
  );
}

export default App;
