export default function Navbar() {
  return (
    <div>
      <nav
        className={`navbar bg-body-tertiary className="text-primary" shadow`}
      >
        <div className="container-fluid">
          <a className="navbar-brand text-primary" href="#taskSection">
            STEMTask
          </a>
        </div>
      </nav>
    </div>
  );
}
