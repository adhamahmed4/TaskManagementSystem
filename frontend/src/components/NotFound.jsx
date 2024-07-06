// eslint-disable-next-line react/prop-types
const NotFound = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default NotFound;
