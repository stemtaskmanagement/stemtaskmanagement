export default function AboutUs({ lightMode }) {
  return (
    <div className="container">
      {/*Card */}
      <div
        className="card mb-3"
        style={{
          maxWidth: "540px",
          backgroundColor: lightMode ? "#F9F6EE" : "#313638",
          color: lightMode ? "black" : "white",
        }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={require("./assets/wion.jpg")}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">
                Wion M. Quintela{" "}
                <h6 className="card-subtitle masterDev">
                  Master Developer and Lead Proponent
                </h6>
              </h5>

              {/* <ul className="list-inline p-2">
                <li className="list-inline-item">
                  <a href="/">
                    <i className="fa-brands fa-facebook fa-2xl"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="/">
                    <i className="fa-brands fa-instagram fa-2xl"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="/"></a>
                </li>
              </ul> */}

              <p className="card-text">
                <small className="text-body-secondary"></small>
              </p>
            </div>
          </div>
        </div>
      </div>{" "}
      {/*Card */}
      <div
        className="card mb-3"
        style={{
          maxWidth: "540px",
          backgroundColor: lightMode ? "#F9F6EE" : "#313638",
          color: lightMode ? "black" : "white",
        }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={require("./assets/david.jpg")}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">
                David Charles F. De Guzman{" "}
                <h6 className="card-subtitle">Main Editor and Documentarian</h6>
              </h5>
              {/* <ul className="list-inline p-2">
                <li className="list-inline-item">
                  <a href="/">
                    <i className="fa-brands fa-facebook fa-2xl"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="/">
                    <i className="fa-brands fa-instagram fa-2xl"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="/"></a>
                </li>
              </ul> */}

              <p className="card-text"></p>
            </div>
          </div>
        </div>
      </div>{" "}
      {/*Card */}
      <div
        className="card mb-3"
        style={{
          maxWidth: "540px",
          backgroundColor: lightMode ? "#F9F6EE" : "#313638",
          color: lightMode ? "black" : "white",
        }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={require("./assets/gab.jpg")}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Gabriel Eli B. Mañacap </h5>
              <h6 className="card-subtitle">
                Resource Coordinator and Junior Developer
              </h6>
              {/* <ul className="list-inline p-2">
                <li className="list-inline-item">
                  <a href="/">
                    <i className="fa-brands fa-facebook fa-2xl"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="/">
                    <i className="fa-brands fa-instagram fa-2xl"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="/"></a>
                </li>
              </ul> */}

              <p className="card-text"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
