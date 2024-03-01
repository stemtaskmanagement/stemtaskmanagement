import Button from "./Button";
import { useState } from "react";

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

  //
  return (
    <div className="formContainer text-center container">
      {/* <h3>
        STEMTask is a web-based task management application designed to help
        Senior High School STEM students in CCBHS organize their daily tasks
        efficiently.
      </h3> */}

      <div className="row">
        <div className="col col-sm-6 col-md-8 col-lg-8">
          {/*SUBJECT SELECTOR*/}
          <div className="mb-3">
            {/* <label for="exampleFormControlInput1" className="form-label">
            Select the subject:
          </label> */}
            <select
              className="form-select"
              aria-label="Default select example"
              style={{
                backgroundColor: lightMode ? "#F9F6EE" : "#313638",
                border: lightMode ? "2px solid #F9F6EE" : "2px solid #313638",
                color: lightMode ? "#313638" : "#F9F6EE",
              }}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              {/* default select subject cannot be taken as a value when edited*/}
              {!subject && (
                <option
                  value //selected
                >
                  select subject
                </option>
              )}
              {subjects.map((chosenSubject, index) => {
                return <option key={index}>{chosenSubject}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="col">
          {/*Color Picker for Subject Background*/}

          <div className="mb-3">
            <input
              type="color"
              className="form-control form-control-color"
              id="exampleColorInput"
              value={color}
              style={{
                backgroundColor: lightMode ? "#F9F6EE" : "#313638",
                borderRadius: "9px",
                border: lightMode ? "2px solid #F9F6EE" : "2px solid #313638",
                color: lightMode ? "#313638" : "#F9F6EE",
              }}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>
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
          style={{
            backgroundColor: lightMode ? "#F9F6EE" : "#313638",
            color: lightMode ? "#313638" : "#F9F6EE",
            border: lightMode ? "2px solid #F9F6EE" : "2px solid #313638",
          }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          autoCorrect="on"
          // style={{ border: "1px solid gray" }}
        ></textarea>
      </div>
      <div className="row">
        <div className="col col-sm-6 col-md-8 col-lg-5">
          {/*input file */}
          <div className="mb-3">
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="enter your link"
              style={{
                backgroundColor: lightMode ? "#F9F6EE" : "#313638",
                color: lightMode ? "#313638" : "white",
                margin: "10px",
                border: lightMode ? "2px solid #F9F6EE" : "2px solid #313638",
              }}
            />
          </div>
        </div>
        <div className="col">
          {/*DATE PICKER*/}

          <div className="mb-3">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                backgroundColor: lightMode ? "#F9F6EE" : "#313638",
                color: lightMode ? "#313638" : "white",
                margin: "10px",
                border: lightMode ? "2px solid #F9F6EE" : "2px solid #313638",
              }}
            />
          </div>
        </div>
      </div>

      {/*Add  button */}
      <Button
        name={toggleSubmit ? "Add new Task" : "Save Task"}
        onClick={handleSubmit}
        href="#taskSection"
        color="btn-primary"
      />
    </div>
  );
}
