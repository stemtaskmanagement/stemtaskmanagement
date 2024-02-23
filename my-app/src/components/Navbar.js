import Button from "./Button";

export default function Navbar({ onClick, lightMode }) {
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
          <a className="navbar-brand text-primary" href="/">
            STEMTask
          </a>
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
            <ul
              style={{
                color: lightMode ? "#313638" : "white",
                listStyleType: "none",
                display: "flex",
                justifyContent: "flex-end", // Align items on the right side
                alignItems: "center",
              }}
            >
              <li style={{ marginRight: "15px" }}>
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
              <li style={{ marginRight: "15px" }}>
                <a className="nav-link" href="/about">
                  About Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
