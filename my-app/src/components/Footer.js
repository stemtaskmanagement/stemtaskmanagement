export default function Footer({ lightMode }) {
  return (
    <div
      className="mt-5 footer"
      style={{
        backgroundColor: lightMode ? "#E4E3E0" : "#313638",
        color: lightMode ? "#313638" : "white",
      }}
    >
      <div className="p-5">
        <p className="footerText">@2024 STEMTASK. All Rights Reserved.</p>
        <a href="/about" className="footerLink">
          <p className="footerText">About the Developers</p>
        </a>
        <a href="/faq" className="footerLink">
          <p className="footerText">FAQs</p>
        </a>
        <p className="credits">
          Illustration by{" "}
          <a
            href="https://icons8.com/illustrations/author/N3YOxdn12Kox"
            className="creditLink"
          >
            Marina Mogulska
          </a>{" "}
          from{" "}
          <a href="https://icons8.com/illustrations" className="creditLink">
            Ouch!
          </a>
        </p>
      </div>
    </div>
  );
}
