import { signOut } from "firebase/auth";
import Button from "./Button";
import { useState } from "react";
import Modal from "./Modal";
import { set } from "firebase/database";

export default function User({ userCredentials, auth, lightMode, task }) {
  const [showModal, setShowModal] = useState(false);

  const emptyMessage = "Please log in to view this content";
  function handleSignOut() {
    signOut(auth)
      .then(() => {
        setShowModal(true);
        console.log("User signed out successfully.");
        // Redirect the user to the login page or perform other actions after sign out
      })
      .catch((error) => {
        console.error("Error signing out user:", error.message);
      });
  }
  return (
    <div>
      {showModal && (
        <Modal
          lightMode={lightMode}
          modalTitle="Success"
          modalDescription="You have been logged out"
          setShowModal={setShowModal}
        />
      )}
      <h1>User Profile</h1>
      {/* <h3>Username: {userCredentials.displayName}</h3> */}
      <h3>
        User Id: {userCredentials == "" ? emptyMessage : userCredentials.uid}
      </h3>
      <h3>
        User Email:{" "}
        {userCredentials == "" ? emptyMessage : userCredentials.email}
      </h3>
      <h3>Number of Task: {task.length}</h3>
      {userCredentials == "" ? (
        <Button name="Sign in" color="btn-success" href="/login" />
      ) : (
        <Button onClick={handleSignOut} name="Sign out" color="btn-danger" />
      )}
    </div>
  );
}
