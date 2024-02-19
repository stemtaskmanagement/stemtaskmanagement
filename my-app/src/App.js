import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Forms from "./components/Forms";
import Tasks from "./components/Tasks";
import Button from "./components/Button";
import Data from "./components/Data";
import { useState } from "react";

function App() {
  //naglalagay tayo ng default state ng inputs
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#04a4b0");
  const [date, setDate] = useState("");
  const [isEditTask, setIsEditTask] = useState(null);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [showList, setShowList] = useState(true);

  //this is the template for tasks and when the forms is inserted this changes the attributes to whatever the input was

  const [task, setTask] = useState([
    //display empty as a default
  ]);

  function handleSubmit(e) {
    e.preventDefault();

    //scroll down to task after clicking add new task
    document
      .getElementById("taskSection")
      .scrollIntoView({ behavior: "smooth" });

    if (!description || !subject) {
      alert("Please fill in all fields.");
    } else if (description && toggleSubmit) {
      // Check if it's a new task
      const allInputData = {
        id: new Date().getTime().toString(),
        description: description,
        subject: subject,
        date: formatDate(date),
        color: color,
      };
      setTask([allInputData, ...task]); // Add new task to the list
      setDescription(""); // Clear input fields after submission
      setSubject("");
      setDate("");
      setColor("#04a4b0");
    } else if (description && subject && !toggleSubmit) {
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
    setColor(newEditTask.color);
    setIsEditTask(id);
    console.log(newEditTask);
  }

  return (
    <div className="" style={{ fontSmooth: "always", overflow: "hidden" }}>
      <Navbar />
      <Header />
      {/**/}

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
      />

      {/*ito yung mga task cards*/}
      <div style={{ marginTop: "100px" }} id="taskSection">
        <h1 className="container text-center">My task: </h1>
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
  );
}

export default App;
