import Button from "./Button";
import { useState } from "react";
import { app } from "../firebase/config";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import DatePicker from "react-datepicker";
import ColourSelect from "./ColourSelect";

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
  file,
  setFile,
}) {
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

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  // Handle date change
  const handleDateChange = (selectedDate) => {
    // Check if selectedDate is null, which indicates the date has been cleared
    if (selectedDate === null) {
      setDate(null); // Set date to null to indicate undated
    } else {
      setDate(selectedDate); // Set the selected date
    }
  };

  return (
    <div className="formContainer container">
      <div className="row">
        <div className="col-md-6 mb-3">
          <Select
            options={subjects.map((subject) => ({
              value: subject,
              label: subject,
            }))}
            value={subject ? { value: subject, label: subject } : null}
            onChange={(selectedOption) => setSubject(selectedOption.value)}
            placeholder={subject ? null : "Select subject"}
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor: lightMode ? "#E4E3E0" : "#313638",
                color: lightMode ? "#313638" : "white",
                border: lightMode ? "2px solid #F9F6EE" : "2px solid #313638",
                borderRadius: "5px",
                padding: "8px",
              }),
              option: (provided) => ({
                ...provided,
                backgroundColor: lightMode ? "#E4E3E0" : "#313638",
                color: lightMode ? "#313638" : "white",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: lightMode ? "#313638" : "white",
              }),
            }}
          />
        </div>
        <div className="col-md-6 mb-3">
          {/* <input
            type="color"
            className="form-control form-control-color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{
              backgroundColor: lightMode ? "#E4E3E0" : "#313638",
              color: lightMode ? "#313638" : "white",
              border: lightMode ? "2px solid #F9F6EE" : "2px solid #313638",
              borderRadius: "5px",
              padding: "8px",
            }}
          /> */}
          <ColourSelect
            color={color}
            setColor={setColor}
            lightMode={lightMode}
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
            borderRadius: "5px",
            padding: "8px",
          }}
        ></textarea>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <Select
            options={priorityLevels.map((priority) => ({
              value: priority,
              label: priority,
            }))}
            value={priority ? { value: priority, label: priority } : null}
            onChange={(selectedOption) => setPriority(selectedOption.value)}
            placeholder={priority ? null : "Select priority level"}
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor: lightMode ? "#E4E3E0" : "#313638",
                color: lightMode ? "#313638" : "white",
                border: lightMode ? "2px solid #F9F6EE" : "2px solid #313638",
                borderRadius: "5px",
                padding: "8px",
              }),
              option: (provided) => ({
                ...provided,
                backgroundColor: lightMode ? "#E4E3E0" : "#313638",
                color: lightMode ? "#313638" : "white",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: lightMode ? "#313638" : "white",
              }),
            }}
          />
        </div>
        <div className="col-md-6 mb-3">
          <DatePicker
            selected={date !== "" ? new Date(date) : null}
            onChange={handleDateChange}
            placeholderText="Enter your Deadline"
            className={
              lightMode
                ? "form-control light-mode-datepicker"
                : "form-control dark-mode-datepicker"
            }
          />
        </div>
      </div>
      <div className="mb-3">
        {file && typeof file === "object" && (
          <div className="file-preview">
            <img
              src={URL.createObjectURL(file)}
              alt="File Preview"
              style={{ width: "100px" }}
            />
          </div>
        )}

        <input
          className="form-control"
          type="file"
          onChange={handleFileChange}
          placeholder={file ? null : "Select priority level"}
          style={{
            backgroundColor: lightMode ? "#E4E3E0" : "#313638",
            color: lightMode ? "#313638" : "white",
            border: lightMode ? "2px solid #F9F6EE" : "2px solid #313638",
            borderRadius: "5px",
            padding: "8px",
          }}
        />
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
            borderRadius: "5px",
            padding: "8px",
          }}
        />
      </div>

      <div className="text-center">
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
