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
      {console.log(userCredentials.length)}
      {userCredentials.length == undefined ? <a href="https://l.messenger.com/l.php?u=https%3A%2F%2Fdocs.google.com%2Fforms%2Fd%2F1EmcD5O_BrzpV6i8Bnb_03sT2e6PqERBVA7FzpMccYMY%2Fedit&h=AT2PsNr_kWq7tiCl4KV5Ee7YEvtK-i9M12xSwcyZv98Rgor32DEha5BrKtSV82pEZ9B-B7zNF4A4AUKfv8IVt4RmLuT_OvYFa4t4lLEwXNGS4p-k1POip9wG9uBIyo4zb_F7Mw" target="_blank">Please Answer this Survey for our Research</a> : ""}
      {userCredentials.length == undefined ? (
        <Button
          name="Start Creating Tasks"
          href="#formsSection"
          color="btn-primary"
        />
      ) : (
        <div><Button name="Get Started" href="/login" color="btn-primary" /></div>
      )}
    </div>
  );
}
