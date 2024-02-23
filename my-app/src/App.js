import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Forms from "./components/Forms";
import Tasks from "./components/Tasks";
import { useState } from "react";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
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

  //this is the template for tasks and when the forms is inserted this changes the attributes to whatever the input was

  const [task, setTask] = useState([
    //display empty as a default
  ]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description || !subject) {
      alert("Please fill in all fields.");
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
    const updatedTasks = task.filter((items) => items.id !== id);
    setTask(updatedTasks);
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
    setLightMode(!lightMode);
  }

  return (
    <Router>
      <Routes>
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
              </div>
              <hr />

              {/*ito yung mga task cards*/}
              <div className="section" id="taskSection">
                <div
                  // style={{ paddingTop: "100px" }}
                  className="container text-center"
                >
                  <h1
                    style={{
                      fontSize: "65px",
                      fontWeight: "bold",
                      paddingBottom: "40px",
                    }}
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
