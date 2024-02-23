import Button from "./Button";

export default function Navbar({ onClick, lightMode }) {
  return (
    <div>
      <nav
        className={`navbar`}
        style={{ backgroundColor: lightMode ? "#E4E3E0" : "#313638" }}
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
            color="btn-primary"
          />
          {/*offcanvas */}
          {/* <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasScrolling"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div
            class="offcanvas offcanvas-end"
            data-bs-scroll="true"
            data-bs-backdrop="false"
            tabindex="-1"
            id="offcanvasScrolling"
            aria-labelledby="offcanvasScrollingLabel"
          >
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasScrollingLabel">
                Offcanvas with body scrolling
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body">
              <p>
                Try scrolling the rest of the page to see this option in action.
              </p>
            </div>
          </div> */}
        </div>
      </nav>
    </div>
  );
}
