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
}) {
  //changes the UI to sign up page
  function changeToSignUp() {
    setIsLogInType("signup");
  }
  //changes the UI to log in page
  function changeToLogIn() {
    setIsLogInType("login");
  }

  //add the state of users
  function handleCredentials(e) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
    // console.log(userCredentials);
  }

  //handles the sign up and create user data
  function handleSignUp(e) {
    e.preventDefault();
    setError("");
    createUserWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    )
      .then((userCredentials) => {
        // Signed up
        const user = userCredentials.user;
        console.log(user);
        console.log("successful signup");
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  //sign in or log in with user data
  function handleLogIn(e) {
    e.preventDefault();
    setError("");
    signInWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    )
      .then((userCredentials) => {
        // Signed in
        const user = userCredentials.user;
        console.log("successful login");
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
    <div className="text-center container" style={{ paddingTop: "100px" }}>
      <h3>Welcome to</h3>
      <h1
        style={{ fontSize: "75px", fontWeight: "bold" }}
        className="text-primary"
      >
        STEMTask
      </h1>
      <form className="card">
        <h1> {logInType == "login" ? "Log In" : "Sign Up"}</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => {
              handleCredentials(e);
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
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => {
              handleCredentials(e);
            }}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        {/*submit the forms */}
        {logInType == "login" ? (
          <button
            onClick={(e) => {
              handleLogIn(e);
            }}
          >
            Log In
          </button>
        ) : (
          <button
            onClick={(e) => {
              handleSignUp(e);
            }}
          >
            Sign Up
          </button>
        )}
        {error && (
          <div className="error" style={{ color: "red" }}>
            {error}
          </div>
        )}
      </form>
      {/*change the form type */}
      {logInType == "login" ? (
        <button onClick={changeToSignUp}>Sign Up</button>
      ) : (
        <button onClick={changeToLogIn}>Log In</button>
      )}
      <button onClick={handlePasswordReset}>Forgot Password?</button>
    </div>
  );
}
