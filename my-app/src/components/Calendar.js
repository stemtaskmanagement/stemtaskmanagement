import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Mapping object for subjects and their acronyms
const subjectAcronyms = {
  "General Chemistry 2 (GenChem 2)": "GenChem 2",
  "Basic Calculus (BasCal)": "BasCal",
  "Practical Research 1 (PR1)": "PR1",
  "Disaster Readiness and Risk Reduction (DRRR)": "DRRR",
  "Statistics and Probability (Stats and Prob)": "Stats and Prob",
  "Health Optimizing Physical Education (HOPE 2)": "HOPE 2",
  "Pagbasa at Pagsusuri sa Iba't ibang Teksto Tungo sa Pananaliksik (PPIITTP)":
    "PPIITTP",
  "Reading and Writing Skills (RWS)": "RWS",
  "21st Century Literature from the Philippines and the World (21st CL)":
    "21st CL",
};

export default function Calendar({ lightMode, task, setShowCalendar }) {
  const nav = useNavigate();
  // Filter out tasks with undefined properties
  const events = task
    .filter((task) => task.id && task.subject && task.date && task.color)
    .map((task) => ({
      id: task.id,
      title: subjectAcronyms[task.subject] || task.subject, // Replace subject with acronym if available
      start: task.date,
      color: task.color,
    }));

  const handleEventClick = (clickInfo) => {
    const eventId = clickInfo.event.id; // Get the clicked event's id
    // Navigate to the homepage with the task ID as a URL parameter
    nav(`/?taskId=${eventId}`);
  };

  // Function to customize event rendering
  const renderEventContent = (eventInfo) => {
    console.log(eventInfo.event.colors);
    return (
      <div
        className="event-content"
        style={{
          backgroundColor: eventInfo.event.backgroundColor,
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        {eventInfo.event.title}
      </div>
    );
  };

  // Scroll to the target element with the provided ID
  const scrollToTargetElement = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get("taskId");
    if (taskId) {
      const targetElement = document.getElementById(taskId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    scrollToTargetElement();
  }, []);

  return (
    <div
      className="modal"
      style={{
        display: "block",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        backgroundColor: lightMode
          ? "rgba(255, 255, 255, 0.5)"
          : "rgba(0, 0, 0, 0.5)", // Adjust colors based on light mode
      }}
    >
      <div
        className="modal-dialog"
        style={{ width: "100%", maxWidth: "100%" }} // Adjust width styles
      >
        <div
          className="modal-content"
          style={{
            backgroundColor: lightMode ? "#F9F6EE" : "#313638",
            color: lightMode ? "#313638" : "white",
          }}
        >
          <div className="modal-body" style={{ padding: "20px" }}>
            <div className="calendar-container">
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventContent={renderEventContent}
                eventClick={handleEventClick}
                height="auto"
                themeSystem={lightMode ? "standard" : "bootstrap"} // Adjust the theme based on lightMode
              />
            </div>
          </div>
          <button
            type="button"
            className="btn btn-success text-white" // Corrected class name
            onClick={() => setShowCalendar(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}