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
}) {
  //stores the list of subjects
  const subjects = [
    "General Physics 2",
    "General Biology 2",
    "Disaster Readiness and Risk Reduction (DRRR)",
    "Inquiries, Investigation and Immersion (III)",
    "Capstone Research",
    "HOPE 4",
    "Entrepreneurship",
    "Contemporary Philippine Arts from the Regions (CPAR)"
  ];

  //
  return (
    <div className="formContainer text-center container" id="formsSection">
      {/* <h3>
        STEMTask is a web-based task management application designed to help
        Senior High School STEM students in CCBHS organize their daily tasks
        efficiently.
      </h3> */}

      <div className="row">
        <div className="col col-sm-6 col-md-8 col-lg-5">
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
              {!subject && <option selected>select subject</option>}
              {subjects.map((chosenSubject, index) => {
                return <option key={index}>{chosenSubject}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="col">
          {/*Color Picker for Subject Background*/}

          <div className="mb-3">
            <label
              for="exampleFormControlTextarea1"
              className="form-label"
              style={{ marginRight: "10px" }}
            >
              Label Color:
            </label>
            <input
              type="color"
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
          // style={{ border: "1px solid gray" }}
        ></textarea>
      </div>

      {/*DATE PICKER*/}
      <div className="mb-3">
        <label for="exampleFormControlTextarea1" className="form-label">
          Deadline:
        </label>
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

      {/*input file */}
      <div className="mb-3">
        <input type="file" />
      </div>

      {/*Add  button */}
      <Button
        name={toggleSubmit ? "Add new Task" : "Save Task"}
        onClick={handleSubmit}
        href="#taskSection"
      />
    </div>
  );
}
