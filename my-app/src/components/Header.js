export default function Header() {
  return (
    <div className="container text-center" style={{ marginTop: "80px" }}>
      <img src={require("./assets/robot.png")} style={{ maxWidth: "200px" }} />
      <h1
        style={{ fontSize: "70px", fontWeight: "bold" }}
        className="text-primary"
      >
        STEMTask{" "}
      </h1>
      <hr />
      {/* <h4>Developed by Wion M. Quintela</h4> */}
      <p>
        STEMTask is a web-based task management application designed to help
        Senior High School STEM students in CCBHS organize their daily tasks
        efficiently.
      </p>
    </div>
  );
}
