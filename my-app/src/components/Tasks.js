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
  file,
}) {
  const renderFileContent = () => {
    // Assuming 'file' is a URL or data representing the file
    if (file) {
      // Check the file type and conditionally render content
      // Here, we are assuming it's an image, you can adjust accordingly

      if (
        file.endsWith(".png") ||
        file.endsWith(".jpg") ||
        file.endsWith(".jpeg")
      ) {
        return <img src={file} alt="File" width="100%" />;
      } else if (file.endsWith(".pdf")) {
        return (
          <embed
            src={file}
            type="application/pdf"
            width="100%"
            height="600px"
          />
        );
      } else {
        // You can handle other file types here
        return <p>Unsupported file type</p>;
      }
    } else {
      return null; // No file to display
    }
  };

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
        {/* FILE */}
        <div>{renderFileContent()}</div>

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
