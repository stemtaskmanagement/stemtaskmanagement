import { signOut } from "firebase/auth";
import Button from "./Button";

export default function User({ userCredentials, auth }) {
  const emptyMessage = "Please log in to view this content";
  function handleSignOut() {
    signOut(auth)
      .then(() => {
        if (userCredentials == "") {
          console.log("there was no user in the first place ");
          console.log("User signed out successfully.");
        } else {
          console.log("User signed out successfully.");
        }
        // Redirect the user to the login page or perform other actions after sign out
      })
      .catch((error) => {
        console.error("Error signing out user:", error.message);
      });
  }
  return (
    <div>
      <h1>User Account</h1>
      <h3>
        User Id: {userCredentials == "" ? emptyMessage : userCredentials.uid}
      </h3>
      <h3>
        User Email:{" "}
        {userCredentials == "" ? emptyMessage : userCredentials.email}
      </h3>
      {console.log("userCredentials:" + userCredentials)}
      <Button onClick={handleSignOut} name="Sign out" color="btn-danger" />
    </div>
  );
}
