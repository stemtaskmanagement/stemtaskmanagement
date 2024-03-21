import Select from "react-select";
import FAQ from "./components/FAQ";
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
import Modal from "./components/Modal";
import { updateTaskInDatabase } from "./components/updateTaskInDatabase"; // Adjust the import path accordingly

//firebase
import { auth } from "./firebase/config";
import { getDatabase, ref, child, get, remove, set } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
//firebase rt database
import { writeUserData } from "./firebase/config";
import { onSnapshot } from "firebase/firestore";
//reactSpring animation
import { useTransition, animated } from "react-spring";

function App() {
  //user states
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [logInType, setIsLogInType] = useState("login");
  const [userCredentials, setUserCredentials] = useState([]);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);

  //naglalagay tayo ng default state ng inputs
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#43AA8B");
  const [date, setDate] = useState("");
  const [isEditTask, setIsEditTask] = useState(null);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [showList, setShowList] = useState(true);
  const [lightMode, setLightMode] = useState(true);
  const [link, setLink] = useState("");
  const [priority, setPriority] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState([]);

  const sortingOptions = [
    { label: "Priority", value: "priority" },
    { label: "Due Date", value: "dueDate" },
    { label: "Subject", value: "subject" },
  ];

  //mobile responsiveness
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Use the useTransition hook to animate tasks for sorting
  const sortingTransitions = useTransition(task, {
    keys: (item) => item.id,
    from: { opacity: 0, transform: "scale(0.8)" }, // Start slightly smaller
    enter: { opacity: 1, transform: "scale(1)" }, // Grow to normal size
    leave: { opacity: 0, transform: "scale(0.8)" }, // Shrink slightly before disappearing
    config: { tension: 400, friction: 25 },
  });
  // Function to handle date parsing
  function parseDate(dateString) {
    if (dateString && dateString !== "") {
      const parsedDate = new Date(dateString);
      // Check if the parsed date is a valid date object
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate;
      } else {
        console.error("Invalid date string:", dateString);
        return null;
      }
    } else {
      return null;
    }
  }

  // Fetch tasks from the database when the user logs in
  useEffect(() => {
    const database = getDatabase();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserCredentials(user);
        const userTasksRef = ref(database, `users/${user.uid}/tasks`);
        try {
          const snapshot = await get(userTasksRef);
          if (snapshot.exists()) {
            const userTasks = Object.values(snapshot.val()).map((task) => ({
              ...task,
              date: parseDate(task.date), // Parse date string into date object
            }));
            setTask(userTasks);
          } else {
            setTask([]);
          }
        } catch (error) {
          console.error("Error fetching user tasks:", error.message);
        }
      } else {
        setUserCredentials([]);
        setTask([]);
      }
    });

    return () => unsubscribe();
  }, []);

  /// Function to sort tasks by priority
  const sortByPriority = () => {
    const priorityOrder = [
      "High Priority",
      "Medium Priority",
      "Low Priority",
      "Normal Priority",
      "Optional",
    ];
    const sortedTasks = [...task].sort((a, b) => {
      return (
        priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
      );
    });
    setTask(sortedTasks); // Update the task state directly
  };

  // Function to sort tasks by due date
  const sortByDueDate = () => {
    const sortedTasks = [...task].sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    setTask(sortedTasks); // Update the task state directly
  };

  // Function to sort tasks by subject
  const sortBySubject = () => {
    const sortedTasks = [...task].sort((a, b) => {
      return a.subject.localeCompare(b.subject);
    });
    setTask(sortedTasks); // Update the task state directly
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!description || !subject || !priority) {
      setShowModal(true);
    } else {
      document
        .getElementById("taskSection")
        .scrollIntoView({ behavior: "smooth" });

      let newTask;
      if (toggleSubmit) {
        newTask = {
          id: task.length === 0 ? 1 : Math.max(...task.map((t) => t.id)) + 1,
          description: description,
          subject: subject,
          date: formatDate(date),
          color: color,
          link: link,
          priority: priority,
        };
        setTask([newTask, ...task]);
      } else {
        newTask = {
          id: isEditTask,
          description: description,
          subject: subject,
          date: formatDate(date),
          color: color,
          link: link,
          priority: priority,
        };
        const updatedTaskList = task.map((item) =>
          item.id === isEditTask ? { ...item, ...newTask } : item
        );
        setTask(updatedTaskList);
        setToggleSubmit(true);
        setIsEditTask(null);
        await updateTaskInDatabase(newTask);
      }

      clearInputFields();

      if (userCredentials) {
        const database = getDatabase();
        const userTasksRef = ref(
          database,
          `users/${userCredentials.uid}/tasks/${newTask.id}`
        );

        try {
          await set(userTasksRef, newTask);
          console.log("Task added to the database successfully.");
        } catch (error) {
          console.error("Error adding task to the database:", error.message);
        }
      } else {
        console.error("User credentials not available.");
      }
    }
  }

  // Function to handle deletion of tasks
  function handleDelete(id) {
    const updatedTasks = task.filter((item) => item.id !== id);
    setTask(updatedTasks); // Update the state to remove the task from UI

    // Check if userCredentials is available
    if (userCredentials) {
      // Remove the task from the database
      const database = getDatabase();
      const userTasksRef = ref(
        database,
        `users/${userCredentials.uid}/tasks/${id}`
      );
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

  //handles the sorting choices
  function handleSortChange(event) {
    const selectedSort = event.target.value;
    switch (selectedSort) {
      case "priority":
        sortByPriority();
        break;
      case "dueDate":
        sortByDueDate();
        break;
      case "subject":
        sortBySubject();
        break;
      default:
        break;
    }
  }

  // Function to clear input fields
  function clearInputFields() {
    setDescription("");
    setSubject("");
    setDate("");
    setColor("#04a4b0");
    setLink("");
    setPriority("");
  }

  //date formatter
  // Function to format date in "Month Day, Year" format
  function formatDate(dateString) {
    if (dateString && dateString !== "") {
      const dateObj = new Date(dateString);
      const options = { month: "long", day: "numeric", year: "numeric" };
      return dateObj.toLocaleDateString("en-US", options);
    } else {
      return ""; // Return an empty string if dateString is empty
    }
  }

  //delete functionality
  function handleDelete(id) {
    const updatedTasks = task.filter((item) => item.id !== id);
    setTask(updatedTasks); // Update the state to remove the task from UI

    // Check if userCredentials is available
    if (userCredentials) {
      // Remove the task from the database
      const database = getDatabase();
      const userTasksRef = ref(
        database,
        `users/${userCredentials.uid}/tasks/${id}`
      );
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
    setPriority(newEditTask.priority);
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
              <Navbar
                onClick={setTheme}
                lightMode={lightMode}
                userCredentials={userCredentials}
              />
              <div className="section container">
                <div style={{ paddingBottom: "300px", paddingRight: "20p" }}>
                  <User
                    userCredentials={userCredentials}
                    auth={auth}
                    showModal={showModal}
                    task={task}
                  />
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
                lightMode={lightMode}
                onClick={setTheme}
              />
            </div>
          }
        />
        {/* FAQ PAGE*/}
        <Route
          path="/faq"
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
              <Navbar
                onClick={setTheme}
                lightMode={lightMode}
                userCredentials={userCredentials}
              />
              <div className="headerSection container">
                <h1
                  style={{
                    fontSize: "65px",
                    fontWeight: "bold",
                    paddingBottom: "40px",
                  }}
                  className="container text-center wow animate__animated animate__fadeIn"
                >
                  Frequently Asked Questions
                </h1>

                <FAQ />
              </div>

              <Footer lightMode={lightMode} />
            </div>
          }
        />
        {/*NOTIFICATION PAGE*/}
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
              <Navbar
                onClick={setTheme}
                lightMode={lightMode}
                userCredentials={userCredentials}
              />
              <div className="headerSection container">
                <h1
                  style={{
                    fontSize: isMobile ? "40px" : "65px",
                    fontWeight: "bold",
                    paddingBottom: "40px",
                  }}
                  className="container text-center wow animate__animated animate__fadeIn"
                >
                  from Devs
                </h1>

                <Notifications />
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
              <Navbar
                onClick={setTheme}
                lightMode={lightMode}
                userCredentials={userCredentials}
                home="true"
                isMobile={isMobile}
              />
              <div className="headerSection">
                <Header userCredentials={userCredentials} />
              </div>
              <hr />

              {/*the form input*/}
              <div className="formsSection" id="formsSection">
                <h1
                  style={{
                    fontSize: isMobile ? "40px" : "55px",
                    fontWeight: "bold",
                    paddingBottom: "40px",
                  }}
                  className="text-center "
                >
                  Task Creation:
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
                  userCredentials={userCredentials}
                  priority={priority}
                  setPriority={setPriority}
                />
                {/*Show the modal whenever the fields are empty*/}
                {showModal && (
                  <Modal
                    lightMode={lightMode}
                    modalTitle="Error"
                    modalDescription={`Please input all necessary fields. (subject, description, and priority)`}
                    setShowModal={setShowModal}
                  />
                )}
              </div>
              <hr />

              {/*ito yung mga task cards*/}
              <div className="formsSection container" id="taskSection">
                <div
                // style={{ paddingTop: "100px" }}
                >
                  <h1
                    style={{
                      fontSize: isMobile ? "40px" : "55px",
                      fontWeight: "bold",
                      paddingBottom: "40px",
                    }}
                    className="container text-center "
                  >
                    My Tasks:
                  </h1>
                  {task.length > 1 && (
                    <div className="p-3">
                      <div className="mb-3 d-flex align-items-center">
                        <span style={{ marginRight: "10px" }}>Sort by:</span>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          style={{
                            width: "150px", // Adjust the width as needed
                            backgroundColor: lightMode ? "#E4E3E0" : "#313638",
                            border: lightMode
                              ? "2px solid #F9F6EE"
                              : "2px solid #313638",
                            color: lightMode ? "#313638" : "#F9F6EE",
                            fontFamily: "inherit",
                          }}
                          onChange={handleSortChange}
                        >
                          <option value="">Select</option>
                          {sortingOptions.map((option, index) => (
                            <option key={index} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                  {/*dinidisplay yung mga tasks kapag sinimulan natin mag input*/}
                  {task.length > 0 ? (
                    <div
                      className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-1"
                      style={{ overflow: "hidden" }}
                    >
                      {sortingTransitions((props, item) => (
                        <animated.div style={props} key={item.id}>
                          <div className="col mb-5">
                            <Tasks
                              id={item.id}
                              {...item}
                              onDelete={() => handleDelete(item.id)}
                              onEdit={() => handleEdit(item.id)}
                              lightMode={lightMode}
                            />
                          </div>
                        </animated.div>
                      ))}
                    </div>
                  ) : (
                    <div className="container d-flex justify-content-center align-items-center">
                      <div className="text-center">
                        <h3>Congrats! You currently have no tasks</h3>
                        <img
                          src={require("./components/assets/notask.gif")}
                          style={{ maxWidth: "150px" }}
                          alt="No tasks"
                        />
                      </div>
                    </div>
                  )}
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
              <Navbar
                onClick={setTheme}
                lightMode={lightMode}
                userCredentials={userCredentials}
              />
              {/* About the Devs*/}
              <div className="headerSection container">
                <h1
                  style={{
                    fontSize: "65px",
                    fontWeight: "bold",
                    paddingBottom: "40px",
                  }}
                  className="container text-center wow animate__animated animate__fadeIn"
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
