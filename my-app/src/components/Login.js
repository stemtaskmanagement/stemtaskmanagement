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
        Welcome, <strong>{userCredentials.email}</strong> to STEMTASK! Before
        you start using our task management web app, please read these Terms and
        Conditions carefully. By accessing or using STEMTASK, you agree to be
        bound by these terms. If you do not agree with any part of these terms,
        you may not access or use our web app.
      </p>
      <ol>
        <li>
          <p>
            By accessing or using STEMTASK, including but not limited to
            browsing our website, creating an account, or using any features
            provided by our web app, you agree to these Terms and Conditions.
          </p>
        </li>
        <li>
          <p>
            These Terms and Conditions apply to all users of STEMTASK, including
            grade 11 STEM students and any other individuals or entities
            accessing or using our web app.
          </p>
        </li>
        <li>
          <p>
            Users must provide accurate and complete information when creating
            an account on STEMTASK. It is the user's responsibility to maintain
            the security of their account credentials and to promptly notify us
            of any unauthorized use of their account.
          </p>
        </li>
        <li>
          <p>
            Users are solely responsible for the content they create, upload, or
            share on STEMTASK. Users must not upload or share any content that
            violates the rights of others, including copyright, trademark,
            privacy, or publicity rights.
          </p>
        </li>
        <li>
          <p>
            Users must not engage in any conduct that violates these Terms and
            Conditions or applicable laws and regulations while using STEMTASK.
            Prohibited conduct includes, but is not limited to:
          </p>
          <ul>
            <li>
              {" "}
              Violating the rights of others, including intellectual property
              rights.
            </li>
            <li>
              Uploading or sharing any content that is unlawful, defamatory,
              obscene, or otherwise objectionable.
            </li>
            <li>
              Interfering with or disrupting the operation of STEMTASK or its
              servers.
            </li>
            <li>
              Accessing or attempting to access accounts, data, or systems
              without authorization.
            </li>
            <li>
              Engaging in any activity that could harm, damage, or impair
              STEMTASK or its users.
            </li>
          </ul>
        </li>
        <li>
          <p>
            We reserve the right to terminate or suspend access to STEMTASK at
            any time and for any reason without prior notice. In case of
            termination, these Terms and Conditions will continue to apply to
            any previous use of our web app.
          </p>
        </li>
        <li>
          <p>
            We may update or modify these Terms and Conditions from time to time
            without prior notice. Users are encouraged to review these terms
            periodically for any changes. Continued use of STEMTASK after any
            modifications indicates acceptance of the updated terms.
          </p>
        </li>
        <li>
          <p>
            If you have any questions or concerns about these Terms and
            Conditions, please contact us at stemtaskmanagement@gmail.com.
          </p>
        </li>
      </ol>
      <p>
        By accessing or using STEMTASK, you acknowledge that you have read,
        understood, and agreed to these Terms and Conditions. Thank you for
        using our task management web app!
      </p>
    </div>
  );

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
    setShowModal(true);
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
      })
      .catch((error) => {
        setError(error.message);
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
        setError(error.message);
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
        className="text-center"
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
        <h3>Welcome to</h3>
        <h1
          style={{ fontSize: "75px", fontWeight: "bold" }}
          className="text-primary"
        >
          STEMTask
        </h1>
        <form
          className="card"
          style={{
            backgroundColor: lightMode ? "#E4E3E0" : "#313638",
            color: lightMode ? "#313638" : "white",
          }}
        >
          <h1> {logInType === "login" ? "Log In" : "Sign Up"}</h1>
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
          <button onClick={changeToSignUp}>Create an Account</button>
        ) : (
          <button onClick={changeToLogIn}>Log In</button>
        )}
        {logInType == "login" && (
          <button onClick={handlePasswordReset}>Forgot Password?</button>
        )}
      </div>
    </div>
  );
}
