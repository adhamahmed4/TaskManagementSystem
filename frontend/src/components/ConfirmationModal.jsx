// eslint-disable-next-line react/prop-types
const ConfirmationModal = ({ title, message, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-full max-w-md p-4 mx-auto rounded-lg shadow-md bg-gray-50 dark:bg-gray-800">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="my-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="btn btn-primary">
            No
          </button>
          <button onClick={onConfirm} className="btn btn-error">
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
