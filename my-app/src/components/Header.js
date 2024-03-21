import Button from "./Button";

export default function Header({ userCredentials }) {
  console.log("userCredentials:", userCredentials); // Add this line to check the value of userCredentials

  return (
    <div className="container text-center">
      <img
        src={require("./assets/robot.png")}
        className="img-fluid"
        style={{ maxWidth: "200px", minWidth: "100px" }}
        draggable="false"
      />

      <h1
        style={{ fontSize: "65px", fontWeight: "bold" }}
        className="text-primary"
      >
        STEMTask
      </h1>
      <h3 style={{ paddingBottom: "25px" }}>
        A Task Management Web App for Grade 11 STEM Students
      </h3>
      {userCredentials.length == undefined ? (
        <Button
          name="Start Creating Tasks"
          href="#formsSection"
          color="btn-primary"
        />
      ) : (
        <Button name="Log in" href="/login" color="btn-primary" />
      )}
    </div>
  );
}
