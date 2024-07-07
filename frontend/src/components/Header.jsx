// Import the Link component from the react-router-dom library
import { Link } from "react-router-dom";

// Define a functional component called Header
function Header() {
  return (
    // This is the header element with some CSS classes applied
    <header className="flex items-center justify-between mb-4 header">
      {/* This is the main heading for the page */}
      <h1 className="text-2xl font-bold">Task List</h1>

      {/* This is a Link component that renders a link to the "/create-task" route */}
      <div className="flex items-center gap-1 md:gap-4 links">
        <Link to="/create-task" className="normal-case btn btn-primary btn-sm">
          Create Task
        </Link>
        <Link to="/" className="normal-case btn btn-error btn-sm">
          Logout
        </Link>
      </div>
    </header>
  );
}

// Export the Header component so it can be imported and used in other parts of the application
export default Header;
