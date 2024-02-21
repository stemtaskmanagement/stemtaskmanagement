import Button from "./Button";

export default function Navbar({ onClick, lightMode }) {
  return (
    <div>
      <nav
        className={`navbar shadow`}
        style={{ backgroundColor: lightMode ? "white" : "#313638" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand text-primary" href="#taskSection">
            STEMTask
          </a>
          <Button
            icon={
              lightMode ? (
                <i class="fa-solid fa-moon"></i>
              ) : (
                <i class="fa-solid fa-sun"></i>
              )
            }
            onClick={onClick}
          />
        </div>
      </nav>
    </div>
  );
}
