import Button from "./Button";

export default function Tasks({
  description,
  id,
  status,
  subject,
  date,
  onDelete,
  onEdit,
  color,
  lightMode,
}) {
  return (
    <div
      className="card shadow"
      style={{
        backgroundColor: lightMode ? "#F9F6EE" : "#313638",
        color: lightMode ? "black" : "white",
      }}
    >
      <div
        className={`card-header`}
        style={{
          backgroundColor: color,
          color: "white",
          // WebkitTextStroke: "0.01px black", // for Safari
          // textStroke: "0.01px black", // for other browsers
        }}
      >
        {" "}
        Subject: {subject}
      </div>
      <div className="card-body">
        <h5 className="card-title">
          Deadline: {date === "Invalid Date" ? "Undated" : date}
        </h5>
        <p className="card-text" id="cardDescription">
          {description}
        </p>
        <div className="row">
          <div className="col">
            <Button
              icon={<i className="fa-solid fa-check"></i>}
              onClick={onDelete}
              color="btn-primary"
            />
          </div>
          <div className="col" style={{ marginLeft: "10px" }}>
            <Button
              icon={<i className="fa-solid fa-pen-to-square"></i>}
              onClick={onEdit}
              href="#formsSection"
              color="btn-danger"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
