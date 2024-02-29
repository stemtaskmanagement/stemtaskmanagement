export default function Modal({
  lightMode,
  modalTitle,
  modalDescription,
  setShowModal,
}) {
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
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <p>{modalDescription}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger text-white"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
