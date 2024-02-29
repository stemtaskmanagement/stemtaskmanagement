import Button from "./Button";

export default function Navbar({ onClick, lightMode, userCredentials }) {
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
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
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
              {userCredentials == "" ? (
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
                  <a
                    className="nav-link"
                    style={{ color: lightMode ? "#313638" : "white" }}
                    href="/user"
                  >
                    {userCredentials.email}
                  </a>
                </li>
              )}
              <li style={{ marginRight: "15px" }}>
                <a
                  className="nav-link"
                  href="/about"
                  style={{ color: lightMode ? "#313638" : "white" }}
                >
                  About Us
                </a>
              </li>
              <li>
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
