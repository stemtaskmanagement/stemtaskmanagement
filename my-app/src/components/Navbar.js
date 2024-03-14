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
              {userCredentials.length === 0 ? (
                <li>
                  <a
                    className="nav-link"
                    href="/login"
                    style={{ color: lightMode ? "#313638" : "white" }}
                  >
                    Log In
                  </a>
                </li>
              ) : (
                <li>
                  {windowWidth <= 768 ? (
                    <a
                      style={{
                        color: lightMode ? "#313638" : "white",
                        paddingRight: "10px",
                      }}
                      className="nav-link"
                      href="/user"
                    >
                      <Button
                        icon={<i class="fa-solid fa-user"></i>}
                        color="btn-secondary"
                      />
                    </a>
                  ) : (
                    <a
                      className="nav-link"
                      style={{
                        color: lightMode ? "#313638" : "white",
                        marginRight: "10px",
                      }}
                      href="/user"
                    >
                      {userCredentials.email}
                    </a>
                  )}
                </li>
              )}

              <li>
                {windowWidth <= 768 ? (
                  <a
                    href="/#taskSection"
                    style={{
                      color: lightMode ? "#313638" : "white",
                      marginRight: "10px",
                    }}
                    className="nav-link"
                  >
                    <Button
                      icon={<i class="fa-solid fa-list-check"></i>}
                      color="btn-secondary"
                    />{" "}
                  </a>
                ) : (
                  <a
                    href="/#taskSection"
                    style={{ color: lightMode ? "#313638" : "white" }}
                    className="nav-link"
                  >
                    My Task
                  </a>
                )}
              </li>
              <li>
                <a
                  style={{
                    color: lightMode ? "#313638" : "white",
                    marginRight: "10px",
                  }}
                  className="nav-link"
                >
                  <Button
                    icon={
                      lightMode ? (
                        <i className="fa-solid fa-moon"></i>
                      ) : (
                        <i className="fa-solid fa-sun"></i>
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
