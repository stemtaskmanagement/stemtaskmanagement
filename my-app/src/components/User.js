import { signOut } from "firebase/auth";
import Button from "./Button";
import { useState } from "react";

export default function User({ userCredentials, auth, lightMode }) {
  const [showModalNoUser, setShowModalNoUser] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const emptyMessage = "Please log in to view this content";
  function handleSignOut() {
    signOut(auth)
      .then(() => {
        if (userCredentials == "") {
          setShowModalNoUser(true);
          console.log("there was no user in the first place ");
        } else {
          setShowModal(true);
          console.log("User signed out successfully.");
        }
        // Redirect the user to the login page or perform other actions after sign out
      })
      .catch((error) => {
        console.error("Error signing out user:", error.message);
      });
  }
  return (
    <div
      style={{
        backgroundColor: lightMode ? "#F9F6EE" : "#313638",
        color: lightMode ? "#313638" : "white",
      }}
    >
      {showModal && (
        <div
          className="modal"
          style={{
            display: "block",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="modal-dialog">
            <div
              className="modal-content"
              style={{
                backgroundColor: lightMode ? "#F9F6EE" : "#313638",
                color: lightMode ? "#313638" : "white",
              }}
            >
              <div className="modal-header">
                <h5 className="modal-title">Successful</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>User has signed out</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger text-white"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModalNoUser && (
        <div
          className="modal"
          style={{
            display: "block",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="modal-dialog">
            <div
              className="modal-content"
              style={{
                backgroundColor: lightMode ? "#F9F6EE" : "#313638",
                color: lightMode ? "#313638" : "white",
              }}
            >
              <div className="modal-header">
                <h5 className="modal-title">Warning</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModalNoUser(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>There was no user log in at all.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger text-white"
                  onClick={() => setShowModalNoUser(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
