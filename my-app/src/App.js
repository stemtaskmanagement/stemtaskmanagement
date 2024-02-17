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
  const [date, setDate] = useState("");
  const [isEditTask, setIsEditTask] = useState(null);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [showList, setShowList] = useState(true);
  //this is the template for tasks and when the forms is inserted this changes the attributes to whatever the input was

  const [task, setTask] = useState([
    //display empty as a default
  ]);

  //function kung saan sinesave yung nilagay sa input
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   if (!description || !subject) {
  //     alert("Please fill in all fields.");
  //   } else {
  //     const allInputData = {
  //       id: new Date().getTime().toString(),
  //       description: description,
  //       subject: subject,
  //       date: formatDate(date),
  //     };
  //     setTask([allInputData, ...task]);
  //     // Clear input fields after submission
  //     setDescription("");
  //     setSubject("");
  //     setDate("");
  //   }
  // }

  function handleSubmit(e) {
    e.preventDefault();
    if (!description || !subject) {
      alert("Please fill in all fields.");
    } else if (description && toggleSubmit) {
      // Check if it's a new task
      const allInputData = {
        id: new Date().getTime().toString(),
        description: description,
        subject: subject,
        date: formatDate(date),
      };
      setTask([allInputData, ...task]); // Add new task to the list
      setDescription(""); // Clear input fields after submission
      setSubject("");
      setDate("");
    } else if (description && !toggleSubmit) {
      // Check if it's an edited task
      setTask(
        task.map((item) => {
          if (item.id === isEditTask) {
            return {
              ...item,
              subject: subject,
              description: description,
              date: formatDate(date),
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
    }
  }

  //stores the list of subjects
  const subjects = [
    "General Chemistry",
    "General Biology",
    "Calculus",
    "PreCalculus",
    "FPL",
  ];

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
    setIsEditTask(id);
    console.log(newEditTask);
  }

  return (
    <div className="">
      <Navbar />
      <Header />
      {/**/}
      <div className="container text-center">
        {/*SUBJECT SELECTOR*/}
        <div className="mb-3">
          {/* <label for="exampleFormControlInput1" className="form-label">
            Select the subject:
          </label> */}
          <select
            className="form-select"
            aria-label="Default select example"
            // style={{ border: "1px solid gray" }}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option selected>select subject</option>
            {subjects.map((chosenSubject, index) => {
              return <option key={index}>{chosenSubject}</option>;
            })}
          </select>
        </div>

        {/*DESCRIPTION INPUT*/}
        <div className="mb-3">
          {/* <label for="exampleFormControlTextarea1" className="form-label">
            Your Task:
          </label> */}
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="enter the description of your task."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            // style={{ border: "1px solid gray" }}
          ></textarea>
        </div>

        {/*DATE PICKER*/}
        <div className="mb-3">
          {/* <label for="exampleFormControlTextarea1" className="form-label">
            Deadline:
          </label> */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ border: "1px solid gray", margin: "10px" }}
          />
        </div>
        <Button name="Add New Task" onClick={handleSubmit} href="#Task" />
      </div>

      {/*ito yung mga task cards*/}
      <div style={{ marginTop: "100px" }} id="#Task">
        <h1 className="container text-center">My task :</h1>
        {/*dinidisplay yung mga tasks kapag sinimulan natin mag input*/}
        <div
          className="row row-cols-1 row-cols-md-2 g-1"
          style={{ overflow: "hidden" }}
        >
          {" "}
          {task.length > 0 ? (
            task.map((items) => {
              return (
                <div
                  className="col"
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
            <h3 className="text-center">You currently have no task</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
