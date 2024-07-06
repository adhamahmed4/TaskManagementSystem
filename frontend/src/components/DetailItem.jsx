// eslint-disable-next-line react/prop-types
const DetailItem = ({ label, value }) => (
  <div>
    <span className="font-bold">{label}:</span>
    <span className="ml-2">{value}</span>
  </div>
);

export default DetailItem;
