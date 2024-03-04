import Button from "./Button";
import { useState } from "react";
import { app } from "../firebase/config";

export default function Forms({
  subject,
  color,
  description,
  date,
  setSubject,
  setColor,
  setDescription,
  setDate,
  handleSubmit,
  toggleSubmit,
  lightMode,
  link,
  setLink,
  userCredentials,
  priority,
  setPriority,
}) {
  //stores the list of subjects
  const subjects = [
    "General Chemistry 2 (GenChem 2)",
    "Basic Calculus (BasCal)",
    "Practical Research 1 (PR1)",
    "Disaster Readiness and Risk Reduction (DRRR)",
    "Statistics and Probability (Stats and Prob)",
    "Health Optimizing Physical Education (HOPE 2)",
    "Pagbasa at Pagsusuri sa Iba't ibang Teksto Tungo sa Pananaliksik (PPIITTP)",
    "Reading and Writing Skills (RWS)",
    "21st Century Literature from the Philippines and the World (21st CL)",
  ];

  const priorityLevels = [
    "High Priority",
    "Medium Priority",
    "Low Priority",
    "Normal Priority",
    "Optional",
  ];

  // Placeholder color based on lightMode
  const placeholderColor = lightMode ? "#313638" : "white";

  //
  return (
    <div className="formContainer text-center container">
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <select
              className="form-select"
              aria-label="Default select example"
              style={{
                backgroundColor: lightMode ? "#E4E3E0" : "#313638",
                border: lightMode ? "2px solid #F9F6EE" : "2px solid #313638",
                color: lightMode ? "#313638" : "#F9F6EE",
                fontFamily: "inherit",
              }}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              {!subject && <option value="">Select subject</option>}
              {subjects.map((chosenSubject, index) => (
                <option key={index}>{chosenSubject}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <input
              type="color"
              className="form-control form-control-color"
              id="exampleColorInput"
              value={color}
              style={{
                backgroundColor: lightMode ? "#E4E3E0" : "#313638",
                borderRadius: "9px",
                border: lightMode ? "2px solid #F9F6EE" : "2px solid #313638",
                color: lightMode ? "#313638" : "#F9F6EE",
              }}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mb-3">
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Enter the description of your task."
          style={{
            backgroundColor: lightMode ? "#E4E3E0" : "#313638",
            color: lightMode ? "#313638" : "#F9F6EE",
            border: lightMode ? "2px solid #F9F6EE" : "2px solid #313638",
          }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          autoCorrect="on"
        ></textarea>
      </div>
      <div className="mb-3">
        <select
          className="form-select"
          aria-label="Default select example"
          style={{
            backgroundColor: lightMode ? "#E4E3E0" : "#313638",
            border: lightMode ? "2px solid #F9F6EE" : "2px solid #313638",
            color: lightMode ? "#313638" : "#F9F6EE",
            fontFamily: "inherit",
          }}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          {!priority && <option value="">Select Priority Level</option>}
          {priorityLevels.map((chosenPriority, index) => (
            <option key={index}>{chosenPriority}</option>
          ))}
        </select>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <input
              className="form-control"
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Enter your link"
              style={{
                backgroundColor: lightMode ? "#E4E3E0" : "#313638",
                color: lightMode ? "#313638" : "white",
                margin: "10px",
                border: lightMode ? "2px solid #F9F6EE" : "2px solid #313638",
              }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <input
              type="date"
              className="form-control"
              id="dateInput"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                backgroundColor: lightMode ? "#E4E3E0" : "#313638",
                color: lightMode ? "#313638" : "white",
                margin: "10px",
                border: lightMode ? "2px solid #F9F6EE" : "2px solid #313638",
              }}
              placeholder="Enter your Deadline"
            />
          </div>
        </div>
      </div>

      <Button
        name={toggleSubmit ? "Add new Task" : "Save Task"}
        onClick={handleSubmit}
        href="#taskSection"
        color="btn-primary"
      />
    </div>
  );
}
