import Navbar from "./components/Navbar";
import User from "./components/User";
import Header from "./components/Header";
import Forms from "./components/Forms";
import Tasks from "./components/Tasks";
import { useState } from "react";
import { useEffect } from "react";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Button from "./components/Button";
import Login from "./components/Login";
import Notifications from "./components/Notifications";
//firebase
import { auth } from "./firebase/config";
import { getDatabase, ref, child, get, remove } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
//firebase rt database
import { writeUserData } from "./firebase/config";

function App() {
  //user states
  const [logInType, setIsLogInType] = useState("login");
  const [userCredentials, setUserCredentials] = useState(null);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);

  //naglalagay tayo ng default state ng inputs
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#04a4b0");
  const [date, setDate] = useState("");
  const [isEditTask, setIsEditTask] = useState(null);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [showList, setShowList] = useState(true);
  const [lightMode, setLightMode] = useState(true);
  const [link, setLink] = useState("");
  const [showModal, setShowModal] = useState(false);

  //this is the template for tasks and when the forms is inserted this changes the attributes to whatever the input was

  const [task, setTask] = useState([
    //display empty as a default
  ]);

  useEffect(() => {
    const database = getDatabase();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserCredentials(user);
        console.log("User credentials set:", user); // Add this line to check user credentials
        const userTasksRef = ref(database, `tasks/${user.uid}`);
        try {
          const snapshot = await get(userTasksRef);
          if (snapshot.exists()) {
            const userTasks = Object.values(snapshot.val());
            setTask(userTasks);
            localStorage.setItem("userTasks", JSON.stringify(userTasks));
          } else {
            setTask([]);
            localStorage.removeItem("userTasks");
          }
        } catch (error) {
          console.error("Error fetching user tasks:", error.message);
        }
      } else {
        setUserCredentials(null);
        setTask([]);
        localStorage.removeItem("userTasks");
      }
    });

    const storedTasks = JSON.parse(localStorage.getItem("userTasks"));
    if (storedTasks !== null) {
      setTask(storedTasks);
    }

    return () => unsubscribe();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description || !subject) {
      // alert("please input all fields");
      setShowModal(true);
      console.log("");
    } else if (description && toggleSubmit) {
      //scroll down to task after clicking add new task
      document
        .getElementById("taskSection")
        .scrollIntoView({ behavior: "smooth" });
      // Check if it's a new task
      const allInputData = {
        id: new Date().getTime().toString(),
        description: description,
        subject: subject,
        date: formatDate(date),
        color: color,
        link: link,
      };
      writeUserData(
        userCredentials,
        new Date().getTime().toString(),
        subject,
        color,
        description,
        date
      );
      setTask([allInputData, ...task]); // Add new task to the list
      setDescription(""); // Clear input fields after submission
      setSubject("");
      setDate("");
      setColor("#04a4b0");
      setLink("");
      // setFile("");
    } else if (description && subject && !toggleSubmit) {
      //scroll down to task after clicking add new task
      document
        .getElementById("taskSection")
        .scrollIntoView({ behavior: "smooth" });
      // Check if it's an edited task
      setTask(
        task.map((item) => {
          if (item.id === isEditTask) {
            return {
              ...item,
              subject: subject,
              description: description,
              date: formatDate(date),
              color: color,
              link: link,
            };
          }
          return item;
        })
      );
      setToggleSubmit(true); // Reset toggleSubmit to true after editing
      setIsEditTask(null); // Reset isEditTask to null after editing
      setDescription(""); // Clear input fields after submission
      setSubject("");
      setDate("");
      setColor("#04a4b0");
      setLink("");
    }
  }

  //date formatter
  function formatDate(dateString) {
    const dateObj = new Date(dateString);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return dateObj.toLocaleDateString("en-US", options);
  }

  //delete functionality
  function handleDelete(id) {
    const updatedTasks = task.filter((item) => item.id !== id);
    setTask(updatedTasks); // Update the state to remove the task from UI

    // Check if userCredentials is available
    if (userCredentials) {
      // Remove the task from the database
      const database = getDatabase();
      const userTasksRef = ref(database, `tasks/${userCredentials.uid}/${id}`);
      remove(userTasksRef)
        .then(() => {
          console.log("Task removed from the database successfully.");
        })
        .catch((error) => {
          console.error(
            "Error removing task from the database:",
            error.message
          );
        });
    } else {
      console.error("User credentials not available.");
    }
  }

  //edit functionality
  function handleEdit(id) {
    setToggleSubmit(false);
    let newEditTask = task.find((item) => {
      return item.id === id;
    });
    setSubject(newEditTask.subject);
    setDescription(newEditTask.description);
    setDate(newEditTask.date);
    setLink(newEditTask.link);
    setColor(newEditTask.color);
    setIsEditTask(id);
    console.log(newEditTask);
  }

  function setTheme() {
    const newLightMode = !lightMode; // Calculate the new lightMode value
    setLightMode(newLightMode); // Update the state

    // Save the new lightMode value to local storage
    localStorage.setItem("lightMode", JSON.stringify(newLightMode));
  }

  // When the component mounts, check if lightMode is stored in local storage
  // If it is, set the lightMode state accordingly
  useEffect(() => {
    const storedLightMode = JSON.parse(localStorage.getItem("lightMode"));
    if (storedLightMode !== null) {
      setLightMode(storedLightMode);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/*User info */}
        <Route
          path="/user"
          element={
            <div
              className=""
              style={{
                fontSmooth: "always",
                overflow: "hidden",
                backgroundColor: lightMode ? "#EEEEEE" : "#28282B",
                color: lightMode ? "#28282B" : "#EEEEEE",
              }}
            >
              <Navbar onClick={setTheme} lightMode={lightMode} />
              <div className="section container">
                <div style={{ paddingBottom: "300px" }}>
                  <User userCredentials={userCredentials} />
                </div>
              </div>

              <Footer lightMode={lightMode} />
            </div>
          }
        />
        {/* LOGIN PAGE*/}
        <Route
          path="/login"
          element={
            <div>
              <Login
                logInType={logInType}
                setIsLogInType={setIsLogInType}
                userCredentials={userCredentials}
                setUserCredentials={setUserCredentials}
                error={error}
                setError={setError}
                auth={auth}
                createUserWithEmailAndPassword={createUserWithEmailAndPassword}
                sendPasswordResetEmail={sendPasswordResetEmail}
                signInWithEmailAndPassword={signInWithEmailAndPassword}
              />
            </div>
          }
        />
        {/* NOTIFICATION PAGE*/}
        <Route
          path="/notifications"
          element={
            <div
              className=""
              style={{
                fontSmooth: "always",
                overflow: "hidden",
                backgroundColor: lightMode ? "#EEEEEE" : "#28282B",
                color: lightMode ? "#28282B" : "#EEEEEE",
              }}
            >
              <Navbar onClick={setTheme} lightMode={lightMode} />
              <div className="section container">
                <div style={{ paddingBottom: "300px" }}>
                  <Notifications />
                </div>
              </div>

              <Footer lightMode={lightMode} />
            </div>
          }
        />
        {/* HOME PAGE*/}
        <Route
          path="/"
          element={
            <div
              className=""
              style={{
                fontSmooth: "always",
                overflow: "hidden",
                backgroundColor: lightMode ? "#EEEEEE" : "#28282B",
                color: lightMode ? "#28282B" : "#EEEEEE",
              }}
            >
              <Navbar onClick={setTheme} lightMode={lightMode} />
              <div className="section">
                <Header />
                {/* <h1>Hi, {userCredentials.email}</h1> */}
              </div>
              <hr />

              {/*the form input*/}
              <div className="section" id="formsSection">
                <h1
                  style={{
                    fontSize: "65px",
                    fontWeight: "bold",
                    paddingBottom: "40px",
                  }}
                  className="text-center"
                >
                  You can create Tasks:
                </h1>
                <Forms
                  subject={subject}
                  color={color}
                  description={description}
                  date={date}
                  setSubject={setSubject}
                  setColor={setColor}
                  setDescription={setDescription}
                  setDate={setDate}
                  handleSubmit={handleSubmit}
                  toggleSubmit={toggleSubmit}
                  lightMode={lightMode}
                  link={link}
                  setLink={setLink}
                />
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
                          <h5 className="modal-title">Error</h5>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={() => setShowModal(false)}
                          ></button>
                        </div>
                        <div className="modal-body">
                          <p>Please input all fields.</p>
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
              </div>
              <hr />

              {/*ito yung mga task cards*/}
              <div className="section container" id="taskSection">
                <div
                // style={{ paddingTop: "100px" }}
                >
                  <h1
                    style={{
                      fontSize: "65px",
                      fontWeight: "bold",
                      paddingBottom: "40px",
                    }}
                    className="container text-center"
                  >
                    Manage your own workload:{" "}
                  </h1>
                  {/*dinidisplay yung mga tasks kapag sinimulan natin mag input*/}
                  <div
                    className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-1"
                    style={{ overflow: "hidden" }}
                  >
                    {" "}
                    {task.length > 0 ? (
                      task.map((items) => {
                        return (
                          <div
                            className="col mb-5"
                            // className=" border col-lg-3 col-md-6 col-sm-12 mb-3"
                          >
                            <Tasks
                              id={items.id}
                              {...items}
                              onDelete={() => handleDelete(items.id)}
                              onEdit={() => handleEdit(items.id)}
                              lightMode={lightMode}
                            />
                          </div>
                        );
                      })
                    ) : (
                      <h3 className="text-center">
                        Congrats! You currently have no task <br />
                        <img
                          src={require("./components/assets/notask.gif")}
                          style={{ maxWidth: "150px" }}
                        />
                      </h3>
                    )}
                  </div>
                </div>
              </div>

              <Footer lightMode={lightMode} />
            </div>
          }
        />
        {/* ABOUT PAGE*/}
        <Route
          path="/about"
          element={
            <div
              className=""
              style={{
                fontSmooth: "always",
                overflow: "hidden",
                backgroundColor: lightMode ? "#EEEEEE" : "#28282B",
                color: lightMode ? "#28282B" : "#EEEEEE",
              }}
            >
              <Navbar onClick={setTheme} lightMode={lightMode} />
              {/* About the Devs*/}
              <div className="section">
                <h1
                  style={{
                    fontSize: "65px",
                    fontWeight: "bold",
                    paddingBottom: "40px",
                  }}
                  className="text-center"
                >
                  About the Developers
                </h1>
                <AboutUs lightMode={lightMode} />
              </div>
              <Footer lightMode={lightMode} />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
