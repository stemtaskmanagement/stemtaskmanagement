import { useState } from "react";
import Button from "./Button";

export default function Navbar({ onClick, lightMode, userCredentials }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleNavbarItemClick = () => {
    setIsNavbarOpen(false); // Close the navbar when an item is clicked
  };

  return (
    <div>
      {/* */}
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: lightMode ? "#E4E3E0" : "#313638",
        }}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleNavbarToggle}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${isNavbarOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <a className="navbar-brand text-primary" href="/">
              STEMTask
            </a>
            <ul
              className="navbar-nav ms-auto"
              style={{
                listStyleType: "none",
                display: "flex",
              }}
            >
              {userCredentials === "" ? (
                <li onClick={handleNavbarItemClick}>
                  <a
                    className="nav-link"
                    href="/login"
                    style={{ color: lightMode ? "#313638" : "white" }}
                  >
                    Log In
                  </a>
                </li>
              ) : (
                <li onClick={handleNavbarItemClick}>
                  <a
                    className="nav-link"
                    style={{ color: lightMode ? "#313638" : "white" }}
                    href="/user"
                  >
                    {userCredentials.email}
                  </a>
                </li>
              )}
              <li
                style={{ marginRight: "15px" }}
                onClick={handleNavbarItemClick}
              >
                <a
                  href="/#taskSection"
                  style={{ color: lightMode ? "#313638" : "white" }}
                  className="nav-link"
                >
                  My Task
                </a>
              </li>
              <li onClick={handleNavbarItemClick}>
                <Button
                  icon={
                    lightMode ? (
                      <i className="fa-solid fa-moon"></i>
                    ) : (
                      <i className="fa-solid fa-sun"></i>
                    )
                  }
                  onClick={onClick}
                  color="btn-primary"
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
