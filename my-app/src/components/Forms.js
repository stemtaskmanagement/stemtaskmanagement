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
    "General Chemistry",
    "General Biology",
    "Basic Calculus",
    "Pre Calculus",
    "FPL",
    "HOPE",
    "Earth Science",
  ];

  //
  return (
    <div className="formContainer text-center">
      {/*SUBJECT SELECTOR*/}
      <div className="mb-3">
        {/* <label for="exampleFormControlInput1" className="form-label">
            Select the subject:
          </label> */}
        <select
          className="form-select"
          aria-label="Default select example"
          style={{
            backgroundColor: lightMode ? "white" : "#353935",
            border: lightMode ? "2px solid white" : "2px solid #353935",
            color: lightMode ? "#353935" : "white",
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
            backgroundColor: lightMode ? "white" : "#353935",
            borderRadius: "9px",
            border: lightMode ? "2px solid white" : "2px solid #353935",
            color: lightMode ? "#353935" : "white",
          }}
          onChange={(e) => setColor(e.target.value)}
        />
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
            backgroundColor: lightMode ? "white" : "#353935",
            color: lightMode ? "#353935" : "white",
            border: lightMode ? "2px solid white" : "2px solid #353935",
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
            backgroundColor: lightMode ? "white" : "#353935",
            color: lightMode ? "#353935" : "white",
            margin: "10px",
            border: lightMode ? "2px solid white" : "2px solid #353935",
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
