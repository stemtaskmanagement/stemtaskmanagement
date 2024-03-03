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
  link,
}) {
  return (
    <div
      className="cardTask shadow"
      style={{
        backgroundColor: lightMode ? "#F9F6EE" : "#313638",
        color: lightMode ? "#313638" : "white",
      }}
    >
      <div
        className={`card-header shadow`}
        style={{
          backgroundColor: color,
          color: "white",
          borderRadius: "7px",
          justifyContent: "center",
        }}
      >
        {" "}
        <h6
          id="cardSubject"
          style={{ fontSize: "20px" }}
          className="text-center"
        >
          {subject}
        </h6>
      </div>
      <div className="card-body">
        <h6 className="card-title text-center">
          {/* <i class="fa-regular fa-calendar-days"></i>:{" "} */}
          {date === "Invalid Date" ? "Undated" : "Due on " + date}
        </h6>
        <hr />
        <p
          className="card-text"
          id="cardDescription"
          style={{
            // textAlign: "justify",
            padding: "0 10px",
            // Adjust padding here
          }}
          onClick={() => alert("success")}
        >
          {description}
        </p>
      </div>
      <div className="row text-center">
        <div className="col" style={{ marginLeft: "10px" }}>
          <Button
            icon={<i className="fa-solid fa-check"></i>}
            onClick={onDelete}
            color="btn-primary"
          />
        </div>
        {link && (
          <div className="col" style={{ marginLeft: "10px" }}>
            <Button
              link={link}
              icon={<i class="fa-solid fa-link"></i>}
              color="btn-success"
            />
          </div>
        )}
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
  );
}
