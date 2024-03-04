import Button from "./Button";

export default function Header() {
  return (
    <div className="container text-center">
      <img
        src={require("./assets/robot.png")}
        style={{ maxWidth: "300px" }}
        draggable="false"
      />
      <h1
        style={{ fontSize: "65px", fontWeight: "bold" }}
        className="text-primary wow animate__animated animate__fadeIn"
      >
        STEMTask
      </h1>
      <h3 style={{ paddingBottom: "25px" }}>
        A Task Management Web App for Grade 11 STEM Students
      </h3>
      {/* <hr />
      <p>
        STEMTask is a web-based task management application designed to help
        Senior High School STEM students in CCBHS organize their daily tasks
        efficiently.
      </p> */}
      <Button name="Get Started" href="#formsSection" color="btn-primary" />
    </div>
  );
}
