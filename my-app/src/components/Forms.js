import Button from "./Button";
import { useState } from "react";
import { app } from "../firebase/config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

  return (
    <div className="formContainer container">
      <div className="row">
        <div className="col-md-6 mb-3">
          <select
            className="form-select"
            aria-label="Default select example"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{
              backgroundColor: lightMode ? "#E4E3E0" : "#313638",
              color: lightMode ? "#313638" : "white",
              border: lightMode ? "2px solid #F9F6EE" : "2px solid #313638",
            }}
          >
            {!subject && <option value="">Select subject</option>}
            {subjects.map((chosenSubject, index) => (
              <option key={index}>{chosenSubject}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6 mb-3">
          <input
            type="color"
            className="form-control form-control-color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{
              backgroundColor: lightMode ? "#E4E3E0" : "#313638",
              color: lightMode ? "#313638" : "white",
              border: lightMode ? "2px solid #F9F6EE" : "2px solid #313638",
            }}
          />
        </div>
      </div>

      <div className="mb-3">
        <textarea
          className="form-control"
          rows="3"
          placeholder="Enter the description of your task."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          autoCorrect="on"
          style={{
            backgroundColor: lightMode ? "#E4E3E0" : "#313638",
            color: lightMode ? "#313638" : "white",
            border: lightMode ? "2px solid #F9F6EE" : "2px solid #313638",
          }}
        ></textarea>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <select
            className="form-select"
            aria-label="Default select example"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{
              backgroundColor: lightMode ? "#E4E3E0" : "#313638",
              color: lightMode ? "#313638" : "white",
              border: lightMode ? "2px solid #F9F6EE" : "2px solid #313638",
            }}
          >
            {!priority && <option value="">Select Priority Level</option>}
            {priorityLevels.map((chosenPriority, index) => (
              <option key={index}>{chosenPriority}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6 mb-3">
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Enter your Deadline"
            style={{
              backgroundColor: lightMode ? "#E4E3E0" : "#313638",
              color: lightMode ? "#313638" : "white",
              border: lightMode ? "2px solid #F9F6EE" : "2px solid #313638",
            }}
          />
        </div>
      </div>

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
            border: lightMode ? "2px solid #F9F6EE" : "2px solid #313638",
          }}
        />
      </div>

      <div className="text-center">
        {" "}
        <Button
          name={toggleSubmit ? "Add new Task" : "Save Task"}
          onClick={handleSubmit}
          href="#taskSection"
          color="btn-primary"
        />
      </div>
    </div>
  );
}
