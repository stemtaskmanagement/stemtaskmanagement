import { Link, useNavigate } from "react-router-dom";
import { writeUserData } from "../firebase/config";
import { useState, useEffect } from "react";

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
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  //add the state of users
  // function handleCredentials(e) {
  //   setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  //   // console.log(userCredentials);
  // }

  //handles the sign up and create user data
  function handleSignUp(e) {
    e.preventDefault();
    setError("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        // Signed up
        const user = userCredentials.user;
        console.log(user);
        console.log("successful signup: " + user.uid);
        navigate("/"); // Redirect to home after successful signup
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  //sign in or log in with user data
  function handleLogIn(e) {
    e.preventDefault();
    setError("");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        // Signed in
        const user = userCredentials.user;
        console.log("successful login: " + user.email);
        navigate("/"); // Redirect to home after successful signup
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  //handles the password reset
  function handlePasswordReset() {
    const email = prompt("Please enter your email");
    sendPasswordResetEmail(auth, email);
    alert("email sent! check your inbox for password reset instruction");
  }

  return (
    <div
      className="text-center"
      style={{
        backgroundColor: lightMode ? "#F9F6EE" : "#313638",
        border: lightMode ? "2px solid #F9F6EE" : "2px solid #313638",
        color: lightMode ? "#313638" : "#F9F6EE",
        paddingTop: "100px",
        paddingBottom: "200px",
      }}
    >
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
          backgroundColor: lightMode ? "#F9F6EE" : "#313638",
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
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        {/* <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Username
          </label>
          <input
            name="username"
            type="text"
            className="form-control"
            onChange={(e) => {
              handleCredentials(e);
            }}
          />
        </div> */}
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            value={password}
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {/*submit the forms */}
        {logInType === "login" ? (
          <button
            className="btn-primary"
            onClick={(e) => {
              handleLogIn(e);
            }}
          >
            {/* <Link to={link}>Login</Link> */}
            Login
          </button>
        ) : (
          <button
            className="btn-primary"
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
        <button onClick={changeToSignUp}>Sign Up</button>
      ) : (
        <button onClick={changeToLogIn}>Log In</button>
      )}
      <button onClick={handlePasswordReset}>Forgot Password?</button>
    </div>
  );
}
