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
      className="card shadow text-center"
      style={{
        backgroundColor: lightMode ? "#F9F6EE" : "#313638",
        color: lightMode ? "#313638" : "white",
      }}
    >
      <div
        className={`card-header`}
        style={{
          backgroundColor: color,
          color: "white",
          borderRadius: "7px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <h6 id="cardSubject">{subject}</h6>
      </div>
      <div className="card-body">
        <h5 className="card-title">
          <i class="fa-regular fa-calendar-days"></i>:{" "}
          {date === "Invalid Date" ? "Undated" : date}
        </h5>
        <p className="card-text" id="cardDescription">
          {description}
        </p>

        <div className="row">
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
    </div>
  );
}
