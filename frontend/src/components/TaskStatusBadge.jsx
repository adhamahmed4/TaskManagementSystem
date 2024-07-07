// eslint-disable-next-line react/prop-types
const TaskStatusBadge = ({ status }) => {
  let badgeColor;
  let badgeText;

  switch (status) {
    case "Pending":
      badgeColor = "badge-warning";
      badgeText = "Pending";
      break;
    case "In Progress":
      badgeColor = "badge-info";
      badgeText = "In Progress";
      break;
    case "Completed":
      badgeColor = "badge-success";
      badgeText = "Completed";
      break;
    default:
      badgeColor = "badge-ghost";
      badgeText = "Unknown";
  }

  return <span className={`badge ${badgeColor} badge-sm`}>{badgeText}</span>;
};

export default TaskStatusBadge;
