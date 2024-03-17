import Button from "./Button";
import { useSpring, animated } from "react-spring";

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
  priority,
}) {
  const priorityToBadgeColor = {
    "High Priority": "text-bg-danger",
    "Medium Priority": "text-bg-warning",
    "Low Priority": "text-bg-info",
    "Normal Priority": "text-bg-primary",
    Optional: "text-bg-light",
  };

  const priorityToBadgeFontWeight = {
    "High Priority": "font-weight-light",
    "Medium Priority": "font-weight-light",
    "Low Priority": "font-weight-light",
    "Normal Priority": "font-weight-light",
    Optional: "font-weight-light",
  };

  const badgeColor = priorityToBadgeColor[priority];
  const badgeFontWeight = priorityToBadgeFontWeight[priority];

  const props = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0)" },
  });

  return (
    <animated.div style={props}>
      <div
        className="cardTask shadow"
        style={{
          backgroundColor: lightMode ? "#F9F6EE" : "#313638",
          color: lightMode ? "#313638" : "white",
          borderRadius: "7px",
        }}
      >
        <div
          className={`card-header shadow position-relative`}
          style={{
            backgroundColor: color,
            color: "white",
            borderRadius: "7px",
            justifyContent: "center",
          }}
        >
          <h6
            id="cardSubject"
            style={{ fontSize: "20px" }}
            className="text-center"
          >
            {subject}{" "}
            <span
              className={`position-absolute top-0 end-0 translate-middle badge rounded-pill ${badgeColor} ${badgeFontWeight}`}
              style={{ fontSize: "10px" }}
            >
              {priority}
            </span>
          </h6>
        </div>
        <div className="card-body">
          <h6 className="card-title text-center">
            {date === "" ? "Undated" : "Due on " + date}
          </h6>
          <hr />
          <p
            className="card-text"
            id="cardDescription"
            style={{ padding: "0 10px" }}
          >
            {description}
          </p>
        </div>
        <div className="row text-center p-2">
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
                icon={<i className="fa-solid fa-link"></i>}
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
    </animated.div>
  );
}
