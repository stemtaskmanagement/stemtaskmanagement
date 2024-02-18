import Button from "./Button";

export default function Tasks({
  description,
  id,
  status,
  subject,
  date,
  onDelete,
  onEdit,
}) {
  return (
    <div className="card shadow">
      <div className="card-header bg-info-subtle">Subject: {subject}</div>
      <div className="card-body">
        <h5 className="card-title">
          Deadline: {date === "Invalid Date" ? "Undated" : date}
        </h5>
        <p className="card-text">Description: {description}</p>
        <div className="row">
          <div className="col">
            <Button
              icon={<i className="fa-solid fa-check"></i>}
              onClick={onDelete}
            />
          </div>
          <div className="col" style={{ marginLeft: "10px" }}>
            <Button
              icon={<i className="fa-solid fa-pen-to-square"></i>}
              onClick={onEdit}
              href="#"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
