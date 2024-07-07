// eslint-disable-next-line react/prop-types
const AlertSuccess = ({ message }) => (
  <div role="alert" className="alert alert-success">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 stroke-current shrink-0"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <span>{message}</span>
  </div>
);

export default AlertSuccess;
