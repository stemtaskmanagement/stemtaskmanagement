import { useState, useEffect } from "react";
import Button from "./Button";

export default function Navbar({ onClick, lightMode, userCredentials, home }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // const handleNavbarToggle = () => {
  //   setIsNavbarOpen(!isNavbarOpen);
  // };

  // const handleNavbarItemClick = () => {
  //   setIsNavbarOpen(false); // Close the navbar when an item is clicked
  // };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {/* */}
      <nav
        className={` ${isNavbarOpen && "text-center"} navbar navbar-expand-lg`}
        style={{
          backgroundColor: lightMode ? "#E4E3E0" : "#313638",
        }}
      >
        <div className="container-fluid">
          <a className="navbar-brand text-primary" href="/">
            {home ? "STEMTask" : "Home"}
          </a>
          {/* <button
            className="navbar-toggler"
            type="button"
            onClick={handleNavbarToggle}
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}
          <div
            // className={`collapse navbar-collapse ${isNavbarOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <ul
              className="navbar-nav ms-auto"
              style={{
                listStyleType: "none",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <li>
                <a
                  style={{
                    color: lightMode ? "#313638" : "white",
                    marginRight: "5px",
                  }}
                  className="nav-link"
                  href="/notifications"
                >
                  <Button
                    icon={<i class="fa-solid fa-bell fa-sm"></i>}
                    color="btn-secondary"
                  />
                </a>
              </li>
              <li>
                <a
                  style={{
                    color: lightMode ? "#313638" : "white",
                    marginRight: "5px",
                  }}
                  className="nav-link"
                  href="/user"
                >
                  <Button
                    icon={<i class="fa-solid fa-user fa-sm"></i>}
                    color="btn-secondary"
                  />
                </a>
              </li>

              <li>
                <a
                  href="/#taskSection"
                  style={{
                    color: lightMode ? "#313638" : "white",
                    marginRight: "5px",
                  }}
                  className="nav-link"
                >
                  <Button
                    icon={<i class="fa-solid fa-list-check fa-sm"></i>}
                    color="btn-secondary"
                  />{" "}
                </a>
              </li>
              <li>
                <a
                  style={{
                    color: lightMode ? "#313638" : "white",
                    marginRight: "5px",
                  }}
                  className="nav-link"
                >
                  <Button
                    icon={
                      lightMode ? (
                        <i className="fa-solid fa-moon fa-sm"></i>
                      ) : (
                        <i className="fa-solid fa-sun fa-sm"></i>
                      )
                    }
                    onClick={onClick}
                    color="btn-secondary"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
