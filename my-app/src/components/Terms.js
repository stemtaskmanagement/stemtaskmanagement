import { useNavigate } from "react-router-dom";
export default function Modal({
  lightMode,
  modalTitle,

  setShowModal,
  text,
  color,
  navigation,
  id,
  email,
}) {
  const nav = useNavigate();

  // Function to handle the button click
  const handleButtonClick = () => {
    // Close the modal
    setShowModal(false);
    // Navigate to "/"
    nav("/");
  };
  return (
    <div
      className="modal"
      style={{
        display: "block",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="modal-dialog">
        <div
          className="modal-content"
          style={{
            backgroundColor: lightMode ? "#F9F6EE" : "#313638",
            color: lightMode ? "#313638" : "white",
          }}
        >
          <div className="modal-header">
            <h5 className="modal-title">{modalTitle}</h5>
            {/* <button
              type="button"
              className="btn-close"
              onClick={() => setShowModal(false)}
            ></button> */}
          </div>
          <div className="modal-body">
            <p style={{ padding: "20px" }} id={id}>
              <div>
                <h1>
                  Terms and Conditions for STEMTASK Task Management Web App
                </h1>
                <p>
                  Welcome <strong>{email}</strong> to STEMTASK! By accessing or
                  using our task management web app, you agree to be bound by
                  these terms. If you do not agree, you may not access or use
                  our web app.
                </p>
                <p>
                  Your privacy and the security of your data are important to
                  us. We are committed to being transparent about how your data
                  is collected, used, and protected.
                </p>
                <p>
                  By using STEMTASK, you acknowledge and consent to the
                  following:
                </p>
                <ol>
                  <li>
                    By using STEMTASK, you agree to these Terms and Conditions.
                  </li>
                  <li>
                    These Terms and Conditions apply to all users of STEMTASK.
                  </li>
                  <li>
                    Users must provide accurate information when creating an
                    account and maintain the security of their account
                    credentials.
                  </li>
                  <li>
                    Users are responsible for the content they create, upload,
                    or share.
                  </li>
                  <li>
                    Users must not engage in prohibited conduct while using
                    STEMTASK, including violating others' rights and interfering
                    with the operation of STEMTASK.
                  </li>
                  <li>
                    Developers may have access to users' task data solely for
                    improving and maintaining the service.
                  </li>
                  <li>
                    We reserve the right to terminate or suspend access to
                    STEMTASK at any time.
                  </li>
                  <li>
                    We may update these Terms and Conditions from time to time
                    without notice.
                  </li>
                  <li>
                    If you have any questions or concerns, please contact us at{" "}
                    <a href="mailto:stemtaskmanagement@gmail.com">
                      stemtaskmanagement@gmail.com
                    </a>
                    .
                  </li>
                </ol>
                <p>
                  By accessing or using STEMTASK, you acknowledge that you have
                  read, understood, and agreed to these Terms and Conditions.
                  Thank you for using our task management web app!
                </p>
              </div>
              <button
                type="button"
                className={`btn ${color ? color : "btn-danger"} text-white`}
                onClick={handleButtonClick} // Call handleButtonClick on button click
              >
                {text || "I agree with the terms"}
              </button>
            </p>
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  );
}
