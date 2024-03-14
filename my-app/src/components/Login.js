import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../firebase/config";
import Button from "./Button";
import Modal from "./Modal";

export default function Login({
  logInType,
  setIsLogInType,
  userCredentials,
  setUserCredentials,
  error,
  setError,
  auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  lightMode,
  onClick,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const termsAndConditions = (
    <div>
      <h1>Terms and Conditions for STEMTASK Task Management Web App</h1>
      <p>
        Welcome <strong>{email}</strong> to STEMTASK! By accessing or using our
        task management web app, you agree to be bound by these terms. If you do
        not agree, you may not access or use our web app.
      </p>
      <p>
        Your privacy and the security of your data are important to us. We are
        committed to being transparent about how your data is collected, used,
        and protected.
      </p>
      <p>By using STEMTASK, you acknowledge and consent to the following:</p>
      <ol>
        <li>By using STEMTASK, you agree to these Terms and Conditions.</li>
        <li>These Terms and Conditions apply to all users of STEMTASK.</li>
        <li>
          Users must provide accurate information when creating an account and
          maintain the security of their account credentials.
        </li>
        <li>
          Users are responsible for the content they create, upload, or share.
        </li>
        <li>
          Users must not engage in prohibited conduct while using STEMTASK,
          including violating others' rights and interfering with the operation
          of STEMTASK.
        </li>
        <li>
          Developers may have access to users' task data solely for improving
          and maintaining the service.
        </li>
        <li>
          We reserve the right to terminate or suspend access to STEMTASK at any
          time.
        </li>
        <li>
          We may update these Terms and Conditions from time to time without
          notice.
        </li>
        <li>
          If you have any questions or concerns, please contact us at{" "}
          <a href="mailto:stemtaskmanagement@gmail.com">
            stemtaskmanagement@gmail.com
          </a>
          .
        </li>
      </ol>
      <p>
        By accessing or using STEMTASK, you acknowledge that you have read,
        understood, and agreed to these Terms and Conditions. Thank you for
        using our task management web app!
      </p>
    </div>
  );
  const errorMessages = {
    "auth/user-not-found":
      "User not found. Please check your email or sign up for an account.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/email-already-in-use":
      "Email is already in use. Please use a different email or log in with your existing account.",
    "auth/weak-password":
      "Password is too weak. Please use a stronger password.",
    "auth/invalid-email":
      "Invalid email format. Please enter a valid email address.",
    "auth/network-request-failed":
      "Network error. Please check your internet connection and try again.",
    // Add more error messages as needed
  };

  // useEffect(() => {
  //   // Reset input fields when logInType changes
  //   setEmail("");
  //   setPassword("");
  // }, [logInType]);

  const navigate = useNavigate(); // Initialize useNavigate hook

  //changes the UI to sign up page
  function changeToSignUp() {
    setIsLogInType("signup");
    setEmail("");
    setPassword("");
  }
  //changes the UI to log in page
  function changeToLogIn() {
    setIsLogInType("login");
    setEmail("");
    setPassword("");
  }

  function handleSignUp(e) {
    e.preventDefault();
    setError("");
    const auth = getAuth(); // Initialize Firebase Authentication
    const db = getDatabase(app); // Assuming you have initialized your Realtime Database

    // Create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        // Log the user object after updating profile
        console.log("User after updating profile:", user);

        // Create a user profile entry in Realtime Database
        const usersRef = ref(db, "users/" + user.uid);
        await set(usersRef, {
          email: email,
        });

        // Update userCredentials state
        setUserCredentials(user);
        console.log("Successful signup: " + user.email);
        setShowModal(true);
      })
      .catch((error) => {
        setError(
          errorMessages[error.code] ||
            "An error occurred. Please try again later."
        );
      });
  }

  function handleLogIn(e) {
    e.preventDefault();
    setError("");
    const auth = getAuth(); // Initialize Firebase Authentication
    const db = getDatabase(app); // Assuming you have initialized your Realtime Database

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successfully signed in
        const user = userCredential.user;
        setUserCredentials(user); // Update userCredentials with the signed in user
        navigate("/"); // Redirect to home after successful login
        console.log("successful login:" + user.email);
      })
      .catch((error) => {
        setError(
          errorMessages[error.code] ||
            "An error occurred. Please try again later."
        );
      });
  }

  // Function to toggle password visibility
  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  //handles the password reset
  function handlePasswordReset() {
    const email = prompt("Please enter your email");
    sendPasswordResetEmail(auth, email);
    alert("email sent! check your inbox for password reset instruction");
  }

  return (
    <div>
      <div>
        {/* */}
        <nav
          className="navbar navbar-expand-lg"
          style={{
            backgroundColor: lightMode ? "#E4E3E0" : "#313638",
          }}
        >
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <a className="navbar-brand text-primary" href="/">
                STEMTask
              </a>
              <ul
                className="navbar-nav ms-auto"
                style={{
                  listStyleType: "none",
                  display: "flex",
                }}
              >
                <li>
                  <Button
                    icon={
                      lightMode ? (
                        <i className="fa-solid fa-moon"></i>
                      ) : (
                        <i className="fa-solid fa-sun"></i>
                      )
                    }
                    onClick={onClick}
                    color="btn-primary"
                  />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div
        style={{
          fontSmooth: "always",
          overflow: "hidden",
          backgroundColor: lightMode ? "#EEEEEE" : "#28282B",
          color: lightMode ? "#28282B" : "#EEEEEE",
          paddingTop: "100px",
          paddingBottom: "200px",
        }}
      >
        {showModal && (
          <Modal
            lightMode={lightMode}
            modalTitle="Terms and Conditions"
            modalDescription={termsAndConditions}
            setShowModal={setShowModal}
            text="I agree with the terms and conditions."
            color="btn-success"
            navigation="/"
            id="Terms"
          />
        )}
        <div className="text-center">
          <h3>Welcome to</h3>
          <h1
            style={{ fontSize: "75px", fontWeight: "bold" }}
            className="text-primary"
          >
            STEMTask
          </h1>

          <form
            className="loginCard container"
            style={{
              backgroundColor: lightMode ? "#E4E3E0" : "#313638",
              color: lightMode ? "#313638" : "white",
            }}
          >
            <h1> {logInType === "login" ? "Log In" : "Create an Account"}</h1>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                style={{
                  backgroundColor: lightMode ? "#EEEEEE" : "#28282B",
                  color: lightMode ? "#313638" : "#F9F6EE",
                  border: lightMode ? "2px solid #e0ddd5" : "2px solid #313638",
                }}
              />
              <div
                id="emailHelp"
                className="form-text"
                style={{ color: lightMode ? "#313638" : "#F9F6EE" }}
              >
                We'll never share your email with anyone else.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                style={{
                  backgroundColor: lightMode ? "#EEEEEE" : "#28282B",
                  color: lightMode ? "#313638" : "#F9F6EE",
                  border: lightMode ? "2px solid #e0ddd5" : "2px solid #313638",
                }}
              />
              <button
                // className="btn btn-outline-secondary"
                type="button"
                onClick={() => togglePasswordVisibility()} // Toggle password visibility on button click
              >
                {showPassword ? "Hide" : "Show"}{" "}
                {/* Change button label based on password visibility */}
                {showPassword ? (
                  <i class="fa-regular fa-eye-slash"></i>
                ) : (
                  <i class="fa-regular fa-eye"></i>
                )}
              </button>
            </div>
            {/*submit the forms */}
            {logInType === "login" ? (
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  handleLogIn(e);
                }}
              >
                {/* <Link to={link}>Login</Link> */}
                Login
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  handleSignUp(e);
                }}
              >
                {/* <Link to={link}>Sign up</Link> */}
                Signup
              </button>
            )}
            {error && (
              <div className="error" style={{ color: "red" }}>
                {error}
              </div>
            )}
          </form>
          {/*change the form type */}
          {logInType === "login" ? (
            <button
              onClick={changeToSignUp}
              className="text-white btn btn-success m-1"
            >
              Create an Account
            </button>
          ) : (
            <button
              onClick={changeToLogIn}
              className="text-white btn btn-success m-1"
            >
              Already have an Account?
            </button>
          )}
          {logInType == "login" && (
            <button
              onClick={handlePasswordReset}
              className="text-white btn btn-danger m-1"
            >
              Forgot Password?
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
