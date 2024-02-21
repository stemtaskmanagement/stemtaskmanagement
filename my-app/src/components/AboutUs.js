export default function AboutUs({ lightMode }) {
  return (
    <div className="container">
      <h1>About Us</h1>
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
            <img src="..." className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Wion Quintela</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">
                <small className="text-body-secondary">
                  Last updated 3 mins ago
                </small>
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
            <img src="..." className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">David Charles De Guzman </h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">
                <small className="text-body-secondary">
                  Last updated 3 mins ago
                </small>
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
            <img src="..." className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Gabriel Eli Mañacap </h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">
                <small className="text-body-secondary">
                  Last updated 3 mins ago
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
