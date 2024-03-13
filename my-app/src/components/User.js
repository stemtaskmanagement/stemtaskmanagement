import { signOut } from "firebase/auth";
import Button from "./Button";
import { useState } from "react";
import Modal from "./Modal";
import { set, ref, getDatabase, remove } from "firebase/database";
import { deleteUser } from "firebase/auth";
import { app } from "../firebase/config";

export default function User({ userCredentials, auth, lightMode, task }) {
  const [showModal, setShowModal] = useState(false);
  const [deletedAccount, setDeletedAccount] = useState(false);

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

  //deletes user from database

  function handleDeleteAccount() {
    if (window.confirm("Are you sure you want to delete your account?")) {
      // Delete user from Firebase Realtime Database
      let db = getDatabase(app);
      const dbRef = ref(db, "users/" + userCredentials.uid);
      remove(dbRef)
        .then(() => {
          console.log("User data removed from Realtime Database.");
        })
        .catch((error) => {
          console.error("Error removing user data:", error.message);
        });

      // Delete user from Firebase Authentication
      deleteUser(auth.currentUser)
        .then(() => {
          console.log("User deleted from Firebase Authentication.");
          setDeletedAccount(true); // Show modal or perform other actions
        })
        .catch((error) => {
          console.error("Error deleting user:", error.message);
        });
    }
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
      {deletedAccount && (
        <Modal
          lightMode={lightMode}
          modalTitle="Success"
          modalDescription="Your account has been deleted from our servers"
          setShowModal={setDeletedAccount}
        />
      )}
      <h1
        style={{
          fontSize: "65px",
          fontWeight: "bold",
          paddingBottom: "40px",
        }}
      >
        User Profile
      </h1>
      {/* <h3>Username: {userCredentials.displayName}</h3> */}
      {/* <h3>
        User Id: {userCredentials == "" ? emptyMessage : userCredentials.uid}
      </h3> */}
      <h3>
        User Email:{" "}
        {userCredentials == "" ? emptyMessage : userCredentials.email}
      </h3>
      <h3>
        Number of Task: {userCredentials == "" ? emptyMessage : task.length}
      </h3>
      {userCredentials == "" ? (
        <Button name="Sign in" color="btn-success" href="/login" />
      ) : (
        <div style={{ maxWidth: "400px" }}>
          <div className="row">
            <div className="col " style={{ maxWidth: "120px" }}>
              <Button
                onClick={handleSignOut}
                name="Sign out"
                color="btn-secondary"
              />
            </div>
            <div className="col " style={{ maxWidth: "180px" }}>
              {" "}
              <Button
                onClick={handleDeleteAccount}
                name="Delete Account"
                color="btn-danger"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
